import { render, screen } from "@testing-library/react";
import Alert from "@/app/components/molecules/Alert";
import AlertIcon from "@/app/components/atoms/AlertIcon";
import { AlertType } from "@/app/lib/types/app";

jest.mock("./../../../components/atoms/AlertIcon", () => ({
  default: jest.fn(() => <svg data-testid="alert-icon" />)
}));

describe("Alert Component", () => {
  const testCases = [
    { type: "success", title: "Success", message: "Operation successful" },
    { type: "warning", title: "Warning", message: "This is a warning" },
    { type: "info", title: "Info", message: "Information message" },
    { type: "secondary", title: "Note", message: "This is a secondary alert" },
    { type: "danger", title: "Error", message: "Something went wrong" },
  ];

  testCases.forEach(({ type, title, message }) => {
    it(`renders ${type} alert correctly`, () => {
      render(<Alert type={type as AlertType} title={title} message={message} />);

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
      expect(AlertIcon).toHaveBeenCalledWith({ type }, {});
    });
  });
});
