import React from "react";

import "./index.scss";
import clsx from "clsx";

interface IButton {
  onClick: () => void;
  value: string;
  submit?: boolean;
  className?: string;
}

const Button: React.FC<IButton> = ({
  onClick,
  value,
  submit,
  className = "",
}: IButton) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={clsx("button", className)}
    >
      {value.toUpperCase()}
    </button>
  );
};

export default Button;
