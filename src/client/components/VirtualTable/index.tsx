import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { IHeader, IRow } from "../../types";
import { SLIDER_WIDTH, CELL_HEIGHT } from "../../constants";

import "./index.scss";

type THeader = (data: IHeader) => JSX.Element;
type TRow = (data: IRow) => JSX.Element;

interface ITableBody {
  itemCount: number;
  Row: TRow;
  className?: string;
}

interface IVirtualTableBody extends ITableBody {
  cellHeight: number;
}

interface IVirtualTable extends ITableBody {
  Header: THeader;
  containerClassName: string;
}

const VirtualTableBody: React.FC<IVirtualTableBody> = ({
  itemCount,
  Row,
  cellHeight,
  className = "",
}: IVirtualTableBody) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemCount={itemCount}
          itemSize={cellHeight}
          className={clsx("virtual_table", className)}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

const VirtualTable: React.FC<IVirtualTable> = ({
  itemCount,
  Row,
  Header,
  containerClassName,
  className = "",
}: IVirtualTable) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [headerMargin, setHeaderMargin] = useState<number>(0);

  useEffect(() => {
    if (listRef.current) {
      const { current } = listRef;
      const viewportHeight = current.clientHeight;
      const dataLength = itemCount * CELL_HEIGHT;
      if (viewportHeight < dataLength) {
        setHeaderMargin(SLIDER_WIDTH);
      } else {
        setHeaderMargin(0);
      }
    }
  }, [itemCount]);

  return (
    <div className={containerClassName}>
      <Header headerMargin={headerMargin} />
      <div style={{ height: "100%" }} ref={listRef}>
        <VirtualTableBody
          itemCount={itemCount}
          Row={Row}
          cellHeight={CELL_HEIGHT}
          className={className}
        />
      </div>
    </div>
  );
};

export default VirtualTable;
