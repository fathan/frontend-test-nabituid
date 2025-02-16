import React from "react";
import { BsCheck2, BsExclamationTriangle, BsInfoCircle, BsXCircle } from "react-icons/bs";

interface AlertIconProps {
  type: "success" | "warning" | "info" | "secondary" | "danger";
}

const AlertIcon: React.FC<AlertIconProps> = ({ type }) => {
  const icons = {
    success: <BsCheck2 className="text-white" />,
    warning: <BsExclamationTriangle className="text-white" />,
    info: <BsInfoCircle className="text-white" />,
    secondary: <BsInfoCircle className="text-white" />,
    danger: <BsXCircle className="text-white" />,
  };

  return <>{icons[type]}</>;
};

export default AlertIcon;
