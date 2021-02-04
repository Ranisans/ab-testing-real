import React from "react";
import Button from "../Button";

import "./index.scss";

interface IErrorWindow {
  message: string;
  isShown: boolean;
  callback: () => void;
}

const ErrorWindow: React.FC<IErrorWindow> = ({
  message,
  isShown,
  callback,
}: IErrorWindow) => {
  if (!isShown) return null;
  return (
    <div className="error_window">
      <div className="error_window-message_box">
        <h2>{message}</h2>
        <Button onClick={callback} value="ok" />
      </div>
    </div>
  );
};

export default ErrorWindow;
