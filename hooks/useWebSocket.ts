import { useEffect, useRef, useState } from "react";

type ConnectionStatus = 0 | 1 | 3;

export function useWebSocket(symbol: string): {
  connectionStatus: ConnectionStatus;
  price: string;
} {
  const [status, setStatus] = useState<ConnectionStatus>(0);
  const [price, setPrice] = useState<string>("");

  const retries = useRef(0);
  const timeOut = useRef<NodeJS.Timeout>(undefined);
  const ws = useRef<WebSocket>(null);

  const maxRetries = 10;
  const maxDelay = 30000;
  useEffect(
    function connect() {
      let isActive = true;
      function attempt() {
        if (!isActive) {
          return;
        }
        ws.current = new WebSocket(
          `wss://stream.testnet.binance.vision/ws/${symbol}@trade`,
        );
        ws.current.addEventListener("message", (event) => {
          if (ws.current?.readyState !== WebSocket.OPEN) return;
          setStatus(WebSocket.OPEN);
          const { p } = JSON.parse(event.data);
          setPrice(p);
        });

        ws.current.addEventListener("open", () => {
          setStatus(WebSocket.OPEN);
          retries.current = 0;
        });

        ws.current.addEventListener("close", (event) => {
          setStatus(WebSocket.CLOSED);

          if (!isActive) return;
          if (event.code === 1000) return;
          if (retries.current >= maxRetries) {
            console.error("Max retries reached");
            return;
          }
          const base = Math.min(1000 * 2 ** retries.current, maxDelay);
          const jitter = Math.random() * base * 0.5;
          const delay = base + jitter;
          retries.current++;
          console.log("Attempt no. : " + retries.current);
          timeOut.current = setTimeout(attempt, delay);
        });

        ws.current.addEventListener("error", (e) => {
          console.log(e);
        });
      }
      attempt();
      return () => {
        ws.current?.close();
        isActive = false;
        setPrice("");
        clearTimeout(timeOut.current);
      };
    },
    [symbol, setPrice],
  );

  return {
    connectionStatus: status,
    price: price,
  };
}
