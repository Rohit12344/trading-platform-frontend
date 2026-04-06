"use client";

import { TableColumns, TableTabs } from "@/constants";
import { useEffect, useState } from "react";
import Button from "../Button";
import { PositionsTableType, TableTabsType, Trade } from "@/types";
import Table from "../Table";
import { useAccountStore } from "@/store";

function Tabs() {
  const [currentTab, setCurrentTab] = useState<TableTabsType>("Positions");
  const [tableData, setTableData] = useState<PositionsTableType[]>();
  const marketPrice = useAccountStore((state) => state.marketPrice);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("symbol", "BTCUSDT");
      try {
        const res = await fetch(`/api/trades?${searchParams.toString()}`);

        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const data: Trade[] = await res.json();

        if (currentTab === "Positions") {
          setTableData(
            data.map((p: Trade) => {
              return {
                symbol: p.symbol,
                size: p.isBuyer ? `+${p.qty}` : `-${p.qty}`,
                price: p.price,
                marketPrice: marketPrice,
                unrealizedPnl: p.isBuyer
                  ? (marketPrice - Number(p.price)) * Number(p.qty)
                  : 0,
                realizedPnl: 0,
              };
            }),
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccountInfo();
  }, [currentTab, marketPrice]);
  return (
    <div className="border border-gray-700 rounded-4xl flex flex-col">
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

      <Table columns={TableColumns[currentTab]} data={tableData!}></Table>
    </div>
  );
}

export default Tabs;
