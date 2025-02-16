import React from "react";
import Label from "@/app/components/atoms/Label";

interface FormInputProps {
  id: string;
  label: string;
  required?: boolean;
  children?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, required, children }) => {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
    </div>
  );
};

export default FormInput;