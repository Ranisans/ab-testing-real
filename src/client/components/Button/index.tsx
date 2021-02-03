import React from "react";

import "./index.scss";

interface IButton {
  onClick: () => void;
  value: string;
  submit?: boolean;
}

const Button: React.FC<IButton> = ({ onClick, value, submit }: IButton) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className="button"
    >
      {value.toUpperCase()}
    </button>
  );
};

export default Button;
