import React from "react";

import { DateInput, TextInput } from "./index";

export default {
  title: "Date Input",
  component: DateInput,
};

export const Base: React.FC = () => {
  const handleChange = (data: string | Date) => {
    console.log(data);
  };

  return (
    <div
      style={{
        height: 100,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        backgroundColor: "gray",
      }}
    >
      <DateInput onChange={handleChange} />
      <TextInput onChange={handleChange} />
    </div>
  );
};
