import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import "../admin.css";

export const metadata: Metadata = { title: "March91 Newsroom", robots: { index: false, follow: false } };

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
