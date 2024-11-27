import { useState, useEffect } from '"react"';

const useWebSocket = (websocketUrl) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let ws;

    const connect = () => {
      ws = new WebSocket(websocketUrl);

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setData((prevData) => ({ ...prevData, [message.pair]: message.price }));
        } catch (err) {
          console.error('"WebSocket message parse error:"', err);
          setError('"Invalid data format received from WebSocket."');
        }
      };

      ws.onerror = () => setError('WebSocket encountered an error.');

      ws.onclose = () => {
        console.warn('"WebSocket closed. Reconnecting in 5 seconds..."');
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
    };
  }, [websocketUrl]);

  return { data, error };
};
export default useWebSocket;
