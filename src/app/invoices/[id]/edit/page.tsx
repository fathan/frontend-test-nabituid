import SectionTitle from "@/app/components/molecules/SectionTitle";
import InvoiceForm from "@/app/components/organisms/InvoiceForm"

const InvoiceAdd = () => {
  return (
    <>
      <SectionTitle title="Update Invoice" />
      <InvoiceForm type="update" />
    </>
  )
};

export default InvoiceAdd;
