'use client'

import { useState } from "react";
import { BsList } from "react-icons/bs";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useInvoicesStore } from "@/app/stores/invoicesStore";
import Table from "@/app/components/organisms/Table";
import Card from "@/app/components/molecules/Card";
import ConfirmDialog from "@/app/components/molecules/ConfirmDialog";
import { sleep } from "@/app/utils/app";
import { StatusInvoiceType } from "@/app/lib/types/app";
import SectionTitle from "@/app/components/molecules/SectionTitle";
import InvoiceSearch from "@/app/components/molecules/InvoiceSearch";

interface IInvoice {
  id: string;
  name: string;
  invoice_number: string;
  due_date: string;
  amount: number;
  status: StatusInvoiceType;
};

interface IColumn<T> {
  label: string;
  key: keyof T | "actions";
  className?: string;
  render?: (value: T[keyof T], rowData: T) => React.ReactNode;
};


const InvoiceList: React.FC = () => {
  const router = useRouter();

  const { invoices, removeInvoice, searchName, searchStatus } = useInvoicesStore();

  const [openActions, setOpenActions] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IInvoice | null>(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const toggleActions = (id: string) => {
    setOpenActions(openActions === id ? null : id);
  };

  const onHandleEdit = (row: IInvoice) => {
    router.push(`/invoices/${row.id}/edit`);
  }

  const onHandleDelete = async () => {
    if (selectedRow) {
      setOpenDialog(false);
      setOpenBackdrop(true);
      await sleep(2000);

      removeInvoice(selectedRow.id);
      setOpenBackdrop(false);
    }
  }

  const handleOpenDialog = (row: IInvoice) => {
    setSelectedRow(row);
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };

  const renderStatusBadge = (
    _: string | number,
    row: (typeof invoices)[number]
  ) => {
    const statusColors: Record<string, string> = {
      paid: "bg-green-500 text-white",
      unpaid: "bg-red-500 text-white",
      pending: "bg-yellow-500 text-black",
    };

    return (
      <span className={`px-2 py-1 text-sm rounded ${statusColors[row.status || "pending"]}`}>
        {row.status}
      </span>
    );
  }

  const renderActions = (
    _: string | number,
    row: IInvoice
  ) => {
    const isOpen = openActions === row.id;
    return (
      <div className="flex flex-row justify-center items-center">
        <button
          onClick={() => toggleActions(row.id)}
          className="p-2 text-gray-600 hover:text-gray-800 mt-2"
        >
          <BsList size={20} />
        </button>
        {isOpen && (
          <div className="flex flex-row gap-1 mt-2 p-2">
            <Button variant="outlined" size="small" onClick={() => onHandleEdit(row)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" size="small" onClick={() => handleOpenDialog(row)}>
              Hapus
            </Button>
          </div>
        )}
      </div>
    );
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesName = searchName
      ? invoice.name.toLowerCase().includes(searchName.toLowerCase())
      : true;
    const matchesStatus = searchStatus ? invoice.status === searchStatus : true;
    return matchesName && matchesStatus;
  });

  const formattedData = filteredInvoices.map((invoice) => ({
    id: invoice.id,
    name: invoice.name,
    invoice_number: invoice.invoice_number,
    due_date: invoice.due_date,
    amount: invoice.amount,
    status: invoice.status,
    actions: null,
  }));

  // //////////////////////////////////////////////////

  const columns: IColumn<IInvoice>[] = [
    {
      label: "Invoice",
      key: "name",
      className: "text-left"
    },
    {
      label: "Due Date",
      key: "due_date",
      className: "text-left"
    },
    {
      label: "Status",
      key: "status",
      className: "text-center",
      render: renderStatusBadge,
    },
    {
      label: "Amount",
      key: "amount",
      className: "text-center"
    },
    {
      label: "Actions",
      key: "actions",
      className: "text-center",
      render: renderActions
    },
  ];

  // //////////////////////////////////////////////////

  return (
    <div className="p-6">
      <Card title="">
        <SectionTitle title="My Invoices">
          <InvoiceSearch />
        </SectionTitle>
        <Table columns={columns} data={formattedData} />
      </Card>

      <ConfirmDialog
        open={openDialog}
        title="Delete Data?"
        message="Are you sure to delete this row data?"
        onClose={handleCloseDialog}
        onConfirm={onHandleDelete}
      />

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default InvoiceList;
