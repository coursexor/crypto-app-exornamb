import { createContext, useMemo, useState } from "react";
import { cryptoList } from "../data/crypto";

const AppContext = createContext(null);

// Provides global state for the application including search query and watchlist
export function AppProvider({ children }) {
    const [query, setQuery] = useState("");
    const [watchlist, setWatchlist] = useState(() => new Set(["bitcoin", "ethereum"]));

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return cryptoList;
        return cryptoList.filter((c) => (c.name + c.symbol).toLowerCase().includes(q));
    }, [query]);

    function toggleWatchlist(id) {
        setWatchlist((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
        });
    }

    const value = {
        query,
        setQuery,
        watchlist,
        toggleWatchlist,
        crypto: cryptoList,
        filtered,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

