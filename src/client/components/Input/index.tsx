import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./index.scss";
import clsx from "clsx";

interface IInput {
  className?: string;
}

interface ITextInput extends IInput {
  textValue?: string;
  onChange: (value: string) => void;
}

interface IDateInput extends IInput {
  dateValue?: Date;
  onChange: (value: Date) => void;
}

export const TextInput: React.FC<ITextInput> = ({
  onChange,
  textValue,
  className = "",
}: ITextInput) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };
  return (
    <div className={clsx("input-field", className)}>
      <input type="text" onChange={handleChange} value={textValue} />
    </div>
  );
};

export const DateInput: React.FC<IDateInput> = ({
  onChange,
  dateValue,
  className = "",
}: IDateInput) => {
  const handleChange = (date: Date) => {
    onChange(date);
  };

  return (
    <div className={clsx("input-field", className)}>
      <DatePicker
        selected={dateValue}
        dateFormat="dd-MM-yyy"
        onChange={handleChange}
      />
    </div>
  );
};
