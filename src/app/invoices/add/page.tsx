import SectionTitle from "@/app/components/molecules/SectionTitle";
import InvoiceForm from "@/app/components/organisms/InvoiceForm"

const InvoiceAdd = () => {
  return (
    <>
      <SectionTitle title="Add Invoice" />
      <InvoiceForm type="create" />
    </>
  )
};

export default InvoiceAdd;
