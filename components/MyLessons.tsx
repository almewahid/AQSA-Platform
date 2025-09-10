"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  BookOpen,
  XCircle,
  User,
  Search,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

/* ========== Component للعداد التنازلي ========== */
function Countdown({ iso }: { iso: string }) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!iso) return;
    const target = new Date(iso).getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("بدأت الآن");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      if (days > 0) setTimeLeft(`${days}ي ${hours}س ${minutes}د`);
      else if (hours > 0) setTimeLeft(`${hours}س ${minutes}د`);
      else setTimeLeft(`${minutes}د`);
    };

    update();
    const iv = setInterval(update, 60000); // يحدث كل دقيقة
    return () => clearInterval(iv);
  }, [iso]);

  return (
    <span className="text-xs text-blue-600 font-semibold">⏳ {timeLeft}</span>
  );
}

/* ========== الصفحة الرئيسية ========== */
export default function MyLessons() {
  const [filterText, setFilterText] = useState("");
  const [filterSubject, setFilterSubject] = useState("جميع المواد");

  const [stats] = useState({
    total: 8,
    completed: 3,
    upcoming: 3,
    remaining: 2,
  });

  const upcomingLessons = [
    {
      id: 1,
      teacher: "محمد أحمد",
      subject: "رياضيات - ثانوي",
      displayDate: "الخميس 11 سبتمبر 2025",
      dateISO: "2025-09-11T18:00:00",
      time: "6:00 مساء - 7:00 مساء",
      status: "مؤكد",
    },
    {
      id: 2,
      teacher: "سارة خالد",
      subject: "لغة إنجليزية - متوسط",
      displayDate: "الجمعة 12 سبتمبر 2025",
      dateISO: "2025-09-12T17:00:00",
      time: "5:00 مساء - 6:00 مساء",
      status: "معلق",
    },
  ];

  const completedLessons = [
    {
      id: 3,
      teacher: "أحمد علي",
      subject: "فيزياء - ثانوي",
      displayDate: "الخميس 1 سبتمبر 2025",
      dateISO: "2025-09-01T19:00:00",
      time: "7:00 مساء - 8:00 مساء",
    },
    {
      id: 5,
      teacher: "منى الشريف",
      subject: "رياضيات - ثانوي",
      displayDate: "الاثنين 8 سبتمبر 2025",
      dateISO: "2025-09-08T16:00:00",
      time: "4:00 مساء - 5:00 مساء",
    },
  ];

  const cancelledLessons = [
    {
      id: 4,
      teacher: "منى حسن",
      subject: "كيمياء - ثانوي",
      displayDate: "السبت 30 أغسطس 2025",
      dateISO: "2025-08-30T16:00:00",
      time: "4:00 مساء - 5:00 مساء",
    },
    {
      id: 6,
      teacher: "عمرو فؤاد",
      subject: "إنجليزي - متوسط",
      displayDate: "الأحد 31 أغسطس 2025",
      dateISO: "2025-08-31T10:00:00",
      time: "10:00 صباحًا - 11:00 صباحًا",
    },
  ];

  /* فلترة */
  const filterLessons = (list: any[]) => {
    return list.filter((l) => {
      const text = filterText.toLowerCase();
      const matchesText =
        l.teacher.toLowerCase().includes(text) ||
        l.subject.toLowerCase().includes(text);
      const matchesSubject =
        filterSubject === "جميع المواد" ||
        l.subject.includes(filterSubject);
      return matchesText && matchesSubject;
    });
  };

  return (
    <div dir="rtl" className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* عنوان */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold">جلساتي التعليمية</h1>
        <p className="text-gray-500 text-lg">تتبع جلساتك وإدارة رحلتك التعليمية</p>
      </motion.div>

      {/* الفلاتر */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="ابحث باسم المدرس أو المادة..."
            className="w-full rounded-xl border border-gray-300 p-2 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="w-full md:w-1/4 rounded-xl border border-gray-300 p-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>جميع المواد</option>
          <option>رياضيات</option>
          <option>لغة إنجليزية</option>
          <option>فيزياء</option>
          <option>كيمياء</option>
        </select>
      </div>

      {/* التبويبات */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="flex justify-center gap-6 bg-gray-100 rounded-xl p-2 w-fit mx-auto">
          <TabsTrigger value="upcoming" className="flex items-center gap-2 border-b-2 border-orange-400">
            <Calendar className="h-4 w-4" /> القادمة
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2 border-b-2 border-green-400">
            <CheckCircle className="h-4 w-4" /> المكتملة
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2 border-b-2 border-red-400">
            <XCircle className="h-4 w-4" /> الملغاة
          </TabsTrigger>
        </TabsList>

        {/* القادمة */}
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterLessons(upcomingLessons).map((lesson) => (
              <Card key={lesson.id} className="p-4 shadow-md rounded-xl">
                <div className="grid grid-cols-2 gap-4 items-center">
                  {/* الأزرار والحالة */}
                  <div className="flex flex-col items-start gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        lesson.status === "مؤكد"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {lesson.status}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-28 h-9 text-sm">
                      دخول الجلسة
                    </Button>
                    <Button variant="outline" className="w-28 h-9 text-sm">
                      إلغاء
                    </Button>
                  </div>
                  {/* البيانات */}
                  <div className="text-right space-y-1">
                    <h3 className="font-bold text-base flex items-center gap-1 justify-end">
                      {lesson.teacher}
                      <User className="h-4 w-4 text-gray-600" />
                    </h3>
                    <p className="text-xs text-gray-600">{lesson.subject}</p>
                    <p className="text-xs flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3 text-red-500" />
                      {lesson.displayDate}
                    </p>
                    <p className="text-xs text-gray-600">⏰ {lesson.time}</p>
                    <Countdown iso={lesson.dateISO} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* المكتملة */}
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterLessons(completedLessons).map((lesson) => (
              <Card key={lesson.id} className="p-4 shadow-md rounded-xl">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col items-start">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      مكتملة
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <h3 className="font-bold text-base flex items-center gap-1 justify-end">
                      {lesson.teacher}
                      <User className="h-4 w-4 text-gray-600" />
                    </h3>
                    <p className="text-xs text-gray-600">{lesson.subject}</p>
                    <p className="text-xs flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3 text-red-500" />
                      {lesson.displayDate}
                    </p>
                    <p className="text-xs text-gray-600">⏰ {lesson.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* الملغاة */}
        <TabsContent value="cancelled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterLessons(cancelledLessons).map((lesson) => (
              <Card key={lesson.id} className="p-4 shadow-md rounded-xl">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col items-start">
                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
                      ملغاة
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <h3 className="font-bold text-base flex items-center gap-1 justify-end">
                      {lesson.teacher}
                      <User className="h-4 w-4 text-gray-600" />
                    </h3>
                    <p className="text-xs text-gray-600">{lesson.subject}</p>
                    <p className="text-xs flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3 text-red-500" />
                      {lesson.displayDate}
                    </p>
                    <p className="text-xs text-gray-600">⏰ {lesson.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
