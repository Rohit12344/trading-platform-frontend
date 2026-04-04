"use client";

import { useState } from "react";
import Button from "../Button";
import { OrderSides, OrderTypes } from "@/constants";
import { OrderSide } from "@/types";
import Tab from "../Tab";
import OrderForm from "./OrderForm";

function OrderPanel() {
  const [orderSide, setOrderSide] = useState<OrderSide>("BUY");
  const [orderType, setOrderType] = useState<string>("LIMIT");
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
    </div>
  );
}

export default OrderPanel;
