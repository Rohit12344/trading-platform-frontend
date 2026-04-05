import { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";

function Button({
  onClick,
  content,
  isSelected,
  className,
  type,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  content: string;
  isSelected?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className={` border border-gray-500 w-fit px-3 py-2 cursor-pointer first:rounded-l-4xl last:rounded-r-4xl hover:bg-gray-900 ${isSelected ? "bg-gray-700" : " "} ${className}`}
      onClick={isSelected ? undefined : onClick}
      type={type}
      disabled={pending}
    >
      {content}
    </button>
  );
}

export default Button;
