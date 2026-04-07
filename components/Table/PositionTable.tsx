import { PositionsTableType } from "@/types";

function PositionTable({ data }: { data: PositionsTableType[] | undefined }) {
  if (data === undefined) {
    return;
  }
  return (
    <>
      {data?.map((d) => (
        <tr key={`${d.symbol}}`} className="text-center">
          <td className="py-3">{d.symbol}</td>
          <td
            className={`py-3  ${d.size.startsWith("+") ? "text-green-500" : "text-red-500"}`}
          >
            {d.size}
          </td>
          <td className="py-3">{d.price}</td>
          <td className="py-3">{d.marketPrice}</td>
          <td
            className={`py-3  ${d.unrealizedPnl > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {d.unrealizedPnl}
          </td>
          <td className="py-3">{d.realizedPnl}</td>
        </tr>
      ))}
    </>
  );
}

export default PositionTable;
