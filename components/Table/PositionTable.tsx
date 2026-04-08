import { PositionsTableType } from "@/types";

function PositionTable({ data }: { data: PositionsTableType[] | undefined }) {
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
            className={`py-3  ${d?.size?.startsWith("+") ? "text-green-500" : "text-red-500"}`}
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
        </tr>
      ))}
    </>
  );
}

export default PositionTable;
