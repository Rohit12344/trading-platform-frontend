"use client";

import { useEffect, useState } from "react";
import Button from "../Button";
import { OrderSides, OrderTypes } from "@/constants";
import { OrderSide } from "@/types";
import Tab from "../Tab";
import OrderForm from "./OrderForm";

import { Balance } from "../../types/index";

function OrderPanel() {
  const [orderSide, setOrderSide] = useState<OrderSide>("BUY");
  const [orderType, setOrderType] = useState<string>("LIMIT");
  const [balance, setBalance] = useState<string>("0.00 USDT");

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
    <div className="border border-gray-700 p-6 rounded-4xl flex flex-col gap-4 hover:shadow-gray-800 hover:shadow-lg transition delay-150">
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
        {OrderTypes.map((type) => (
          <Tab
            content={type}
            key={type}
            onClick={() => setOrderType(type)}
            isSelected={orderType === type}
          ></Tab>
        ))}
      </div>
      <OrderForm
        key={orderType}
        side={orderSide}
        type={orderType}
        balance={balance}
      />
    </div>
  );
}

export default OrderPanel;
