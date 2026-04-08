"use client";

import { TableColumns, TableTabs } from "@/constants";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { PositionsTableType, TableTabsType, Trade } from "@/types";
import Table from "@/components/Table";
import { useAccountStore } from "@/store";
import PositionTable from "../Table/PositionTable";

function Tabs() {
  const [currentTab, setCurrentTab] = useState<TableTabsType>("Positions");
  const [tableData, setTableData] = useState<PositionsTableType[]>();

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

        // data.reduce((prev, curr) => {
        //   if (prev.symbol === curr.symbol) {
        //     return {
        //       symbol: prev.symbol,
        //       size: prev.isBuyer
        //         ? `+${Number(prev.qty) + Number(curr.qty)}`
        //         : `-${curr.qty}`,
        //       price: Number(prev.price) + curr.price,
        //       marketPrice: currentSymbolPrice.current,
        //       unrealizedPnl: p.isBuyer
        //         ? (currentSymbolPrice.current - Number(p.price)) * Number(p.qty)
        //         : 0,
        //       realizedPnl: 0,
        //     };
        //   }
        // });

        const testData = data.reduce((prev, curr): Trade => {
          if (curr.isBuyer) {
            return {
              symbol: curr.symbol,
              isBuyer: curr.isBuyer,
              price: (Number(prev.price) + Number(curr.price)).toString(),
              qty: (Number(prev.qty) + Number(curr.qty)).toString(),
              time: curr.time,
            };
          } else return prev;
        });

        if (currentTab === "Positions") {
          setTableData([
            {
              symbol: testData.symbol,
              size: `+${testData.qty}`,
              price: testData.price,
              marketPrice:
                currentSymbolPrice.current > 0
                  ? currentSymbolPrice.current
                  : marketPrice,
              unrealizedPnl:
                (currentSymbolPrice.current - Number(testData.price)) *
                Number(testData.qty),
            },
          ]);
        }

        // if (currentTab === "Positions") {
        //   setTableData(
        //     data.map((p: Trade) => {
        //       return {
        //         symbol: p.symbol,
        //         size: p.isBuyer ? `+${p.qty}` : `-${p.qty}`,
        //         price: p.price,
        //         marketPrice: currentSymbolPrice.current,
        //         unrealizedPnl: p.isBuyer
        //           ? (currentSymbolPrice.current - Number(p.price)) *
        //             Number(p.qty)
        //           : 0,
        //       };
        //     }),
        //   );
        // }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccountInfo();
  }, [currentTab, symbol]);
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
            return <PositionTable data={tableData}></PositionTable>;
          }
        }}
      ></Table>
    </div>
  );
}

export default Tabs;
