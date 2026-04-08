"use client";

import {
  convertKlineEventToCandlestick,
  convertKlineToCandlestick,
  getKlines,
} from "@/lib/binance";
import { CandleStickData, TimeFrame } from "@/types";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import TimeFrameSelector from "../TimeFrameSelector";
import { useAccountStore } from "@/store";
import { useWebSocket } from "@/hooks/useWebSocket";

function Chart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1m");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | undefined>(undefined);
  const symbol = useAccountStore((state) => state.symbol);
  const price = useAccountStore((state) => state.marketPrice);
  const setInitialPrice = useAccountStore((state) => state.setMarketPrice);

  useWebSocket(symbol.toLowerCase());

  useEffect(() => {
    const chartOptions = {
      layout: {
        background: { color: "#0d0f14" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#1e2330" },
        horzLines: { color: "#1e2330" },
      },
      autoSize: true,
    };
    const chart = containerRef.current
      ? createChart(containerRef.current, chartOptions)
      : null;

    const series = chart?.addSeries(CandlestickSeries);

    seriesRef.current = series;
    chartRef.current = chart;

    return () => chart?.remove();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKlines(symbol, timeframe, 100);
        setInitialPrice(Number(data.pop()?.[4]));
        const candleData: CandleStickData[] = [];

        for (const kline of data) {
          const candleStick = convertKlineToCandlestick(kline);
          candleData.push(candleStick);
        }
        seriesRef.current?.setData(candleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [timeframe, symbol]);

  useEffect(() => {
    const wsStream = new WebSocket(
      `wss://stream.testnet.binance.vision/ws/${symbol.toLowerCase()}@kline_${timeframe}`,
    );

    wsStream.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      const candleStick = convertKlineEventToCandlestick(response);
      seriesRef.current?.update(candleStick);
    });

    return () => wsStream.close();
  }, [timeframe, symbol]);

  return (
    <div className="border border-gray-700 rounded-4xl w-full p-6 flex flex-col gap-6 hover:shadow-gray-800 hover:shadow-lg transition delay-150">
      <div className="flex justify-between align-top">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">{symbol}</h2>
          <h1 className="text-2xl">$ {price}</h1>
        </div>

        <TimeFrameSelector onSet={setTimeframe} currentVal={timeframe} />
      </div>

      <div
        className="w-full h-[30vh] sm:h-[40vh] chartContainer"
        ref={containerRef}
      ></div>
    </div>
  );
}

export default Chart;
