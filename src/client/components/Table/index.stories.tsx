import React from "react";

import Table from "./index";
import { IRowData } from "../../types";

export default {
  title: "Table",
  component: Table,
};

function convertDate(d: Date) {
  function pad(s: number) {
    return s < 10 ? `0${s}` : s;
  }
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(".");
}

export const Base: React.FC = () => {
  const date = convertDate(new Date());
  const testSet: IRowData[] = [
    { id: 1, lastActivityDate: date, registrationDate: date },
    { id: 2, lastActivityDate: date, registrationDate: date },
    { id: 3, lastActivityDate: date, registrationDate: date },
    { id: 4, lastActivityDate: date, registrationDate: date },
    { id: 5, lastActivityDate: date, registrationDate: date },
    { id: 6, lastActivityDate: date, registrationDate: date },
    { id: 7, lastActivityDate: date, registrationDate: date },
    { id: 8, lastActivityDate: date, registrationDate: date },
    { id: 9, lastActivityDate: date, registrationDate: date },
    { id: 10, lastActivityDate: date, registrationDate: date },
    { id: 11, lastActivityDate: date, registrationDate: date },
    { id: 12, lastActivityDate: date, registrationDate: date },
    { id: 13, lastActivityDate: date, registrationDate: date },
    { id: 14, lastActivityDate: date, registrationDate: date },
    { id: 15, lastActivityDate: date, registrationDate: date },
    { id: 16, lastActivityDate: date, registrationDate: date },
    { id: 17, lastActivityDate: date, registrationDate: date },
    { id: 18, lastActivityDate: date, registrationDate: date },
    { id: 19, lastActivityDate: date, registrationDate: date },
    { id: 20, lastActivityDate: date, registrationDate: date },
    { id: 21, lastActivityDate: date, registrationDate: date },
    { id: 22, lastActivityDate: date, registrationDate: date },
    { id: 23, lastActivityDate: date, registrationDate: date },
    { id: 24, lastActivityDate: date, registrationDate: date },
    { id: 25, lastActivityDate: date, registrationDate: date },
    { id: 26, lastActivityDate: date, registrationDate: date },
    { id: 27, lastActivityDate: date, registrationDate: date },
    { id: 28, lastActivityDate: date, registrationDate: date },
    { id: 29, lastActivityDate: date, registrationDate: date },
    { id: 30, lastActivityDate: date, registrationDate: date },
  ];

  return <Table data={testSet} />;
};
