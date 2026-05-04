import { useState, useEffect } from "react";
import axios from "axios";

export default function useLiveMarketData() {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initial fetch from backend
        const fetchCryptos = async () => {
            try {
                // Ensure credentials are sent to match the backend setup
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/crypto`, {
                    withCredentials: true
                });
                
                // Set initial data, removing fluctuation logic
                const formattedData = response.data.map(crypto => {
                    const change = crypto.change24h || 0;
                    // Generate a smooth sparkline if missing
                    let sparkline = crypto.sparkline;
                    if (!sparkline || sparkline.length === 0) {
                        sparkline = [100];
                        for (let i = 1; i < 15; i++) {
                            // Jittery movement based on change direction
                            const move = (Math.random() - 0.45) * 5 + (change / 5);
                            sparkline.push(sparkline[i - 1] + move);
                        }
                    }

                    return {
                        ...crypto,
                        previousPrice: crypto.price,
                        change24h: change,
                        sparkline
                    };
                });
                
                setCryptos(formattedData);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch cryptos:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCryptos();
    }, []);

    return { cryptos, loading, error };
}
