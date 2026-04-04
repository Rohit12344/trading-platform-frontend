import React from "react";

function Input({
  type,
  name,
  className,
  value,
  onInputChange,
}: {
  type: string;
  name: string;
  className: string;
  value: string;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      className={`border border-gray-800 px-4 py-2 min-w-5 ${className}`}
      value={value}
      onChange={onInputChange}
    />
  );
}

export default Input;
