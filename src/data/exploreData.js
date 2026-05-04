import bitcoin from "../assets/bitcoin.png";
import ethereum from "../assets/ethereum.png";
import tether from "../assets/tether.png";
import bnb from "../assets/bnb.png";
import xrp from "../assets/xrp.png";
import usdc from "../assets/usdc.png";
import solana from "../assets/sol.png";     
import tron from "../assets/tron.png";         
import dogecoin from "../assets/dogecoin.png"; 
import cardano from "../assets/cardano.png";   
import prcl from "../assets/prcl.png";
import fai from "../assets/fai.png";
import hype from "../assets/hype.png"
import jupiter from "../assets/jupiter.png";
import lighter from "../assets/lighter.png";

export const SPARKS = {
    btc: "M4 18 L12 16 L20 20 L28 14 L36 17 L44 12 L52 15 L60 10 L68 14 L76 9 L84 12",
    eth: "M4 14 L12 16 L20 13 L28 18 L36 15 L44 20 L52 16 L60 22 L68 18 L76 24 L84 20",
    usdt: "M4 18 L12 18 L20 17.8 L28 18 L36 18.1 L44 18 L52 17.9 L60 18 L68 18 L76 18.1 L84 18",
    bnb: "M4 13 L12 15 L20 14 L28 18 L36 16 L44 19 L52 17 L60 22 L68 20 L76 23 L84 21",
    xrp: "M4 22 L12 20 L20 18 L28 12 L36 24 L44 16 L52 20 L60 14 L68 18 L76 16 L84 13",
    usdc: "M4 18 L12 18 L20 18 L28 17.9 L36 18 L44 18.1 L52 18 L60 18 L68 18 L76 18 L84 18",
    sol: "M4 10 L12 13 L20 11 L28 16 L36 14 L44 19 L52 17 L60 21 L68 19 L76 24 L84 22",
    trx: "M4 19 L12 17 L20 20 L28 15 L36 13 L44 16 L52 12 L60 10 L68 13 L76 11 L84 9",
    doge: "M4 15 L12 17 L20 14 L28 19 L36 16 L44 21 L52 18 L60 22 L68 20 L76 24 L84 22",
    ada: "M4 12 L12 14 L20 13 L28 17 L36 15 L44 20 L52 18 L60 23 L68 20 L76 25 L84 22",

    market1: "M4 12 L12 14 L20 13 L28 17 L36 15 L44 19 L52 17 L60 20 L68 18 L76 22 L84 19",
    market2: "M4 10 L12 12 L20 14 L28 16 L36 15 L44 20 L52 18 L60 23 L68 21 L76 25 L84 22",
    market3: "M4 22 L12 19 L20 21 L28 14 L36 24 L44 18 L52 20 L60 12 L68 16 L76 10 L84 14",
    market4: "M4 13 L12 15 L20 14 L28 18 L36 17 L44 21 L52 18 L60 22 L68 20 L76 24 L84 23",
};

export const COINS = [
    { name: "Bitcoin",  symbol: "BTC",  price: "GHS 725,156.80", change: "1.58%", neg: true,  mktCap: "GHS 14.5T",  volume: "GHS 273.3B", image: bitcoin,  spark: SPARKS.btc },
    { name: "Ethereum", symbol: "ETH",  price: "GHS 20,933.05",  change: "2.37%", neg: true,  mktCap: "GHS 2.5T",   volume: "GHS 135.6B", image: ethereum, spark: SPARKS.eth },
    { name: "Tether",   symbol: "USDT", price: "GHS 10.77",      change: "0.01%", neg: false, mktCap: "GHS 2.0T",   volume: "GHS 571.0B", image: tether,   spark: SPARKS.usdt },
    { name: "BNB",      symbol: "BNB",  price: "GHS 6,669.65",   change: "1.38%", neg: true,  mktCap: "GHS 908.8B", volume: "GHS 13.0B",  image: bnb,      spark: SPARKS.bnb },
    { name: "XRP",      symbol: "XRP",  price: "GHS 14.60",      change: "0.96%", neg: true,  mktCap: "GHS 891.4B", volume: "GHS 14.4B",  image: xrp,      spark: SPARKS.xrp },
    { name: "USDC",     symbol: "USDC", price: "GHS 10.77",      change: "0.00%", neg: false, mktCap: "GHS 832.3B", volume: "GHS 54.7B",  image: usdc,     spark: SPARKS.usdc, note: "Earns 3.35% APY" },
    { name: "Solana",   symbol: "SOL",  price: "GHS 888.18",     change: "2.59%", neg: true,  mktCap: "GHS 504.9B", volume: "GHS 23.4B",  image: solana,   spark: SPARKS.sol },
    { name: "TRON",     symbol: "TRX",  price: "GHS 3.08",       change: "0.83%", neg: false, mktCap: "GHS 292.0B", volume: "GHS 4.1B",   image: tron,     spark: SPARKS.trx },
    { name: "Dogecoin", symbol: "DOGE", price: "GHS 0.96",       change: "1.62%", neg: true,  mktCap: "GHS 161.4B", volume: "GHS 7.3B",   image: dogecoin, spark: SPARKS.doge },
    { name: "Cardano",  symbol: "ADA",  price: "GHS 2.73",       change: "0.69%", neg: true,  mktCap: "GHS 98.3B",  volume: "GHS 3.7B",   image: cardano,  spark: SPARKS.ada },
];

export const MARKET_STATS = [
    { label: "Total market cap", value: "GHS 24.04T", change: "1.43%", neg: true, spark: SPARKS.market1 },
    { label: "Trade volume", value: "GHS 1.16T", change: "28.66%", neg: true, spark: SPARKS.market2 },
    { label: "Buy-sell ratio", value: "GHS 0.76", change: "4.01%", neg: true, spark: SPARKS.market3 },
    { label: "BTC dominance", value: "59.95%", change: "0.30%", neg: true, spark: SPARKS.market4 },
];

export const NEW_COINS = [
    {
        label: "HYPE",
        name: "Hyperliquid",
        date: "Added Feb 5",
        icon: hype,
    },
    {
        label: "JUPITER",
        name: "Jupiter",
        date: "Added Dec 9",
        icon: jupiter,
    },
    {
        label: "LIGHTER",
        name: "Lighter",
        date: "Added Jan 15",
        icon: lighter,
    },
];

export const TOP_MOVERS = [
    { symbol: "PRCL", price: "GHS 0.21", change: "34.39%", pos: true,  icon: prcl },
    { symbol: "FAI",  price: "GHS 0.0653",change: "31.02%", pos: false, icon: fai },
];
