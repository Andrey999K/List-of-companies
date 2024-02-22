import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...attr }: ButtonProps) => {
  const classes =
    "rounded bg-green-400 text-white font-bold h-10 flex items-center justify-center " + (className || "");
  return (
    <button className={classes} {...attr}>
      {children}
    </button>
  );
};

export default Button;
