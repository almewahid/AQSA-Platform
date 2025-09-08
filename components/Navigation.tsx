"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell } from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/teacherdashboard", label: "لوحة التحكم" },
  { href: "/mylessons", label: "دروسي" },
  { href: "/teacherprofile/view", label: "الملف الشخصي" },
  { href: "/login", label: "تسجيل الدخول" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* شعار أو عنوان المنصة */}
        <div className="text-2xl font-bold tracking-wide">
          منصة التعليم
        </div>

        {/* Desktop Menu - في الوسط */}
        <ul className="hidden md:flex gap-8 text-lg font-medium flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "hover:text-yellow-200"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* أيقونات: الدائرة الحمراء + الإشعارات */}
        <div className="hidden md:flex items-center gap-4">
          <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white shadow-md"></div>
          <button className="text-white hover:text-yellow-300 transition-colors">
            <Bell size={22} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <ul className="flex flex-col gap-4 px-6 py-4 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-yellow-300"
                      : "hover:text-yellow-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* أيقونات في الموبايل */}
            <li className="flex items-center gap-4 mt-4">
              <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white shadow-md"></div>
              <button className="text-white hover:text-yellow-300 transition-colors">
                <Bell size={22} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
