import React from "react";
import AlertIcon from "@/app/components/atoms/AlertIcon";
import { AlertType } from "@/app/lib/types/app";

interface AlertProps {
  type: AlertType;
  title: string;
  message: string;
}

const alertStyles = {
  success: "bg-green-50 border-l-4 border-green-400 text-green-800",
  warning: "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800",
  info: "bg-blue-50 border-l-4 border-blue-400 text-blue-800",
  secondary: "bg-gray-50 border-l-4 border-gray-400 text-gray-800",
  danger: "bg-red-50 border-l-4 border-red-400 text-red-800",
};

const iconWrapperStyles = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  secondary: "bg-gray-500",
  danger: "bg-red-500",
};

const Alert: React.FC<AlertProps> = ({ type, title, message }) => {
  return (
    <div className={`mt-6 p-4 rounded-lg ${alertStyles[type]}`}>
      <div className="flex items-center">
        <div className={`p-2 rounded-lg mr-3 ${iconWrapperStyles[type]}`}>
          <AlertIcon type={type} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;