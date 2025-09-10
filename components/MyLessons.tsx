"use client";

import { useState } from "react";
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

export default function MyLessons() {
  // بيانات وهمية للتجربة
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
      date: "الأحد 8 أكتوبر 2023",
      time: "6:00 مساء - 7:00 مساء (60 دقيقة)",
      status: "مؤكد",
    },
    {
      id: 2,
      teacher: "سارة خالد",
      subject: "لغة إنجليزية - متوسط",
      date: "الثلاثاء 10 أكتوبر 2023",
      time: "5:00 مساء - 6:00 مساء (60 دقيقة)",
      status: "معلق",
    },
  ];

  const completedLessons = [
    {
      id: 3,
      teacher: "أحمد علي",
      subject: "فيزياء - ثانوي",
      date: "الخميس 1 أكتوبر 2023",
      time: "7:00 مساء - 8:00 مساء (60 دقيقة)",
    },
  ];

  const cancelledLessons = [
    {
      id: 4,
      teacher: "منى حسن",
      subject: "كيمياء - ثانوي",
      date: "السبت 30 سبتمبر 2023",
      time: "4:00 مساء - 5:00 مساء (60 دقيقة)",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* العنوان والوصف */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold">جلساتي التعليمية</h1>
        <p className="text-gray-500 text-lg">
          تتبع جلساتك وإدارة رحلتك التعليمية
        </p>
      </motion.div>

      {/* الكروت الخاصة بالإحصائيات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: "إجمالي الجلسات",
            value: stats.total,
            icon: <BookOpen className="h-14 w-14 text-blue-500" />,
          },
          {
            title: "الجلسات المكتملة",
            value: stats.completed,
            icon: <CheckCircle className="h-14 w-14 text-green-500" />,
          },
          {
            title: "الجلسات القادمة",
            value: stats.upcoming,
            icon: <Calendar className="h-14 w-14 text-orange-500" />,
          },
          {
            title: "الجلسات المتبقية",
            value: stats.remaining,
            icon: <Calendar className="h-14 w-14 text-purple-500" />,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-4 grid grid-cols-2 items-center shadow-md">
              <div className="flex justify-center">{item.icon}</div>
              <div className="text-right">
                <p className="text-base text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* الفلاتر */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {/* مربع البحث */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="ابحث باسم المدرس أو المادة..."
            className="w-full rounded-xl border border-gray-300 p-3 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
        </div>

        {/* قائمة منسدلة */}
        <select className="w-full md:w-1/4 rounded-xl border border-gray-300 p-3 text-right focus:outline-none focus:ring-2 focus:ring-blue-500">
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
          <TabsTrigger
            value="upcoming"
            className="flex items-center gap-2 border-b-2 border-orange-400"
          >
            <Calendar className="h-5 w-5" /> القادمة
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex items-center gap-2 border-b-2 border-green-400"
          >
            <CheckCircle className="h-5 w-5" /> المكتملة
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="flex items-center gap-2 border-b-2 border-red-400"
          >
            <XCircle className="h-5 w-5" /> الملغاة
          </TabsTrigger>
        </TabsList>

        {/* القادمة */}
        <TabsContent value="upcoming" className="mt-6 space-y-6">
          {upcomingLessons.length === 0 ? (
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
            upcomingLessons.map((lesson) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 grid grid-cols-1 md:grid-cols-2 items-center shadow-lg gap-6">
                  {/* العمود الأول: الأزرار والحالة */}
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
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-32 h-10">
                      دخول الجلسة
                    </Button>
                    <Button variant="outline" className="w-32 h-10">
                      إلغاء الحجز
                    </Button>
                  </div>

                  {/* العمود الثاني: البيانات */}
                  <div className="text-right space-y-2">
                    <h3 className="font-bold text-xl flex items-center gap-2 justify-end">
                      {lesson.teacher}
                      <User className="h-6 w-6 text-gray-600" />
                    </h3>
                    <p className="text-md text-gray-500">{lesson.subject}</p>
                    <p className="text-md mt-1 flex items-center gap-1 justify-end">
                      <Calendar className="h-5 w-5 text-red-500" />{" "}
                      {lesson.date}
                    </p>
                    <p className="text-md text-gray-500 flex items-center gap-1 justify-end">
                      ⏰ {lesson.time}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* المكتملة */}
        <TabsContent value="completed" className="mt-6 space-y-6">
          {completedLessons.length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات مكتملة</p>
            </Card>
          ) : (
            completedLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="p-6 grid grid-cols-1 md:grid-cols-2 items-center shadow-lg gap-6"
              >
                {/* يسار: الحالة */}
                <div className="flex flex-col items-start gap-3">
                  <span className="px-4 py-2 rounded-full text-base font-semibold bg-gray-100 text-gray-600">
                    مكتملة
                  </span>
                </div>
                {/* يمين: البيانات */}
                <div className="text-right space-y-2">
                  <h3 className="font-bold text-xl flex items-center gap-2 justify-end">
                    {lesson.teacher}
                    <User className="h-6 w-6 text-gray-600" />
                  </h3>
                  <p className="text-md text-gray-500">{lesson.subject}</p>
                  <p className="text-md mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-5 w-5 text-red-500" /> {lesson.date}
                  </p>
                  <p className="text-md text-gray-500 flex items-center gap-1 justify-end">
                    ⏰ {lesson.time}
                  </p>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        {/* الملغاة */}
        <TabsContent value="cancelled" className="mt-6 space-y-6">
          {cancelledLessons.length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <XCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات ملغاة</p>
            </Card>
          ) : (
            cancelledLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="p-6 grid grid-cols-1 md:grid-cols-2 items-center shadow-lg gap-6"
              >
                {/* يسار: الحالة */}
                <div className="flex flex-col items-start gap-3">
                  <span className="px-4 py-2 rounded-full text-base font-semibold bg-red-100 text-red-600">
                    ملغاة
                  </span>
                </div>
                {/* يمين: البيانات */}
                <div className="text-right space-y-2">
                  <h3 className="font-bold text-xl flex items-center gap-2 justify-end">
                    {lesson.teacher}
                    <User className="h-6 w-6 text-gray-600" />
                  </h3>
                  <p className="text-md text-gray-500">{lesson.subject}</p>
                  <p className="text-md mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-5 w-5 text-red-500" /> {lesson.date}
                  </p>
                  <p className="text-md text-gray-500 flex items-center gap-1 justify-end">
                    ⏰ {lesson.time}
                  </p>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
