import React from "react";

function Dropdown({
  className,
  options,
  labelName,
}: {
  labelName?: string;
  className?: string;
  options: string[];
}) {
  return (
    <div className={className}>
      <label htmlFor={labelName}>{labelName}</label>
      <select id={labelName} className="border border-gray-700 p-3 ">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
