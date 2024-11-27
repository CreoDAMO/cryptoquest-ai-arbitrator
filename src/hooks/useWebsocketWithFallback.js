import { useState, useEffect } from '"react"';
import API_CONFIG from '"../config/api"';

const useWebSocketWithFallback = (websocketUrl, fallbackInterval = 10000, maxFailures = 3) => {
  const [data, setData] = useState({});
  const [previousData, setPreviousData] = useState({});
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [failureCount, setFailureCount] = useState(0);

  useEffect(() => {
    let ws;
    let pollingId;

    const connectWebSocket = () => {
      ws = new WebSocket(websocketUrl);

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          setPreviousData((prevData) => ({
            ...prevData,
            [message.pair]: data[message.pair] || null,
          }));
          setData((prevData) => ({ ...prevData, [message.pair]: message.price }));

          setFailureCount(0); // Reset failures on successful message
          setIsPolling(false); // Return to WebSocket mode
        } catch (err) {
          console.error('"WebSocket message parse error:"', err);
          setError('"Invalid data format received from WebSocket."');
        }
      };

      ws.onerror = () => setError('"WebSocket encountered an error."');

      ws.onclose = () => {
        console.warn('"WebSocket closed."');
        setFailureCount((count) => count + 1);

        if (failureCount >= maxFailures) {
          console.warn('"Switching to polling due to repeated WebSocket failures."');
          setIsPolling(true);
        } else {
          setTimeout(connectWebSocket, Math.min(1000 * Math.pow(2, failureCount), 30000)); // Exponential backoff
        }
      };
    };

    const startPolling = async () => {
      try {
        const fetchPrices = async () => {
          const response = await fetch(`${API_CONFIG.ENDPOINTS.MARKET_DATA}`);
          if (!response.ok) throw new Error('"Failed to fetch prices"');
          const prices = await response.json();
          setPreviousData(data); // Update previous prices
          setData(prices); // Update current prices
        };

        pollingId = setInterval(fetchPrices, fallbackInterval);
        await fetchPrices(); // Initial fetch
      } catch (err) {
        setError(err.message);
      }
    };

    if (isPolling) {
      startPolling();
    } else {
      connectWebSocket();
    }

    return () => {
      if (ws) ws.close();
      if (pollingId) clearInterval(pollingId);
    };
  }, [websocketUrl, fallbackInterval, failureCount, isPolling, data]);

  return { data, previousData, error, isPolling };
};
export default useWebSocketWithFallback;
