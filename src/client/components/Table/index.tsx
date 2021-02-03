import React from "react";
import clsx from "clsx";

import VirtualTable from "../VirtualTable";
import { IRow, IHeader, ITableData } from "../../types";
import { TABLE_COLUMN } from "../../constants";

import "./index.scss";

const Table: React.FC<ITableData> = ({ data }: ITableData) => {
  const Header = ({ headerMargin }: IHeader) => {
    return (
      <div className="table-row" style={{ paddingRight: headerMargin }}>
        {TABLE_COLUMN.map((column) => (
          <div
            key={column.dataKey}
            className={clsx("table-cell", "table-header_cell")}
          >
            <p>{column.label}</p>
          </div>
        ))}
      </div>
    );
  };

  const Row = ({ index, style }: IRow) => {
    return (
      <div className="table-row" style={style}>
        {TABLE_COLUMN.map((column) => (
          <div
            key={column.dataKey}
            className={clsx("table-cell", "table-body_cell")}
          >
            <p>{data[index][column.dataKey]}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <VirtualTable
      Header={Header}
      containerClassName="table"
      itemCount={data.length}
      Row={Row}
    />
  );
};

export default Table;
