type IProps = {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  text: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
};

const Button = ({
  type = "button",
  loading = false,
  disabled = false,
  text,
  variant = "primary",
  className = "",
  onClick,
}: IProps) => {
  const baseClasses =
    "px-4 py-3 rounded-lg font-medium w-full focus:outline-none";

  const variantClasses = {
    primary: disabled
      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: disabled
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} `}
    >
      {loading ? <div className="animate-spin">Loading...</div> : text}
    </button>
  );
};

export default Button;
