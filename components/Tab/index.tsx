function Tab({
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
      className={`px-3 py-2 cursor-pointer hover:bg-gray-900  ${isSelected ? "underline underline-offset-6 " : " "}`}
      onClick={isSelected ? undefined : onClick}
    >
      {content}
    </button>
  );
}

export default Tab;
