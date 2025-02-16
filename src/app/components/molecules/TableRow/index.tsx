import React from "react";
import TableCell from "@/app/components/atoms/TableCell";

type Column<T> = {
  key: keyof T | "actions";
  className?: string;
  render?: (value: T[keyof T], rowData: T) => React.ReactNode;
};

type TableRowProps<T> = {
  rowData: T;
  columns: Column<T>[];
};

const TableRow = <T,>({ rowData, columns }: TableRowProps<T>) => {
  return (
    <tr className="hover:bg-gray-50">
      {columns.map((col, index) => (
        <TableCell key={index} className={col.className}>
          {col.key === "actions"
            ? col.render?.(undefined as never, rowData)
            : col.render
            ? col.render(rowData[col.key as keyof T], rowData)
            : String(rowData[col.key as keyof T])}
        </TableCell>
      ))}
    </tr>
  );
};

export default TableRow;
