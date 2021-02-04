import React, { useState } from "react";

import ErrorWindow from "./index";
import Button from "../Button";

export default {
  title: "Error Window",
  component: ErrorWindow,
};

export const Base: React.FC = () => {
  const [showError, setShowError] = useState(false);

  const handleCallback = () => {
    setShowError(!showError);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ErrorWindow
        message="ERROR"
        isShown={showError}
        callback={handleCallback}
      />

      <Button onClick={handleCallback} value="show" />
    </div>
  );
};
