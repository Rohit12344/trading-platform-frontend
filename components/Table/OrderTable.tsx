import { OrderTableType } from "@/types";

function OrderTable({ data }: { data: OrderTableType[] | undefined }) {
  if (data === undefined) {
    return (
      <tr>
        <th colSpan={6} className="py-3">
          Loading...
        </th>
      </tr>
    );
  }
  if (!data.length) {
    return (
      <tr>
        <th colSpan={6} className="py-3">
          No data found.
        </th>
      </tr>
    );
  }
  return (
    <>
      {data?.map((d) => (
        <tr
          key={`${d.symbol} ${d.price}`}
          className="text-center border-y-gray-500 border-y"
        >
          <td className="py-3">{d.symbol}</td>
          <td
            className={`py-3 ${d.side === "BUY" ? "text-green-500" : "text-red-500"}`}
          >
            {d.side}
          </td>
          <td
            className={`py-3 ${d.side === "BUY" ? "text-green-500" : "text-red-500"}`}
          >
            {d.side === "BUY" ? `+${d.qty}` : `-${d.qty}`}
          </td>
          <td
            className={`py-3 ${d.side === "BUY" ? "text-green-500" : "text-red-500"}`}
          >
            {d.price}
          </td>
          <td className={`py-3`}>{d.status}</td>
          <td className="py-3">{d.time}</td>
        </tr>
      ))}
    </>
  );
}

export default OrderTable;
