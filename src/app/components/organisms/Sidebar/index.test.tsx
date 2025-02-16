import { render, screen } from "@testing-library/react";
import Sidebar from "@/app/components/organisms/Sidebar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Sidebar correctly", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Sidebar />);

    const logo = screen.getByAltText("InvoiceHub");
    expect(logo).toBeInTheDocument();

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Add Invoice")).toBeInTheDocument();
    expect(screen.getByText("My Invoices")).toBeInTheDocument();
  });

  it("should highlight the active menu item based on pathname", () => {
    (usePathname as jest.Mock).mockReturnValue("/invoices/add");

    render(<Sidebar />);

    const activeText = screen.getByText("Add Invoice");
    const activeItem = activeText.closest("a");
    expect(activeItem).toHaveClass("text-white");

    const dashboardItem = screen.getByText("Dashboard").closest("a");
    expect(dashboardItem).toHaveClass("text-gray-400");

    const myInvoicesItem = screen.getByText("My Invoices").closest("a");
    expect(myInvoicesItem).toHaveClass("text-gray-400");
  });
});
