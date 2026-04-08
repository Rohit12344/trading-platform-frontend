import { TradeTableType } from "@/types";

function TradeTable({ data }: { data: TradeTableType[] | undefined }) {
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
        <tr key={`${d.symbol} ${d.price}`} className="text-center">
          <td className="py-3">{d.symbol}</td>
          <td
            className={`py-3 ${d.side === "BUY" ? "text-green-500" : "text-red-500"}`}
          >
            {d.side}
          </td>
          <td
            className={`py-3 ${d.side === "BUY" ? "text-green-500" : "text-red-500"}`}
          >
            {d.qty}
          </td>
          <td
            className={`py-3 ${d.side === "BUY" ? "text-green-500" : "text-red-500"}`}
          >
            {d.price}
          </td>
          <td
            className={`py-3  ${d.realizedPnl > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {d.realizedPnl}
          </td>
          <td className="py-3">{d.time}</td>
        </tr>
      ))}
    </>
  );
}

export default TradeTable;
