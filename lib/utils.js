import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const menuList = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutGrid,
    path:"/dashboard"
  },
  {
    id: 2,
    title: "Budgets",
    icon: PiggyBank,
    path:"/dashboard/budgets"
  },
  {
    id: 3,
    title: "Expenses",
    icon: ReceiptText,
    path:"/dashboard/expenses"
  },
];