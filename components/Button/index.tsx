import { TimeFrame } from "@/types";

function Button({
  onClick,
  content,
  isSelected,
}: {
  onClick: () => void;
  content: string;
  isSelected: boolean;
}) {
  return (
    <button
      className={`text-black border border-gray-500 w-fit px-3 py-2 cursor-pointer first:rounded-l-2xl last:rounded-r-2xl hover:bg-gray-300 ${isSelected ? "bg-gray-400" : "bg-white "}`}
      onClick={isSelected ? undefined : onClick}
    >
      {content}
    </button>
  );
}

export default Button;
