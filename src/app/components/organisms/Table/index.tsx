import React from "react";
import TableHead from "@/app/components/molecules/TableHead";
import TableRow from "@/app/components/molecules/TableRow";

interface TableProps {
  columns: {
    label: string;
    key: string;
    className?: string
  }[];
  data: Record<string, React.ReactNode>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <TableHead columns={columns} />
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => <TableRow key={index} rowData={row} columns={columns} />)
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
