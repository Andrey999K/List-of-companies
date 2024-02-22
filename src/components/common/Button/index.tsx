import React from "react";

interface ButtonInterface {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonInterface) => {
  return <button className="p-5 rounded bg-green-400">{children}</button>;
};

export default Button;
