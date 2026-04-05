import React from "react";

function Input({
  type,
  name,
  className,
  value,
  onInputChange,
  readOnly,
  required,
}: {
  type: string;
  name: string;
  className?: string;
  value: string;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  readOnly?: boolean;
  required?: boolean;
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      className={`border border-gray-800 px-4 py-2 min-w-5 ${className}`}
      value={value}
      onChange={onInputChange}
      readOnly={readOnly}
      required={required}
    />
  );
}

export default Input;
