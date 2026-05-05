import { createContext, useContext } from "react";

// 1. Create the context object
export const AppContext = createContext(null);

// 2. Custom hook to access the context values
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider");
    return ctx;
}