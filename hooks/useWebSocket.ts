import { useAccountStore } from "@/store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

type ConnectionStatus = 0 | 1 | 3;

export function useWebSocket(symbol: string): {
  connectionStatus: ConnectionStatus;
} {
  const setMarketPrice = useAccountStore(
    useShallow((state) => state.setMarketPrice),
  );
  const [status, setStatus] = useState<ConnectionStatus>(0);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.testnet.binance.vision/ws/${symbol}@trade`,
    );
    ws.addEventListener("message", (event) => {
      const { p } = JSON.parse(event.data);
      setMarketPrice(p);
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
  }, [symbol, setMarketPrice]);

  return {
    connectionStatus: status,
  };
}
