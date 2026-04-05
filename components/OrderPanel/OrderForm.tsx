import { useActionState, useEffect, useState } from "react";
import Input from "../Input/input";
import { IoWalletSharp } from "react-icons/io5";
import { OrderSide } from "@/types";
import Button from "../Button";
import { placeOrder } from "@/app/actions";
import toast from "react-hot-toast";

// async function placeOrderAction(prevData: Response, formData: FormData) {
//   const res = await placeOrder(formData);
//   if (res.ok) {
//     toast.success(`Order placed — ID: ${res?.orderId as string}`);
//   } else {
//     toast.error(res.message);
//   }
//   return prevData;
// }

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
  const [response, dispatchAction] = useActionState(placeOrder, {});

  // if (response.ok) {
  //   toast.success(`Order placed — ID: ${response?.orderId as string}`);
  // }
  // else {
  //   toast.error(response.message);
  // }

  useEffect(() => {
    if (response.startsWith("Order request failed")) {
      toast.error(response);
    } else toast.success(`Order placed — ID: ${response?.orderId as string}`);
  }, [response]);

  return (
    <form className="grid grid-cols-2 gap-3" action={dispatchAction}>
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

      <div className="flex flex-col gap-2">
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

      <div className="flex flex-col gap-2">
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

      <div className="  flex gap-2 items-center">
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
