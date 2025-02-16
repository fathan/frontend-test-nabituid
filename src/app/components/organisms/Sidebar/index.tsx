"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoInvoice from "@/app/assets/images/logo-invoice.png";
import { MenuItem } from "@/app/lib/types/sidebar";

import { LiaListSolid } from "react-icons/lia";
import { BsTextParagraph } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: (
      <RxDashboard />
    ),
  },
  {
    label: "Add Invoice",
    href: "/invoices/add",
    icon: (
      <BsTextParagraph />
    ),
  },
  {
    label: "My Invoices",
    href: "/invoices/list",
    icon: (
      <LiaListSolid />
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#1e2532] text-white px-4">
      <Link href={'/'} className="p-6">
        <Image
          src={LogoInvoice}
          alt="InvoiceHub"
          className="pl-4"
          height={50}
        />
      </Link>

      <div>
        <p className="px-6 text-sm text-gray-400">
          MENU
        </p>

        <div className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 ${
                pathname === item.href ? "text-white" : "text-gray-400"
              }`}
            >
              {item.icon}
              
              <span className="ml-4">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
