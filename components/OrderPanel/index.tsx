"use client";

import { useEffect, useState } from "react";
import Button from "../Button";
import { OrderSides, OrderTypes } from "@/constants";
import { OrderSide } from "@/types";
import Tab from "../Tab";
import OrderForm from "./OrderForm";

import { Balance } from "../../types/index";
import { IoWalletSharp } from "react-icons/io5";

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
        setBalance(`${balances[4].free} ${balances[4].asset}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccountInfo();
  }, []);
  return (
    <div className="border border-gray-700 p-6 rounded-4xl flex flex-col gap-4 ">
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
      <OrderForm key={orderType} type={orderType} />
      <div className="flex gap-2 items-center">
        <IoWalletSharp />
        <span>{balance}</span>
      </div>
    </div>
  );
}

export default OrderPanel;
