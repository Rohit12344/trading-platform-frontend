import { useAccountStore } from "@/store";
import { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";

function Button({
  onClick,
  content,
  isSelected,
  className,
  type,
  disabled,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  content: string;
  isSelected?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  const theme = useAccountStore((state) => state.theme);
  return (
    <button
      className={`border border-gray-500 w-fit px-3 py-2 cursor-pointer first:rounded-l-4xl last:rounded-r-4xl disabled:cursor-not-allowed disabled:bg-gray-400 ${isSelected ? (theme === "light" ? "bg-gray-400" : "bg-gray-700") : ""} ${theme === "light" ? "hover:bg-gray-600" : "hover:bg-gray-900"} ${className}`}
      onClick={isSelected ? undefined : onClick}
      type={type}
      disabled={disabled || pending}
    >
      {pending ? "Loading..." : content}
    </button>
  );
}

export default Button;
