"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NO_LAYOUT_ROUTES = ["/login", "/signup"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = NO_LAYOUT_ROUTES.includes(pathname);

  return (
    <>
      {!hideLayout && <Navigation />}
      <main className={!hideLayout ? "p-6" : ""}>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
