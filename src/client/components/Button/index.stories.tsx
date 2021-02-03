import React from "react";

import Button from "./index";

export default {
  title: "Button",
  component: Button,
};

export const Base: React.FC = () => {
  const onClick = () => alert("Clicked!");
  return <Button onClick={onClick} value="Create" />;
};
