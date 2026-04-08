"use client";

import { TableColumns, TableTabs } from "@/constants";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import {
  PositionsTableType,
  TableTabsType,
  Trade,
  TradeTableType,
} from "@/types";
import Table from "@/components/Table";
import { useAccountStore } from "@/store";
import PositionTable from "../Table/PositionTable";
import TradeTable from "../Table/TradeTable";

function Tabs() {
  const [currentTab, setCurrentTab] = useState<TableTabsType>("Positions");
  const [fetchedData, setFetchedData] = useState<Trade[]>();
  const [tableData, setTableData] = useState<
    PositionsTableType[] | TradeTableType[]
  >();

  const symbol = useAccountStore((state) => state.symbol);
  const marketPrice = useAccountStore((state) => state.marketPrice);
  const currentSymbolPrice = useRef(marketPrice);
  currentSymbolPrice.current = marketPrice;

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("symbol", symbol);
      try {
        const res = await fetch(`/api/trades?${searchParams.toString()}`);

        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const data: Trade[] = await res.json();

        setFetchedData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccountInfo();
  }, [currentTab, symbol]);

  useEffect(() => {
    if (fetchedData) {
      const positionsData =
        fetchedData.length > 0
          ? fetchedData.reduce((prev, curr): Trade => {
              return {
                symbol: curr.symbol,
                isBuyer: curr.isBuyer,
                price: curr.isBuyer
                  ? (
                      (Number(prev.price) * Number(prev.qty) +
                        Number(curr.price) * Number(curr.qty)) /
                      (Number(prev.qty) + Number(curr.qty))
                    ).toString()
                  : prev.price,
                qty: curr.isBuyer
                  ? (Number(prev.qty) + Number(curr.qty)).toString()
                  : (Number(prev.qty) - Number(curr.qty)).toString(),
                time: curr.time,
              };
            })
          : null;

      const tradeData =
        fetchedData.length > 0
          ? fetchedData.map((trade): Trade => {
              return {
                symbol: trade.symbol,
                isBuyer: trade.isBuyer,
                price: trade.price,
                qty: trade.qty,
                time: trade.time,
              };
            })
          : null;

      if (currentTab === "Positions") {
        setTableData(
          positionsData
            ? [
                {
                  symbol: positionsData.symbol,
                  size: `+${positionsData.qty}`,
                  price: positionsData.price,
                  marketPrice:
                    currentSymbolPrice.current > 0
                      ? currentSymbolPrice.current
                      : marketPrice,
                  unrealizedPnl:
                    (currentSymbolPrice.current - Number(positionsData.price)) *
                    Number(positionsData.qty),
                },
              ]
            : [],
        );
      } else if (currentTab === "Trades") {
        setTableData(
          tradeData
            ? (tradeData.map((td) => {
                return {
                  symbol: td.symbol,
                  side: td.isBuyer ? "BUY" : "SELL",
                  qty: td.qty,
                  price: td.price,
                  realizedPnl: 90,
                  time: new Date(td.time).toLocaleDateString(),
                };
              }) as TradeTableType[])
            : [],
        );
      }
    }
  }, [fetchedData, currentTab, marketPrice]);

  return (
    <div className="border border-gray-700 rounded-4xl flex flex-col hover:shadow-gray-800 hover:shadow-lg transition delay-150 overflow-auto">
      <div className="p-6">
        {TableTabs.map((tab) => (
          <Button
            isSelected={tab === currentTab}
            key={tab}
            onClick={() => setCurrentTab(tab)}
            content={tab}
          />
        ))}
      </div>

      <Table
        columns={TableColumns[currentTab]}
        render={() => {
          if (currentTab === "Positions") {
            return (
              <PositionTable
                data={(tableData as PositionsTableType[]) ?? []}
              ></PositionTable>
            );
          } else if (currentTab === "Trades") {
            return (
              <TradeTable
                data={(tableData as TradeTableType[]) ?? []}
              ></TradeTable>
            );
          }
        }}
      ></Table>
    </div>
  );
}

export default Tabs;
