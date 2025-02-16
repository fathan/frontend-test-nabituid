import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, required }) => {
  return (
    <label htmlFor={htmlFor} className="block mb-2 font-semibold">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;