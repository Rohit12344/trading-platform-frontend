import React, { useState } from "react";
import Input from "../Input/input";

function OrderForm({ type }: { type: string }) {
  const [price, setPrice] = useState<string | undefined>();
  const [qty, setQty] = useState<string | undefined>();
  return (
    <form className="grid grid-cols-2 gap-3">
      {type !== "MARKET" && (
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <div className="border border-gray-700 flex items-center w-full">
            <Input
              name="price"
              type="number"
              className="border-0 flex-1 focus:outline-0"
              value={price ?? ""}
              onInputChange={(e) => setPrice(e.target.value)}
            ></Input>
            <span className="mr-4">USDT</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="qty">Quantity</label>
        <div className="border border-gray-700 flex items-center">
          <Input
            name="qty"
            type="number"
            className="border-0 flex-1 focus:outline-0 "
            value={qty ?? ""}
            onInputChange={(e) => setQty(e.target.value)}
          ></Input>
          <span className="mr-4">USDT</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="total">Total</label>
        <div className="border border-gray-700 flex items-center">
          <Input
            name="total"
            type="number"
            className="border-0 flex-1 focus:outline-0"
            value={(Number(price ?? 0) * Number(qty ?? 0)).toString()}
            onInputChange={(e) => setPrice(e.target.value)}
          ></Input>
          <span className="mr-4">USDT</span>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
