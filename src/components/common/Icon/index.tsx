import sprite from "../../../assets/sprite.svg";
import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

const Icon = ({ name, className = "", ...props }: IconProps) => (
  <svg className={`icon w-[22px] h-[22px] ${className}`} {...props}>
    <use xlinkHref={`${sprite}#${name}`} />
  </svg>
);

export default Icon;
