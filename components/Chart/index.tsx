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

function Chart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1m");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | undefined>(undefined);

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
        const data = await getKlines("BTCUSDT", timeframe, 100);

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
  }, [timeframe]);

  useEffect(() => {
    const wsStream = new WebSocket(
      `wss://stream.testnet.binance.vision/ws/btcusdt@kline_${timeframe}`,
    );

    wsStream.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      const candleStick = convertKlineEventToCandlestick(response);
      seriesRef.current?.update(candleStick);
    });

    return () => wsStream.close();
  }, [timeframe]);

  return (
    <>
      <TimeFrameSelector onSet={setTimeframe} currentVal={timeframe} />
      <div className="w-full h-125 chartContainer" ref={containerRef}></div>
    </>
  );
}

export default Chart;
