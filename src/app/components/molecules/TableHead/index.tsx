import React from "react";
import TableHeadCell from "@/app/components/atoms/TableHeadCell";

interface TableHeadProps {
  columns: {
    label: string;
    className?: string
  }[];
}

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        {columns.map((col, index) => (
          <TableHeadCell
            key={index}
            label={col.label}
            className={col.className}
          />
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
