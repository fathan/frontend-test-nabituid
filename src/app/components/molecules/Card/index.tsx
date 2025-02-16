import React, { ReactNode } from "react";
import CardHeader from "@/app/components/atoms/CardHeader";

interface CardProps {
  title: string;
  children: ReactNode;
}

const renderCardHeader = (title: string) => {
  return <CardHeader title={title} />
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      { title && renderCardHeader(title)}

      <div className="p-5 py-8">
        {children}
      </div>
    </div>
  );
};

export default Card;
