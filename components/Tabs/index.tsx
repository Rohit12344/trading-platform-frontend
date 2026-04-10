"use client";

import { TableColumns, TableTabs } from "@/constants";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import {
  Order,
  PositionsTableType,
  TableTabsType,
  Trade,
  TradeTableType,
} from "@/types";
import Table from "@/components/Table";
import { useAccountStore } from "@/store";
import PositionTable from "../Table/PositionTable";
import TradeTable from "../Table/TradeTable";
import OrderTable from "../Table/OrderTable";

function Tabs() {
  const [currentTab, setCurrentTab] = useState<TableTabsType>("Positions");
  const [fetchedData, setFetchedData] = useState<Trade[]>();
  const [fetchedOrderData, setFetchedOrderData] = useState<Order[]>();
  const [tableData, setTableData] = useState<
    PositionsTableType[] | TradeTableType[]
  >();

  const symbol = useAccountStore((state) => state.symbol);
  const marketPrice = useAccountStore((state) => state.marketPrice);
  const currentSymbolPrice = useRef(marketPrice);
  currentSymbolPrice.current = marketPrice;
  const orderTime = useAccountStore((state) => state.lastOrderTime);

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
  }, [symbol, orderTime]);

  useEffect(() => {
    const fetchOrders = async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("symbol", symbol);
      try {
        const res = await fetch(`/api/orders?${searchParams.toString()}`);

        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const data: Order[] = await res.json();
        console.log(data);
        setFetchedOrderData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, [symbol, orderTime]);

  useEffect(() => {
    if (fetchedData) {
      const positionsData =
        fetchedData.length > 0
          ? fetchedData.reduce((prev, curr) => {
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

      if (currentTab === "Positions") {
        setTableData(
          positionsData && positionsData.qty !== "0"
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
      }
    }
  }, [fetchedData, currentTab, marketPrice]);

  useEffect(() => {
    if (fetchedData) {
      const aggregatedInfo: { avgEntry: number; totalQty: number } = {
        avgEntry: 0,
        totalQty: 0,
      };

      fetchedData.forEach((val) => {
        if (val.isBuyer) {
          aggregatedInfo.avgEntry =
            (aggregatedInfo.avgEntry * aggregatedInfo.totalQty +
              Number(val.price) * Number(val.qty)) /
            (aggregatedInfo.totalQty + Number(val.qty));
          aggregatedInfo.totalQty += Number(val.qty);
        }
      });

      if (currentTab === "Trades") {
        setTableData(
          fetchedData
            ? (fetchedData.map((td) => {
                return {
                  symbol: td.symbol,
                  side: td.isBuyer ? "BUY" : "SELL",
                  qty: td.qty,
                  price: td.price,
                  realizedPnl: td.isBuyer
                    ? 0
                    : (Number(td.price) - aggregatedInfo.avgEntry) *
                      Number(td.qty),
                  time: new Date(td.time).toLocaleString(),
                };
              }) as TradeTableType[])
            : [],
        );
      }
    }
  }, [fetchedData, currentTab]);

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
          } else if (currentTab === "Orders") {
            return (
              <OrderTable
                data={
                  fetchedOrderData?.map((order) => ({
                    price: order.price,
                    qty: order.origQty,
                    side: order.side,
                    status: order.status,
                    symbol: order.symbol,
                    time: new Date(order.time).toLocaleString(),
                  })) ?? []
                }
              ></OrderTable>
            );
          }
        }}
      ></Table>
    </div>
  );
}

export default Tabs;
