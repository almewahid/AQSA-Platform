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

/**
 * Countdown component
 * يستقبل تاريخ بصيغة ISO (مثال: "2025-09-11T18:00:00")
 * ويعرض العد التنازلي بالعربية، أو "بدأت الآن" عند الوصول
 */
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
      const seconds = Math.floor((diff / 1000) % 60);

      if (days > 0) setTimeLeft(`${days}ي ${hours}س ${minutes}د`);
      else if (hours > 0) setTimeLeft(`${hours}س ${minutes}د ${seconds}ث`);
      else setTimeLeft(`${minutes}د ${seconds}ث`);
    };

    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, [iso]);

  return (
    <span className="text-sm text-blue-600 font-semibold">⏳ {timeLeft}</span>
  );
}

export default function MyLessons() {
  // فلتر النص وفلتر المادة
  const [filterText, setFilterText] = useState("");
  const [filterSubject, setFilterSubject] = useState("جميع المواد");

  // إحصائيات وهمية
  const [stats] = useState({
    total: 8,
    completed: 3,
    upcoming: 3,
    remaining: 2,
  });

  // بيانات الجلسات - اضفت حقل dateISO للعد التنازلي
  const upcomingLessons = [
    {
      id: 1,
      teacher: "محمد أحمد",
      subject: "رياضيات - ثانوي",
      displayDate: "الخميس 11 سبتمبر 2025",
      dateISO: "2025-09-11T18:00:00",
      time: "6:00 مساء - 7:00 مساء (60 دقيقة)",
      status: "مؤكد",
    },
    {
      id: 2,
      teacher: "سارة خالد",
      subject: "لغة إنجليزية - متوسط",
      displayDate: "الجمعة 12 سبتمبر 2025",
      dateISO: "2025-09-12T17:00:00",
      time: "5:00 مساء - 6:00 مساء (60 دقيقة)",
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
      time: "7:00 مساء - 8:00 مساء (60 دقيقة)",
    },
    {
      id: 5,
      teacher: "منى الشريف",
      subject: "رياضيات - ثانوي",
      displayDate: "الاثنين 8 سبتمبر 2025",
      dateISO: "2025-09-08T16:00:00",
      time: "4:00 مساء - 5:00 مساء (60 دقيقة)",
    },
  ];

  const cancelledLessons = [
    {
      id: 4,
      teacher: "منى حسن",
      subject: "كيمياء - ثانوي",
      displayDate: "السبت 30 أغسطس 2025",
      dateISO: "2025-08-30T16:00:00",
      time: "4:00 مساء - 5:00 مساء (60 دقيقة)",
    },
    {
      id: 6,
      teacher: "عمرو فؤاد",
      subject: "إنجليزي - متوسط",
      displayDate: "الأحد 31 أغسطس 2025",
      dateISO: "2025-08-31T10:00:00",
      time: "10:00 صباحًا - 11:00 صباحًا (60 دقيقة)",
    },
  ];

  // فلترة عامة تستخدم الفلتر النصي وفلتر المادة
  const filterLessons = (list: any[]) => {
    return list.filter((l) => {
      const matchesText =
        l.teacher.toLowerCase().includes(filterText.toLowerCase()) ||
        l.subject.toLowerCase().includes(filterText.toLowerCase());
      const matchesSubject =
        filterSubject === "جميع المواد" ||
        l.subject.toLowerCase().includes(filterSubject.toLowerCase());
      return matchesText && matchesSubject;
    });
  };

  return (
    // اتجاه النص عربي RTL والمحاذاة لليمين
    <div dir="rtl" className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold">جلساتي التعليمية</h1>
        <p className="text-gray-500 text-lg">تتبع جلساتك وإدارة رحلتك التعليمية</p>
      </motion.div>

      {/* الإحصائيات - كل كرت على عمودين: أيقونة كبيرة + بيانات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: "إجمالي الجلسات",
            value: stats.total,
            icon: <BookOpen className="h-16 w-16 text-blue-500" />,
          },
          {
            title: "الجلسات المكتملة",
            value: stats.completed,
            icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          },
          {
            title: "الجلسات القادمة",
            value: stats.upcoming,
            icon: <Calendar className="h-16 w-16 text-orange-500" />,
          },
          {
            title: "الجلسات المتبقية",
            value: stats.remaining,
            icon: <XCircle className="h-16 w-16 text-purple-500" />,
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <Card className="p-4 grid grid-cols-2 items-center gap-2 shadow-md rounded-2xl">
              {/* عمود الأيقونة */}
              <div className="flex justify-center items-center">{item.icon}</div>

              {/* عمود البيانات */}
              <div className="text-right">
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* الفلاتر - في المنتصف */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {/* بحث نصي */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="ابحث باسم المدرس أو المادة..."
            className="w-full rounded-xl border border-gray-300 p-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
        </div>

        {/* اختيار المادة */}
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="w-full md:w-1/4 rounded-xl border border-gray-300 p-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <Calendar className="h-5 w-5" /> القادمة
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2 border-b-2 border-green-400">
            <CheckCircle className="h-5 w-5" /> المكتملة
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2 border-b-2 border-red-400">
            <XCircle className="h-5 w-5" /> الملغاة
          </TabsTrigger>
        </TabsList>

        {/* ====== القادمة (كل صف يحوي كرتين) ====== */}
        <TabsContent value="upcoming" className="mt-6">
          {filterLessons(upcomingLessons).length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات قادمة</p>
              <Link href="/booking">
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                  احجز جلسة جديدة
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterLessons(upcomingLessons).map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="p-6 shadow-lg rounded-2xl">
                    {/* داخل الكرت: عمودان داخلياً */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      {/* العمود الأول: الأزرار والحالة (يسار) */}
                      <div className="flex flex-col items-start gap-3">
                        <span
                          className={`px-4 py-2 rounded-full text-base font-semibold ${
                            lesson.status === "مؤكد"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {lesson.status}
                        </span>

                        <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-36 h-11 rounded-xl shadow-sm">
                          دخول الجلسة
                        </Button>

                        <Button variant="outline" className="w-36 h-11 rounded-xl">
                          إلغاء الحجز
                        </Button>
                      </div>

                      {/* العمود الثاني: بيانات الجلسة (يمين، محاذاة يمين) */}
                      <div className="text-right space-y-2">
                        <h3 className="font-bold text-xl flex items-center gap-2 justify-end">
                          {lesson.teacher}
                          <User className="h-6 w-6 text-gray-600" />
                        </h3>
                        <p className="text-md text-gray-600">{lesson.subject}</p>
                        <p className="text-md mt-1 flex items-center gap-2 justify-end">
                          <Calendar className="h-5 w-5 text-red-500" />
                          <span>{lesson.displayDate}</span>
                        </p>
                        <p className="text-md text-gray-600 flex items-center gap-2 justify-end">
                          ⏰ {lesson.time}
                        </p>

                        {/* عداد تنازلي */}
                        <div className="mt-2">
                          <Countdown iso={lesson.dateISO} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ====== المكتملة (شبكة 2 عمود) ====== */}
        <TabsContent value="completed" className="mt-6">
          {filterLessons(completedLessons).length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات مكتملة</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterLessons(completedLessons).map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="p-6 shadow-lg rounded-2xl">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      {/* العمود الأول: الحالة (يسار) */}
                      <div className="flex flex-col items-start gap-3">
                        <span className="px-4 py-2 rounded-full text-base font-semibold bg-gray-100 text-gray-600">
                          مكتملة
                        </span>
                      </div>

                      {/* العمود الثاني: البيانات (يمين) */}
                      <div className="text-right space-y-2">
                        <h3 className="font-bold text-xl flex items-center gap-2 justify-end">
                          {lesson.teacher}
                          <User className="h-6 w-6 text-gray-600" />
                        </h3>
                        <p className="text-md text-gray-600">{lesson.subject}</p>
                        <p className="text-md mt-1 flex items-center gap-2 justify-end">
                          <Calendar className="h-5 w-5 text-red-500" />
                          <span>{lesson.displayDate}</span>
                        </p>
                        <p className="text-md text-gray-600 flex items-center gap-2 justify-end">
                          ⏰ {lesson.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ====== الملغاة (شبكة 2 عمود) ====== */}
        <TabsContent value="cancelled" className="mt-6">
          {filterLessons(cancelledLessons).length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <XCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات ملغاة</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterLessons(cancelledLessons).map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="p-6 shadow-lg rounded-2xl">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      {/* العمود الأول: الحالة (يسار) */}
                      <div className="flex flex-col items-start gap-3">
                        <span className="px-4 py-2 rounded-full text-base font-semibold bg-red-100 text-red-600">
                          ملغاة
                        </span>
                      </div>

                      {/* العمود الثاني: البيانات (يمين) */}
                      <div className="text-right space-y-2">
                        <h3 className="font-bold text-xl flex items-center gap-2 justify-end">
                          {lesson.teacher}
                          <User className="h-6 w-6 text-gray-600" />
                        </h3>
                        <p className="text-md text-gray-600">{lesson.subject}</p>
                        <p className="text-md mt-1 flex items-center gap-2 justify-end">
                          <Calendar className="h-5 w-5 text-red-500" />
                          <span>{lesson.displayDate}</span>
                        </p>
                        <p className="text-md text-gray-600 flex items-center gap-2 justify-end">
                          ⏰ {lesson.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
