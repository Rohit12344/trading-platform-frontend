import { TradeEvent } from "@/types";
import { useEffect, useRef, useState } from "react";

type ConnectionStatus = 0 | 1 | 3;

export function useWebSocket(symbol: string): {
  price: string;
  connectionStatus: ConnectionStatus;
} {
  const [latestPrice, setLatestPrice] = useState<string>("");
  const [status, setStatus] = useState<ConnectionStatus>(0);

  useEffect(() => {
    const ws = new WebSocket(`wss://testnet.binance.vision/ws/${symbol}@trade`);
    ws.addEventListener("message", (event) => {
      const { p } = JSON.parse(event.data);
      setLatestPrice(p);
    });

    ws.addEventListener("open", () => {
      setStatus(ws.OPEN);
    });

    ws.addEventListener("close", () => {
      setStatus(ws.CLOSED);
    });

    return () => ws.close();
  }, [symbol]);

  return {
    price: latestPrice,
    connectionStatus: status,
  };
}
