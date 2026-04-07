import { PositionsTableType } from "../../types/index";
function Table({
  columns,
  data,
}: {
  columns: string[];
  data: PositionsTableType[];
}) {
  return (
    <table className="w-full ">
      <thead className="border-y border-y-gray-500 ">
        <tr>
          {columns.map((column) => (
            <th className="py-3" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map((d) => (
          <tr key={`${d.symbol}}`}>
            <th className="py-3">{d.symbol}</th>
            <th
              className={`py-3  ${d.size.startsWith("+") ? "text-green-500" : "text-red-500"}`}
            >
              {d.size}
            </th>
            <th className="py-3">{d.price}</th>
            <th className="py-3">{d.marketPrice}</th>
            <th
              className={`py-3  ${d.unrealizedPnl > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {d.unrealizedPnl}
            </th>
            <th className="py-3">{d.realizedPnl}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
