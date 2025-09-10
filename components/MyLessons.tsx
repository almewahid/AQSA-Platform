"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, BookOpen, XCircle, User, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// مؤقت بسيط للعد التنازلي
function Countdown({ target }: { target: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        setTimeLeft("بدأت الآن");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      setTimeLeft(`${hours}س ${minutes}د`);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return <span className="text-sm text-blue-600 font-semibold">⏳ {timeLeft}</span>;
}

export default function MyLessons() {
  const [filter, setFilter] = useState("");

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
      date: "2025-09-11T18:00:00",
      displayDate: "الأحد 11 سبتمبر 2025",
      time: "6:00 مساء - 7:00 مساء (60 دقيقة)",
      status: "مؤكد",
    },
  ];

  const completedLessons = [
    {
      id: 2,
      teacher: "أحمد علي",
      subject: "فيزياء - ثانوي",
      date: "الخميس 1 سبتمبر 2025",
      time: "7:00 مساء - 8:00 مساء (60 دقيقة)",
    },
  ];

  const cancelledLessons = [
    {
      id: 3,
      teacher: "منى حسن",
      subject: "كيمياء - ثانوي",
      date: "السبت 30 أغسطس 2025",
      time: "4:00 مساء - 5:00 مساء (60 دقيقة)",
    },
  ];

  // فلترة الدروس حسب البحث
  const filterLessons = (lessons: any[]) => {
    return lessons.filter(
      (l) => l.teacher.includes(filter) || l.subject.includes(filter)
    );
  };

  // تصدير الجلسات CSV
  const exportCSV = () => {
    const all = [...upcomingLessons, ...completedLessons, ...cancelledLessons];
    const rows = all.map((l) => `${l.teacher},${l.subject},${l.date},${l.time}`);
    const csv = ["المعلم,المادة,التاريخ,الوقت", ...rows].join("\\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lessons.csv";
    a.click();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen relative">
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern.png')] bg-cover" />

      {/* العنوان */}
      <div className="text-center space-y-2 relative">
        <h1 className="text-3xl font-bold">جلساتي التعليمية</h1>
        <p className="text-gray-500 text-lg">
          تتبع جلساتك وإدارة رحلتك التعليمية
        </p>
      </div>

      {/* شريط البحث + زر تصدير */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between relative">
        <Input
          placeholder="🔍 ابحث حسب المادة أو اسم المدرس"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md rounded-xl"
        />
        <Button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md"
        >
          <Download className="w-4 h-4" /> تصدير CSV
        </Button>
      </div>

      {/* الكروت الإحصائية */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        {[
          {
            icon: <BookOpen className="h-6 w-6 text-blue-500" />,
            title: "إجمالي الجلسات",
            value: stats.total,
            color: "bg-blue-100",
          },
          {
            icon: <CheckCircle className="h-6 w-6 text-green-500" />,
            title: "الجلسات المكتملة",
            value: stats.completed,
            color: "bg-green-100",
          },
          {
            icon: <Calendar className="h-6 w-6 text-orange-500" />,
            title: "الجلسات القادمة",
            value: stats.upcoming,
            color: "bg-orange-100",
          },
          {
            icon: <XCircle className="h-6 w-6 text-red-500" />,
            title: "الجلسات الملغاة",
            value: stats.remaining,
            color: "bg-red-100",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="p-4 flex items-center justify-between rounded-2xl shadow-lg">
              <div>
                <p className="text-base text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <div className={`${item.color} p-3 rounded-full`}>{item.icon}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* التبويبات */}
      <Tabs defaultValue="upcoming" className="w-full relative">
        <TabsList className="flex justify-center gap-6 rounded-xl p-2 w-fit mx-auto">
          <TabsTrigger
            value="upcoming"
            className="bg-orange-50 data-[state=active]:bg-orange-200 rounded-xl"
          >
            القادمة
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="bg-green-50 data-[state=active]:bg-green-200 rounded-xl"
          >
            المكتملة
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="bg-red-50 data-[state=active]:bg-red-200 rounded-xl"
          >
            الملغاة
          </TabsTrigger>
        </TabsList>

        {/* الجلسات القادمة */}
        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {filterLessons(upcomingLessons).map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="p-4 flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-lg">
                <div className="text-right">
                  <h3 className="font-bold text-lg flex items-center gap-2 justify-end">
                    {lesson.teacher} <User className="h-5 w-5 text-gray-600" />
                  </h3>
                  <p className="text-sm text-gray-500">{lesson.subject}</p>
                  <p className="text-sm mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-4 w-4 text-red-500" />{" "}
                    {lesson.displayDate}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                    ⏰ {lesson.time}
                  </p>
                  <Countdown target={new Date(lesson.date)} />
                </div>
                <div className="flex flex-col items-start gap-2 mt-3 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      lesson.status === "مؤكد"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {lesson.status}
                  </span>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-28 rounded-xl shadow-md">
                    دخول الجلسة
                  </Button>
                  <Button
                    variant="outline"
                    className="w-28 rounded-xl border-gray-300"
                  >
                    إلغاء الحجز
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        {/* المكتملة */}
        <TabsContent value="completed" className="mt-6 space-y-4">
          {filterLessons(completedLessons).map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="p-4 flex justify-between items-center rounded-2xl shadow-lg">
                <div className="text-right">
                  <h3 className="font-bold text-lg flex items-center gap-2 justify-end">
                    {lesson.teacher} <User className="h-5 w-5 text-gray-600" />
                  </h3>
                  <p className="text-sm text-gray-500">{lesson.subject}</p>
                  <p className="text-sm mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-4 w-4 text-red-500" /> {lesson.date}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                    ⏰ {lesson.time}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                  مكتملة
                </span>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        {/* الملغاة */}
        <TabsContent value="cancelled" className="mt-6 space-y-4">
          {filterLessons(cancelledLessons).map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="p-4 flex justify-between items-center rounded-2xl shadow-lg">
                <div className="text-right">
                  <h3 className="font-bold text-lg flex items-center gap-2 justify-end">
                    {lesson.teacher} <User className="h-5 w-5 text-gray-600" />
                  </h3>
                  <p className="text-sm text-gray-500">{lesson.subject}</p>
                  <p className="text-sm mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-4 w-4 text-red-500" /> {lesson.date}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                    ⏰ {lesson.time}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">
                  ملغاة
                </span>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
