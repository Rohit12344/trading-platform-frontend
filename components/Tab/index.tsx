import { useAccountStore } from "@/store";

function Tab({
  onClick,
  content,
  isSelected,
}: {
  onClick: () => void;
  content: string;
  isSelected: boolean;
}) {
  const theme = useAccountStore((state) => state.theme);
  return (
    <button
      className={`px-3 py-2 cursor-pointer   ${isSelected ? "underline underline-offset-6 " : " "} ${theme === "light" ? "hover:bg-gray-400" : "hover:bg-gray-900"}`}
      onClick={isSelected ? undefined : onClick}
    >
      {content}
    </button>
  );
}

export default Tab;
