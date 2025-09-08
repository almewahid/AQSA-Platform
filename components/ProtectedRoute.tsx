"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

export default function ProtectedRoute({ children, isAuthenticated }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p className="text-center mt-20">جارٍ التوجيه لصفحة تسجيل الدخول...</p>;
  }

  return <>{children}</>;
}
