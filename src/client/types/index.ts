import React from "react";

export interface IRow {
  index: number;
  style: React.CSSProperties;
}

export interface IHeader {
  headerMargin: number;
}

export interface IColumn {
  label: string;
  dataKey: string;
}

export interface IRowData {
  id: number;
  registrationDate: string;
  lastActivityDate: string;
  [key: string]: string | number;
}

export interface ITableData {
  data: IRowData[];
  className?: string;
}
