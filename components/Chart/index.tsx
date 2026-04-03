"use client";

import { convertKlineToCandlestick, getKlines } from "@/lib/binance";
import { CandleStickData } from "@/types";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

function Chart() {
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

    const fetchData = async () => {
      try {
        const data = await getKlines("BTCUSDT", "1m", 100);

        const candleData: CandleStickData[] = [];

        for (const kline of data) {
          const candleStick = convertKlineToCandlestick(kline);
          candleData.push(candleStick);
        }
        series?.setData(candleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    return () => chart?.remove();
  }, []);

  return (
    <div className="w-full h-[500px] chartContainer" ref={containerRef}></div>
  );
}

export default Chart;
