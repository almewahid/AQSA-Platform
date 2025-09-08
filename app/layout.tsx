import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "منصة التعليم الإلكتروني",
  description: "منصة تعليمية تفاعلية للطلاب والمعلمين",
  generator: "v0.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo antialiased bg-gray-50 min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
