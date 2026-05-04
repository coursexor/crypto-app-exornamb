export const cryptoList = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 68250.12,
    change24h: 1.82,
    marketCap: 1340000000000,
    volume24h: 24500000000,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3540.78,
    change24h: -0.65,
    marketCap: 425000000000,
    volume24h: 14200000000,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 156.33,
    change24h: 3.41,
    marketCap: 72000000000,
    volume24h: 4200000000,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.62,
    change24h: -1.92,
    marketCap: 22000000000,
    volume24h: 780000000,
  },
];

export function formatMoney(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 1 ? 4 : 2,
  }).format(n);
}

export function formatCompact(n) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(n);
}