"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  BookOpen,
  XCircle,
  User,
  Search,
  Filter,
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// دالة لحساب المدة بين وقت البداية والنهاية
function calculateDuration(time: string) {
  try {
    const [start, end] = time.split(" - ");
    if (!start || !end) return "";

    const to24 = (t: string) => {
      let [h, rest] = t.split(":");
      let hour = parseInt(h);
      let minute = parseInt(rest.split(" ")[0]);
      const suffix = rest.includes("مساء") ? "PM" : "AM";
      if (suffix === "PM" && hour < 12) hour += 12;
      if (suffix === "AM" && hour === 12) hour = 0;
      return hour * 60 + minute;
    };

    const duration = to24(end) - to24(start);
    return `${duration} دقيقة`;
  } catch {
    return "";
  }
}

// مكون العد التنازلي
function Countdown({ iso }: { iso: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(iso).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft("بدأت الجلسة");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft(`⏳ ${days}ي ${hours}س ${minutes}د`);
    }, 60000);

    return () => clearInterval(interval);
  }, [iso]);

  return (
    <p className="text-xs text-red-500 flex items-center gap-1 justify-end">
      {timeLeft}
    </p>
  );
}

export default function MyLessons() {
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
      date: "2025-09-12T17:00:00",
      displayDate: "الجمعة 12 سبتمبر 2025",
      time: "5:00 مساء - 6:00 مساء",
      status: "مؤكد",
    },
    {
      id: 2,
      teacher: "سارة خالد",
      subject: "لغة إنجليزية - متوسط",
      date: "2025-09-14T17:00:00",
      displayDate: "الأحد 14 سبتمبر 2025",
      time: "5:00 مساء - 6:00 مساء",
      status: "معلق",
    },
  ];

  const completedLessons = [
    {
      id: 3,
      teacher: "أحمد علي",
      subject: "فيزياء - ثانوي",
      date: "2025-09-05T19:00:00",
      displayDate: "الجمعة 5 سبتمبر 2025",
      time: "7:00 مساء - 8:00 مساء",
    },
  ];

  const cancelledLessons = [
    {
      id: 4,
      teacher: "منى حسن",
      subject: "كيمياء - ثانوي",
      date: "2025-09-01T16:00:00",
      displayDate: "الاثنين 1 سبتمبر 2025",
      time: "4:00 مساء - 5:00 مساء",
    },
  ];

  return (
    <div dir="rtl" className="p-6 space-y-6">
      {/* العنوان */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">جلساتي التعليمية</h1>
        <p className="text-gray-500 text-lg">
          تتبع جلساتك وإدارة رحلتك التعليمية
        </p>
      </div>

      {/* الكروت الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 grid grid-cols-2 items-center shadow-md">
          <BookOpen className="h-12 w-12 text-blue-500 mx-auto" />
          <div className="text-right">
            <p className="text-sm text-gray-500">إجمالي الجلسات</p>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
        </Card>

        <Card className="p-4 grid grid-cols-2 items-center shadow-md">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <div className="text-right">
            <p className="text-sm text-gray-500">الجلسات المكتملة</p>
            <p className="text-xl font-bold">{stats.completed}</p>
          </div>
        </Card>

        <Card className="p-4 grid grid-cols-2 items-center shadow-md">
          <Calendar className="h-12 w-12 text-orange-500 mx-auto" />
          <div className="text-right">
            <p className="text-sm text-gray-500">الجلسات القادمة</p>
            <p className="text-xl font-bold">{stats.upcoming}</p>
          </div>
        </Card>

        <Card className="p-4 grid grid-cols-2 items-center shadow-md">
          <Calendar className="h-12 w-12 text-purple-500 mx-auto" />
          <div className="text-right">
            <p className="text-sm text-gray-500">الجلسات المتبقية</p>
            <p className="text-xl font-bold">{stats.remaining}</p>
          </div>
        </Card>
      </div>

      {/* الفلاتر */}
      <div className="flex justify-center gap-4">
        <div className="flex items-center border rounded-lg px-3 py-2 w-64">
          <Search className="h-4 w-4 text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="بحث باسم المدرس أو المادة"
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="flex items-center border rounded-lg px-3 py-2 w-48">
          <Filter className="h-4 w-4 text-gray-500 ml-2" />
          <select className="w-full text-sm outline-none bg-transparent">
            <option>الكل</option>
            <option>رياضيات</option>
            <option>لغة إنجليزية</option>
            <option>فيزياء</option>
            <option>كيمياء</option>
          </select>
        </div>
      </div>

      {/* التبويبات */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="flex justify-center gap-6 bg-gray-100 rounded-xl p-2 w-fit mx-auto">
          <TabsTrigger value="upcoming">القادمة</TabsTrigger>
          <TabsTrigger value="completed">المكتملة</TabsTrigger>
          <TabsTrigger value="cancelled">الملغاة</TabsTrigger>
        </TabsList>

        {/* القادمة */}
        <TabsContent value="upcoming" className="mt-6">
          {upcomingLessons.length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <p className="mt-2 text-gray-500">لا توجد جلسات قادمة</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingLessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="p-4 grid grid-cols-2 items-center shadow-md"
                >
                  {/* العمود الأول: الأزرار والحالة */}
                  <div className="flex flex-col items-start gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        lesson.status === "مؤكد"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {lesson.status}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-24">
                      دخول
                    </Button>
                    <Button variant="outline" className="w-24">
                      إلغاء
                    </Button>
                  </div>

                  {/* العمود الثاني: البيانات */}
                  <div className="text-right space-y-1">
                    <h3 className="font-bold text-sm flex items-center gap-1 justify-end">
                      {lesson.teacher}
                      <User className="h-4 w-4 text-gray-600" />
                    </h3>
                    <p className="text-xs text-gray-600">{lesson.subject}</p>
                    <p className="text-xs flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3 text-red-500" />
                      {lesson.displayDate}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 justify-end">
                      ⏰ {lesson.time}{" "}
                      <span className="text-gray-500">
                        ({calculateDuration(lesson.time)})
                      </span>
                    </p>
                    <Countdown iso={lesson.date} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* المكتملة */}
        <TabsContent value="completed" className="mt-6">
          {completedLessons.length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <p className="mt-2 text-gray-500">لا توجد جلسات مكتملة</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedLessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="p-4 grid grid-cols-2 items-center shadow-md"
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      مكتملة
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <h3 className="font-bold text-sm flex items-center gap-1 justify-end">
                      {lesson.teacher}
                      <User className="h-4 w-4 text-gray-600" />
                    </h3>
                    <p className="text-xs text-gray-600">{lesson.subject}</p>
                    <p className="text-xs flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3 text-red-500" />
                      {lesson.displayDate}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 justify-end">
                      ⏰ {lesson.time}{" "}
                      <span className="text-gray-500">
                        ({calculateDuration(lesson.time)})
                      </span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* الملغاة */}
        <TabsContent value="cancelled" className="mt-6">
          {cancelledLessons.length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <p className="mt-2 text-gray-500">لا توجد جلسات ملغاة</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cancelledLessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="p-4 grid grid-cols-2 items-center shadow-md"
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
                      ملغاة
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <h3 className="font-bold text-sm flex items-center gap-1 justify-end">
                      {lesson.teacher}
                      <User className="h-4 w-4 text-gray-600" />
                    </h3>
                    <p className="text-xs text-gray-600">{lesson.subject}</p>
                    <p className="text-xs flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3 text-red-500" />
                      {lesson.displayDate}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1 justify-end">
                      ⏰ {lesson.time}{" "}
                      <span className="text-gray-500">
                        ({calculateDuration(lesson.time)})
                      </span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
