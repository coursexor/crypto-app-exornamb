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
                const formattedData = response.data.map(crypto => ({
                    ...crypto,
                    previousPrice: crypto.price,
                    // Use actual backend change24h or default to 0
                    change24h: crypto.change24h || 0
                }));
                
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
