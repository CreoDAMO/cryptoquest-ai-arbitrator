import React from "react";
import useWebSocket from "../hooks/useWebSocket";
import TOKEN_PAIRS from "../config/tokenPairs";

const TokenPairList = () => {
  const { data: prices, error } = useWebSocket(process.env.REACT_APP_WEBSOCKET_URL);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {error && <p className="error text-red-500">{error}</p>}
      {Object.keys(TOKEN_PAIRS).map((pairKey) => (
        <div key={pairKey} className="glass-card p-6">
          <h3 className="text-xl mb-4">{TOKEN_PAIRS[pairKey].label}</h3>
          <p id={`${pairKey}_price`} className="price-feed text-2xl">
            {prices[pairKey] ? `$${prices[pairKey].toFixed(2)}` : "Loading..."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TokenPairList;
