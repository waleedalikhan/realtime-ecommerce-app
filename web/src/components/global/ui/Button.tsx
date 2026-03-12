import React from "react";
import { cn } from "@/lib/clx";

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "outline";
  ariaLabel?: string;
};

const Button: React.FC<Props> = ({
  children,
  className,
  onClick,
  type = "button",
  disabled,
  size = "md",
  variant = "primary",
  ariaLabel,
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-6 text-base font-semibold cursor-pointer transition",
        {
          "py-2.5": size === "sm",
          "py-3.5": size === "md",
          "bg-amber-500 text-[#0c0c0f] shadow-[0_0_0_1px_rgba(251,191,36,0.3)] hover:bg-amber-400 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)]":
            variant === "primary",
          "text-white border border-stone-600 bg-stone-800/40 hover:border-stone-500 hover:bg-stone-800/70":
            variant === "outline",
          "bg-stone-800 text-white hover:bg-stone-700": variant === "secondary",
        },
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
