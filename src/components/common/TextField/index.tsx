import React, { useState } from "react";

interface TextFieldInterface {
  value: string;
  name: string;
  onChange: (id: number, name: string, value: string) => void;
  id: number;
  className?: string;
}

const TextField = ({ value, name, onChange, id, className }: TextFieldInterface) => {
  const [currentValue, setCurrentValue] = useState(value);
  const classes = "bg-transparent " + (className || "");

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== value) onChange(id, e.target.name, e.target.value);
  };

  return (
    <input
      className={classes}
      type="text"
      value={currentValue}
      name={name}
      onChange={e => handlerChange(e)}
      onBlur={handlerBlur}
    />
  );
};

export default TextField;
