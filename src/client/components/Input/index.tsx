import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./index.scss";
import clsx from "clsx";

interface IInput {
  className?: string;
}

interface ITextInput extends IInput {
  onChange: (value: string) => void;
}

interface IDateInput extends IInput {
  onChange: (value: Date) => void;
}

export const TextInput: React.FC<ITextInput> = ({
  onChange,
  className = "",
}: ITextInput) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };
  return (
    <div className={clsx("input-field", className)}>
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export const DateInput: React.FC<IDateInput> = ({
  onChange,
  className = "",
}: IDateInput) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    onChange(date);
    setStartDate(date);
  };

  return (
    <div className={clsx("input-field", className)}>
      <DatePicker
        selected={startDate}
        dateFormat="dd-MM-yyy"
        onChange={handleChange}
      />
    </div>
  );
};
