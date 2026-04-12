import { useEffect, useState } from "react";

type ConnectionStatus = 0 | 1 | 3;

export function useWebSocket(symbol: string): {
  connectionStatus: ConnectionStatus;
  price: string;
} {
  // const setMarketPrice = useAccountStore((state) => state.setMarketPrice);
  const [status, setStatus] = useState<ConnectionStatus>(0);
  const [price, setPrice] = useState<string>("");
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.testnet.binance.vision/ws/${symbol}@trade`,
    );
    ws.addEventListener("message", (event) => {
      if (ws.readyState !== WebSocket.OPEN) return;
      const { p } = JSON.parse(event.data);
      setPrice(p);
    });

    ws.addEventListener("open", () => {
      setStatus(WebSocket.OPEN);
    });

    ws.addEventListener("close", () => {
      setStatus(WebSocket.CLOSED);
    });

    ws.addEventListener("error", (e) => {
      console.log(e);
    });

    return () => ws.close();
  }, [symbol, setPrice]);

  return {
    connectionStatus: status,
    price: price,
  };
}
