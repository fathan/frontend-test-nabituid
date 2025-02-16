'use client'

import { useRouter } from 'next/navigation';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Select, MenuItem } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { useParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { NumericFormat } from 'react-number-format';

import Alert from '@/app/components/molecules/Alert';
import Card from '@/app/components/molecules/Card';
import FormInput from '@/app/components/molecules/FormInput';
import ClientLocalizationProvider from '@/app/lib/DatePickerProvider';

import { useInvoicesStore } from '@/app/stores/invoicesStore';
import { useCallback, useEffect, useState } from 'react';
import { sleep, cloneObject } from '@/app/utils/app';
import { FormCategoryType } from '@/app/lib/types/app';

interface IPropsInvoiceForm {
  type: FormCategoryType;
}

const invoiceSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required'),
  invoiceNumber: z
    .string()
    .min(1, 'Invoice number is required'),
  dueDate: z
    .custom<Dayjs>((value) => dayjs(value).isValid(), {
      message: 'Invalid date',
    }),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .transform((val) => Number(val.replace(/,/g, '')))
    .refine((val) => !isNaN(val) && val > 0, { message: 'Amount must be a positive number' }),
  status: z
    .enum(['paid', 'unpaid', 'pending'], {
      errorMap: () => ({ message: 'Status is required' }),
    }),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];

const InvoiceForm: React.FC<IPropsInvoiceForm> = (props) => {
  const { type } = props;

  const { invoices, addInvoice, updateInvoice } = useInvoicesStore();
  const { id } = useParams();

  const router = useRouter();

  const [isVisibleNotificationSuccess, setIsVisibleNotificationSuccess] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      status: 'pending'
    }
  });

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setValue('dueDate', date);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setValue('amount', parseFloat(event.target.value));
    }
  };

  const status = watch('status');

  const getInvoiceById = useCallback(() => {
    const invoiceId = Array.isArray(id) ? id[0] : id;
    const filteredInvoice = invoices.find((invoice) => invoice.id === invoiceId);
    return filteredInvoice;
  }, [invoices, id]);

  useEffect(() => {
    const responseData = getInvoiceById();
    const invoice = cloneObject(responseData);
    
    if (type === 'update' && invoice) {
      const formattedDueDate = dayjs(invoice.due_date, 'DD/MM/YYYY', true);

      setValue('name', invoice.name);
      setValue('invoiceNumber', invoice.invoice_number);
      setValue('dueDate', formattedDueDate);
      setValue('amount', invoice.amount);
      setValue('status', invoice.status || 'pending');
    }
  }, [type, getInvoiceById, setValue]);

  const buildObjectData = (data: InvoiceFormData) => {
    const invoiceId = Array.isArray(id) ? id[0] : id;

    const objData = {
      id: type === 'create' ? Math.random().toString(36).slice(2) : invoiceId,
      name: data.name,
      invoice_number: data.invoiceNumber,
      due_date: data.dueDate.format('DD/MM/YYYY'),
      amount: parseFloat(data.amount.toString()),
      status: data.status
    };

    return objData;
  }

  const onResetFormState = () => {
    setValue('name', '');
    setValue('invoiceNumber', '');
    setValue('dueDate', dayjs());
    setValue('amount', 0);
    setValue('status', 'pending');

    setOpenBackdrop(false);
  }

  const renderMessageNotificationSuccess = () => {
    return (
      <Alert
        type="success"
        title={type === 'update' ? 'Invoice updated successfully!' : 'Invoice added successfully!'}
        message="You can view and manage your invoice in the 'My Invoices' section."
      />
    )
  }

  const onSubmit = async (data: InvoiceFormData) => {
    setOpenBackdrop(true);
    await sleep(3000);

    const finalData = buildObjectData(data);

    if (type === 'update') {
      updateInvoice(finalData.id, finalData);
    }
    else if (type === 'create') {
      addInvoice(finalData);
    }

    onResetFormState();
    setOpenBackdrop(false);
    
    setIsVisibleNotificationSuccess(true);
    await sleep(2000);
    
    router.push('/invoices/list');
  };

  // //////////////////////////////////////////

  return (
    <>
      <Card title={ type === 'create' ? 'Invoice Form Create' : 'Invoice Form Update' }>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <FormInput id="name" label="Name" required>
              <OutlinedInput
                autoComplete='off'
                placeholder="Enter your invoice name"
                fullWidth
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </FormInput>

            <FormInput id="invoice-number" label="Invoice" required>
              <OutlinedInput
                autoComplete='off'
                placeholder="Enter your invoice number"
                fullWidth
                {...register('invoiceNumber')}
              />
              {errors.invoiceNumber && <p className="text-red-500 text-sm">{errors.invoiceNumber.message}</p>}
            </FormInput>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormInput id="due-date" label="Due Date" required>
              <ClientLocalizationProvider>
                <DatePicker
                  className="w-full"
                  {...register('dueDate')}
                  value={watch('dueDate') || null}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                />
              </ClientLocalizationProvider>
              {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
            </FormInput>

            <FormInput id="amount" label="Amount" required>
              <div className="relative">
                <span className="absolute h-full px-7 bg-gray-500 text-gray-100 flex justify-center items-center">
                  Rp
                </span>
                <NumericFormat
                  placeholder="Enter your invoice amount"
                  customInput={OutlinedInput}
                  thousandSeparator
                  valueIsNumericString
                  fullWidth
                  prefix=""
                  autoComplete='off'
                  className="pl-20"
                  {...register('amount')}
                  onChange={handleAmountChange}
                />
              </div>
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </FormInput>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormInput id="status" label="Status" required>
              <Select
                id="status-select"
                fullWidth
                displayEmpty
                value={status || ''}
                onChange={(e) => setValue('status', e.target.value as InvoiceFormData['status'])}
              >
                <MenuItem value="" disabled sx={{ color: 'gray' }}>
                  Choose the status
                </MenuItem>
                {statusOptions.map((status) => (
                  <MenuItem
                    key={status.value}
                    value={status.value}
                  >
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </FormInput>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-24 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-[#1e2532] dark:hover:bg-gray-400 mt-12"
            >
              + Add Invoice
            </button>
          </div>
        </form>
      </Card>

      { isVisibleNotificationSuccess && renderMessageNotificationSuccess() }

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default InvoiceForm;
