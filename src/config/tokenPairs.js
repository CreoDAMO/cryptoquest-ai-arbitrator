const TOKEN_PAIRS = {
  MATIC_CQT: {
    address: process.env.REACT_APP_MATIC_CQT_PAIR_ADDRESS,
    label: "MATIC/CQT",
  },
  WBTC_CQT: {
    address: process.env.REACT_APP_WBTC_CQT_PAIR_ADDRESS,
    label: "WBTC/CQT",
  },
  WETH_CQT: {
    address: process.env.REACT_APP_WETH_CQT_PAIR_ADDRESS,
    label: "WETH/CQT",
  },
};
export default TOKEN_PAIRS;
