import React from "react";

interface CardHeaderProps {
  title: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  return (
    <div className="border-b border-gray-300 py-3 px-5">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>
    </div>
  );
};

export default CardHeader;
