import React, { useState } from "react";

interface TextFieldInterface {
  value: string;
  name: string;
  onChange: (name: string, value: string, id?: number) => void;
  id?: number;
  className?: string;
  placeholder?: string;
  label?: string;
  type?: string;
}

const TextField = ({ value, name, onChange, id, className, placeholder, label, type }: TextFieldInterface) => {
  const [currentValue, setCurrentValue] = useState(value);
  const classes = "bg-transparent " + (className || "");

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number" && /\D/.test(e.target.value)) return;
    setCurrentValue(e.target.value);
  };

  const handlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== value)
      id ? onChange(e.target.name, e.target.value, id) : onChange(e.target.name, e.target.value, id);
  };

  return (
    <label className="flex flex-col">
      {!!label && <span className="mb-2">{label}</span>}
      <input
        className={classes}
        type="text"
        value={currentValue}
        name={name}
        onChange={e => handlerChange(e)}
        onBlur={handlerBlur}
        placeholder={placeholder || ""}
      />
    </label>
  );
};

export default TextField;
