"use client";

import { useRouter, usePathname } from "next/navigation";
import { Select, MenuItem, OutlinedInput } from "@mui/material";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useInvoicesStore } from "@/app/stores/invoicesStore";

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
];

const InvoiceSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { searchName, searchStatus, setSearchName, setSearchStatus } = useInvoicesStore();

  const [inputValue, setInputValue] = useState(searchName);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchName) params.set("name", searchName);
    if (searchStatus) params.set("status", searchStatus);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchName, searchStatus, router, pathname]);

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchName(inputValue);
    }
  };

  const handleReset = () => {
    setSearchName("");
    setSearchStatus("");

    setInputValue("");

    router.push("/invoices/list", { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-60">
          <div className="relative">
            <div className="absolute top-0 left-0 z-40 w-10 h-full flex justify-center items-center text-gray-500">
              <HiOutlineSearch />
            </div>

            <OutlinedInput
              placeholder="Search by Name"
              type="text"
              size="small"
              fullWidth
              className="pl-6 bg-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSearchEnter}
            />
          </div>
        </div>

        <div className="w-72 rounded-lg">
          <Select
            id="status-search"
            fullWidth
            size="small"
            className="text-gray-500 bg-white"
            displayEmpty
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            renderValue={(selected) =>
              selected
                ? statusOptions.find((opt) => opt.value === selected)?.label
                : "All Status"
            }
          >
            <MenuItem value="">
              All Status
            </MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="w-40">
          <Button variant="outlined" onClick={handleReset}>
            Reset Filter
          </Button>
        </div>
      </div>
    </>
  );
};

export default InvoiceSearch;
