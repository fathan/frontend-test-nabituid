import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StatusInvoiceType } from '../lib/types/app';

interface IInvoice {
  id: string;
  name: string;
  invoice_number: string;
  due_date: string;
  amount: number;
  status?: StatusInvoiceType;
}

interface InvoicesStore {
  invoices: IInvoice[];
  searchName: string;
  searchStatus: string;
  setSearchName: (name: string) => void;
  setSearchStatus: (status: string) => void;
  addInvoice: (invoice: IInvoice) => void;
  updateInvoice: (id: string, invoice: IInvoice) => void;
  removeInvoice: (id: string) => void;
}

export const useInvoicesStore = create<InvoicesStore>()(
  persist(
    (set) => ({
      invoices: [],
      searchName: "",
      searchStatus: "",
      setSearchName: (name) => set({ searchName: name }),
      setSearchStatus: (status) => set({ searchStatus: status }),
      addInvoice: (invoice) => {
        if (
          !invoice.id ||
          !invoice.name ||
          !invoice.invoice_number ||
          !invoice.due_date ||
          invoice.amount === undefined ||
          !invoice.status
        ) {
          throw new Error("Invoice must have an id, name, invoice number, due date, amount, and status");
        }
        set((state) => ({ invoices: [...state.invoices, invoice] }));
      },
      updateInvoice: (id, invoiceData) => {
        set((state) => ({
          invoices: state.invoices.map((invoice) => {
            if (invoice.id === id) {
              console.log(invoice);
              console.log(invoiceData);
              return { ...invoice, ...invoiceData };
            }
            return invoice;
          }),
        }));
      },
      removeInvoice: (id) => {
        set((state) => ({
          invoices: state.invoices.filter((invoice) => invoice.id !== id),
        }))
      }
    }),
    {
      name: 'invoices-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
