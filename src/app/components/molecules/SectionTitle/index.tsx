import React from "react";

interface IPropsSectionTitle {
  title: string;
  children?: React.ReactNode
}

const SectionTitle: React.FC<IPropsSectionTitle> = (props) => {
  const { title, children } = props;

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="font-bold text-3xl mb-7">
        {title}
      </div>

      <div>
        {children}
      </div>
    </div>
  )
};

export default SectionTitle;
