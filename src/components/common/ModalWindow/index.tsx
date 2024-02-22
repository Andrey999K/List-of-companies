import React, { useRef } from "react";
import Icon from "../Icon/index.tsx";
import CardWrapper from "../CardWrapper";

interface ModalWindowInterface {
  children: React.ReactNode;
  onClickOut: () => void;
  className?: string;
  classNameCard?: string;
  blur?: string;
  closeButton?: boolean;
}

const ModalWindow = ({ children, onClickOut, className, classNameCard, blur, closeButton }: ModalWindowInterface) => {
  const classes =
    "fixed left-0 top-0 w-full h-full bg-black/50 z-[9998] overflow-y-auto" +
    (blur ? " backdrop-blur-md" : "") +
    (className ? " " + className : "");
  const background = useRef(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === background.current && onClickOut) onClickOut();
  };
  return (
    <div ref={background} onClick={handleClick} className={classes}>
      <CardWrapper
        className={"mx-auto max-w-[745px] mt-[100px] mb-[100px] relative" + (classNameCard ? " " + classNameCard : "")}
      >
        {!!closeButton && (
          <button className="!w-[30px] !h-[30px] absolute top-[20px] right-[20px]" onClick={onClickOut}>
            <Icon name="close-circle" className="!w-full !h-full" />
          </button>
        )}
        {children}
      </CardWrapper>
    </div>
  );
};

export default ModalWindow;
