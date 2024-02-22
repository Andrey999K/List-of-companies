import React, { useState } from "react";

interface TextFieldInterface {
  value: string;
  name: string;
  onChange: (id: number, name: string, value: string) => void;
  id: number;
}

const TextField = ({ value, name, onChange, id }: TextFieldInterface) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handlerBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== value) onChange(id, e.target.name, e.target.value);
  };

  return <input type="text" value={currentValue} name={name} onChange={e => handlerChange(e)} onBlur={handlerBlur} />;
};

export default TextField;
