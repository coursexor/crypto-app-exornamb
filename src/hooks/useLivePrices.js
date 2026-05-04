/**
 * React hook that manages simulated live cryptocurrency prices via polling.
 * Uses an IntersectionObserver to pause polling when off-screen.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { getPrices } from '../api/profileApi';

/**
 * Initializes and manages a simulated live price ticker for cryptocurrency assets.
 * Implements an IntersectionObserver to gate execution based on viewport visibility,
 * and applies proportional random drift to prices to simulate live market data.
 * @param {React.RefObject} containerRef - Reference to the DOM element intersecting the viewport.
 * @returns {Object} State containing coins array, loading status, error string, changed fields map, and retry function.
 */
export default function useLivePrices(containerRef) {
  const [coins, setCoins]               = useState([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState(null);
  const [changedFields, setChangedFields] = useState(new Map());

  // Refs — readable by tick closure without stale values
  const coinsRef    = useRef([]);   // always-current coins array
  const tickRef     = useRef(null); // current scheduled timeout id
  const isActiveRef = useRef(false);// true when ticker is intersecting
  const isReadyRef  = useRef(false);// true once initial fetch succeeds

  /* ── Initial fetch ───────────────────────────────────────────── */
  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    isReadyRef.current = false;

    try {
      const json = await getPrices();
      const dataArr = Array.isArray(json) ? json : json.data;
      const enriched = dataArr.map((coin) => ({
        ...coin,
        priceGhs: coin.priceGhs || coin.price || 0,
        changePercent: coin.changePercent !== undefined ? coin.changePercent : coin.change24h || 0,
        _basePriceGhs: coin.priceGhs || coin.price || 0,
        _baseChange:   coin.changePercent !== undefined ? coin.changePercent : coin.change24h || 0,
      }));
      coinsRef.current   = enriched;
      isReadyRef.current = true;
      setCoins(enriched);
    } catch (err) {
      setError(err.message || 'Failed to load prices');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  /* ── Tick + IntersectionObserver — mounted ONCE ─────────────────── */
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    // Schedules the next tick with a fresh random delay (800–2200 ms) to mimic organic network updates
    function scheduleTick() {
      if (!isActiveRef.current) return;
      const delay = 800 + Math.random() * 1400;
      tickRef.current = setTimeout(tick, delay);
    }

    /* One round of price simulation on 1–3 random coins */
    function tick() {
      if (!isActiveRef.current) return;

      // If data isn't ready yet, wait and retry
      if (!isReadyRef.current || !coinsRef.current.length) {
        scheduleTick();
        return;
      }

      const current = coinsRef.current;

      // 1. Pick random subset
      const count   = 1 + Math.floor(Math.random() * 3);
      const indices = new Set();
      while (indices.size < Math.min(count, current.length)) {
        indices.add(Math.floor(Math.random() * current.length));
      }

      const updatedSymbols    = [];
      const newChangedForTick = new Map();

      // 2-3. Apply drift + compute direction
      const newCoins = current.map((coin, i) => {
        if (!indices.has(i)) return coin;

        const delta    = (Math.random() - 0.5) * 0.0012 * coin.priceGhs;
        // Clamp drift within ±8% of baseline to prevent unrealistic prices
        const maxDrift = coin._basePriceGhs * 0.08;
        const newPrice = Math.round(
          Math.max(
            coin._basePriceGhs - maxDrift,
            Math.min(coin._basePriceGhs + maxDrift, coin.priceGhs + delta)
          ) * 100
        ) / 100;

        const changeBound = Math.abs(coin._baseChange) * 0.03 + 0.03;
        const newChange   = Math.round(
          Math.max(
            coin._baseChange - changeBound,
            Math.min(coin._baseChange + changeBound,
                     coin._baseChange + (Math.random() - 0.5) * 0.08)
          ) * 100
        ) / 100;

        const priceDir  = newPrice  > coin.priceGhs     ? 'up' : newPrice  < coin.priceGhs     ? 'down' : null;
        const changeDir = newChange > coin.changePercent ? 'up' : newChange < coin.changePercent ? 'down' : null;

        newChangedForTick.set(coin.symbol, { price: priceDir, change: changeDir });
        updatedSymbols.push(coin.symbol);

        return { ...coin, priceGhs: newPrice, changePercent: newChange };
      });

      // 5. Update coins immutably
      coinsRef.current = newCoins;
      setCoins([...newCoins]);

      // 6. Flash on, then off after 400 ms
      if (newChangedForTick.size > 0) {
        setChangedFields((prev) => {
          const next = new Map(prev);
          newChangedForTick.forEach((v, k) => next.set(k, v));
          return next;
        });
        setTimeout(() => {
          setChangedFields((prev) => {
            const next = new Map(prev);
            updatedSymbols.forEach((sym) => next.delete(sym));
            return next;
          });
        }, 400);
      }

      // 7. Schedule next tick with a new random delay
      scheduleTick();
    }

    // IntersectionObserver threshold 0.1 ensures polling resumes when at least 10% of the element is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isActiveRef.current) {
            isActiveRef.current = true;
            scheduleTick();
          }
        } else {
          isActiveRef.current = false;
          if (tickRef.current) {
            clearTimeout(tickRef.current);
            tickRef.current = null;
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      isActiveRef.current = false;
      if (tickRef.current) {
        clearTimeout(tickRef.current);
        tickRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { coins, isLoading, error, changedFields, retry: fetchPrices };
}
