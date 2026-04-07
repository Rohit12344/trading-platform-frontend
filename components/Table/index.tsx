function Table({
  columns,
  render,
}: {
  columns: string[];
  render: () => React.ReactNode;
}) {
  return (
    <table className="min-w-230">
      <thead className="border-y border-y-gray-500 ">
        <tr>
          {columns.map((column) => (
            <th className="py-3" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{render()}</tbody>
    </table>
  );
}

export default Table;
