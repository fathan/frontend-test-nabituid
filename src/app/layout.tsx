import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/organisms/Navbar";
import Sidebar from "./components/organisms/Sidebar";

export const metadata: Metadata = {
  title: "Invoice Hub - Invoice Management System",
  description: "Invoice Hub - Invoice Management System build by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-[#f8f9fc]" suppressHydrationWarning={true}>
        <Sidebar />

        <div className="ml-64">
          <Navbar />

          <div className="p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
