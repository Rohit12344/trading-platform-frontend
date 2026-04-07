import React, { useState } from "react";

function Dropdown({
  className,
  options,
  labelName,
  name,
  onChange,
  value,
}: {
  labelName?: string;
  className?: string;
  options: string[];
  name?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [selected, setSelected] = useState<string>(value);
  return (
    <div className={className}>
      <label htmlFor={labelName}>{labelName}</label>
      <select
        id={labelName}
        className="border border-gray-700 p-3 "
        name={name}
        onChange={(e) => {
          setSelected(e.target.value);
          onChange(e.target.value);
        }}
        value={selected}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
