import React from "react";

interface CardWrapperProps {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const CardWrapper = ({ className, children, ...attr }: CardWrapperProps) => {
  const classes =
    "rounded-[20px] p-5 bg-white duration-300 w-full flex flex-col gap-3 md:gap-4" + (className ? " " + className : "");
  return (
    <div className={classes} {...attr}>
      {children}
    </div>
  );
};

export default CardWrapper;
