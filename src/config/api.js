const API_CONFIG = {
  INFURA_PROJECT_ID: process.env.REACT_APP_INFURA_PROJECT_ID,
  INFURA_ENDPOINT: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
  CONTRACT_ADDRESSES: {
    STAKING: process.env.REACT_APP_STAKING_CONTRACT_ADDRESS,
    MARKETPLACE: process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS,
    DAO: process.env.REACT_APP_DAO_CONTRACT_ADDRESS,
  },
  ENDPOINTS: {
    ARBITRAGE: `${process.env.REACT_APP_BACKEND_API_URL}/arbitrage`,
    PERFORMANCE_METRICS: `${process.env.REACT_APP_BACKEND_API_URL}/performance-metrics`,
    NOTIFICATIONS: `${process.env.REACT_APP_BACKEND_API_URL}/notifications`,
    MARKET_DATA: `${process.env.REACT_APP_BACKEND_API_URL}/market-data`,
  },
  DEFAULTS: {
    GAS_LIMIT: 21000,
    SLIPPAGE: 0.5,
    TRADE_THRESHOLD: 0.01,
  },
};
export default API_CONFIG;
