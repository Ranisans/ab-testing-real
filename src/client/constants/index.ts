import { IColumn } from "../types";

export const CELL_HEIGHT = 50;
export const SLIDER_WIDTH = 6;

export const TABLE_COLUMN: IColumn[] = [
  { label: "UserID", dataKey: "id" },
  { label: "Date Registration", dataKey: "registrationDate" },
  { label: "Date Last Activity", dataKey: "lastActivityDate" },
];

export const MAX_NEW_USER = 5;
