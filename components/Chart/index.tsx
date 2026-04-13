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
import { useShallow } from "zustand/shallow";
import RealTimePriceDisplay from "./RealTimePriceDisplay";

function Chart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1m");
  const [initialPrice, setInitialPrice] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | undefined>(undefined);
  const symbol = useAccountStore(useShallow((state) => state.symbol));
  const theme = useAccountStore((state) => state.theme);

  const { price } = useWebSocket(symbol.toLowerCase());

  useEffect(() => {
    const chartOptions = {
      layout: {
        background: { color: theme === "light" ? "#ffffff" : "#0d0f14" },
        textColor: theme === "light" ? "black" : "#94a3b8",
      },
      grid: {
        vertLines: { color: "#1e2330" },
        horzLines: { color: "#1e2330" },
      },
      autoSize: true,
      timeScale: {
        timeVisible: true,
      },
    };
    const chart = containerRef.current
      ? createChart(containerRef.current, chartOptions)
      : null;

    const series = chart?.addSeries(CandlestickSeries);

    seriesRef.current = series;
    chartRef.current = chart;

    return () => chart?.remove();
  }, [theme]);

  useEffect(() => {
    seriesRef?.current?.priceScale().setAutoScale(true);
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
  }, [timeframe, symbol, theme, setInitialPrice]);

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
  }, [timeframe, symbol, theme]);

  console.log(initialPrice, price);
  return (
    <div
      className={`border border-gray-700 rounded-4xl w-full p-6 flex flex-col gap-6 hover:shadow-gray-800 hover:shadow-lg transition delay-150 hover:bg-[#111317] ${theme === "light" ? "hover:bg-gray-200" : ""}`}
    >
      <div className="flex justify-between align-top flex-col gap-4 sm:flex-row sm:gap-0">
        <div className="flex flex-col gap-4">
          <RealTimePriceDisplay
            symbol={symbol}
            price={price === "" ? initialPrice.toString() : price}
          />
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
