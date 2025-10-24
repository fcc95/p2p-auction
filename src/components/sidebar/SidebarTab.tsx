type IProps = {
  onClick: () => void;
  isActive: boolean;
  label: string;
};

const SidebarTab = ({ onClick, isActive, label }: IProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {label}
    </div>
  );
};

export default SidebarTab;
