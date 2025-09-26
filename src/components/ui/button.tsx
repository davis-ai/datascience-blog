import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, variant = "solid", className = "", ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-semibold transition";
  const variantStyles =
    variant === "outline"
      ? "border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
      : "bg-yellow-400 text-black hover:bg-yellow-500";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export { Button };