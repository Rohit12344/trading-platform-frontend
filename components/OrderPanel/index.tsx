"use client";

import { useEffect, useState } from "react";
import Button from "../Button";
import { OrderSides, OrderTypes, Symbols } from "@/constants";
import { OrderSide, OrderType } from "@/types";
import Tab from "../Tab";
import OrderForm from "./OrderForm";

import { Balance } from "../../types/index";
import Dropdown from "../Dropdown";
import { useAccountStore } from "@/store";

function OrderPanel({ realTimePrice }: { realTimePrice: string }) {
  const [orderSide, setOrderSide] = useState<OrderSide>("BUY");
  const [orderType, setOrderType] = useState<OrderType>("LIMIT");
  const [balance, setBalance] = useState<string>("0.00 USDT");

  const symbol = useAccountStore((state) => state.symbol);
  const setSymbol = useAccountStore((state) => state.setSymbol);
  const theme = useAccountStore((state) => state.theme);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const res = await fetch("/api/account");

        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const { balances }: { balances: Balance[] } = await res.json();

        const concernedBalance = balances.find(
          (blnc) => blnc.asset.toLowerCase() === "usdt",
        );

        setBalance(
          `${concernedBalance?.free ?? "0"} ${concernedBalance?.asset ?? "USDT"}`,
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccountInfo();
  }, []);
  return (
    <div
      className={`border border-gray-700 p-6 rounded-4xl flex flex-col gap-4 hover:shadow-gray-800 hover:shadow-lg transition delay-150 hover:bg-[#111317] ${theme === "light" ? "hover:bg-gray-200" : ""}`}
    >
      <Dropdown
        labelName="Symbol"
        className="border-b border-b-gray-700 pb-4 flex flex-col gap-2"
        options={Symbols}
        value={symbol}
        onChange={(val) => {
          setSymbol(val);
        }}
      />
      <div>
        {OrderSides.map((side) => (
          <Button
            content={side}
            key={side}
            onClick={() => setOrderSide(side)}
            isSelected={orderSide === side}
          ></Button>
        ))}
      </div>
      <div className="border-b border-b-gray-700 ">
        {Object.entries(OrderTypes).map((ot) => (
          <Tab
            content={ot[0]}
            key={ot[0]}
            onClick={() => setOrderType(ot[1])}
            isSelected={orderType === ot[1]}
          ></Tab>
        ))}
      </div>
      <OrderForm
        orderSymbol={symbol}
        key={orderType}
        side={orderSide}
        type={orderType}
        balance={balance}
        realTimePrice={realTimePrice}
      />
    </div>
  );
}

export default OrderPanel;
