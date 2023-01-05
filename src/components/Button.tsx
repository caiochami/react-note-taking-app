import { ReactNode } from "react";
import { classNames } from "../utilities/helpers";

type ButtonProps = {
  onClick?: () => void;
  color: string;
  size?: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  children?: ReactNode;
};

const sizes = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-4 py-2 text-lg",
  xl: "px-6 py-3 text-xl",
};

const colors = {
  default: "border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50",
  primary:
    "border-transparent text-white bg-indigo-700 hover:bg-indigo-600 focus:ring-indigo-500",
  danger:
    "border-transparent text-white bg-red-700 hover:bg-red-600 focus:ring-red-500",
  warning:
    "border-transparent text-white bg-yellow-700 hover:bg-yellow-600 focus:ring-yellow-500",
  secondary:
    "border-transparent text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-500",
  success:
    "border-transparent text-white bg-green-700 hover:bg-green-600 focus:ring-green-500",
};

export function Button({
  onClick,
  color = "default",
  type = "button",
  size = "md",
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "inline-flex items-center  rounded border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        sizes[size as keyof typeof sizes],
        colors[color as keyof typeof colors],
        className
      )}
    >
      {children}
    </button>
  );
}
