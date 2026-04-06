import { useActionState, useEffect, useState } from "react";
import Input from "../Input/input";
import { IoWalletSharp } from "react-icons/io5";
import { OrderSide, StateType } from "@/types";
import Button from "../Button";
import { placeOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { errorMsg } from "../../constants/index";

function OrderForm({
  type,
  side,
  balance,
}: {
  type: string;
  side: OrderSide;
  balance: string;
}) {
  const [price, setPrice] = useState<string | undefined>();
  const [qty, setQty] = useState<string | undefined>();
  const [response, dispatchAction] = useActionState<StateType, FormData>(
    placeOrder,
    {
      ok: false,
    },
  );

  const progress = Math.min(
    ((Number(price ?? 0) * Number(qty ?? 0)) / 10000) * 100,
    100,
  )
    .toFixed(2)
    .toString();

  useEffect(() => {
    if (!response.ok) {
      if (!response.message) return;
      toast.error(errorMsg[response.message] ?? response.message);
    } else {
      if (response.message) {
        toast.success(response?.message);
      }
    }
  }, [response]);

  return (
    <form className="grid grid-cols-2 gap-4" action={dispatchAction}>
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
              required
            ></Input>
            <span className="mr-4">USDT</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="quantity">Quantity</label>
        <div className="border border-gray-700 flex items-center">
          <Input
            name="quantity"
            type="number"
            className="border-0 flex-1 focus:outline-0 "
            value={qty ?? ""}
            onInputChange={(e) => setQty(e.target.value)}
            required
          ></Input>
          <span className="mr-4">BTC</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
        <label htmlFor="total">Total</label>
        <div className="border border-gray-700 flex items-center">
          <Input
            name="total"
            type="number"
            className="border-0 flex-1 focus:outline-0"
            value={(Number(price ?? 0) * Number(qty ?? 0)).toString()}
            readOnly
          ></Input>
          <span className="mr-4">USDT</span>
        </div>
      </div>

      <Input
        name="side"
        value={side}
        className="hidden"
        readOnly
        type="text"
      ></Input>
      <Input
        name="type"
        value={type}
        className="hidden"
        readOnly
        type="text"
      ></Input>
      <Input
        name="symbol"
        value={"BTCUSDT"}
        className="hidden"
        type="text"
        readOnly
      ></Input>
      {type !== "MARKET" && (
        <Input
          name="timeInForce"
          value={"GTC"}
          className="hidden"
          type="text"
          readOnly
        ></Input>
      )}

      <div className="col-span-2 flex items-center gap-4">
        <progress className="flex-1" max="100" value={progress} />
        <span>{progress} %</span>
      </div>

      <div className="col-span-2 flex gap-2 items-center pb-2 border-b-2 border-b-gray-400">
        <IoWalletSharp />
        <span>{balance}</span>
      </div>

      <Button
        content={`${side} BTC`}
        className="w-full rounded-4xl col-span-2"
        type="submit"
        disabled={type !== "MARKET" ? !price || !qty : !qty}
      ></Button>
    </form>
  );
}

export default OrderForm;
