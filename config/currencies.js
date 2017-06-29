import _ from "lodash";

const CURRENCIES = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    color: "#FF7300"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    color: "#8C01FF"
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    color: "#B4B4B4"
  },
  {
    name: "Augur",
    symbol: "REP",
    color: "#EC3766"
  },
  {
    name: "ZCash",
    symbol: "ZEC",
    color: "#F0AD4E"
  },
  {
    name: "Ethereum Classic",
    symbol: "ETC",
    color: "#4FB858"
  },
  {
    name: "Steem",
    symbol: "STEEM",
    color: "#4BA2F2"
  },
  {
    name: "Decred",
    symbol: "DCR",
    color: "#47ACD7"
  },
  {
    name: "Siacoin",
    symbol: "SC",
    color: "#009688"
  },
  {
    name: "Golem",
    symbol: "GNT",
    color: "#01d3e0"
  }
].map((x, i) => ({ ...x, key: i }));

const currencyData = currencySymbol =>
  _.find(CURRENCIES, data => data.symbol === currencySymbol);

const currencyColors = {};
CURRENCIES.forEach(currency => {
  currencyColors[currency.symbol] = currency.color;
});

export { CURRENCIES, currencyData, currencyColors };
