import React from "react";

export interface TableHeadCellProps {
  label: string;
  className?: string;
}

const TableHeadCell: React.FC<TableHeadCellProps> = ({ label, className }) => {
  return <th className={`px-4 py-4 text-left ${className}`}>{label}</th>;
};

export default TableHeadCell;
