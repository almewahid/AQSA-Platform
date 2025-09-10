"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  BookOpen,
  XCircle,
  User,
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
            icon: <BookOpen className="h-12 w-12 text-blue-500" />,
          },
          {
            title: "الجلسات المكتملة",
            value: stats.completed,
            icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          },
          {
            title: "الجلسات القادمة",
            value: stats.upcoming,
            icon: <Calendar className="h-12 w-12 text-orange-500" />,
          },
          {
            title: "الجلسات المتبقية",
            value: stats.remaining,
            icon: <Calendar className="h-12 w-12 text-purple-500" />,
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

      {/* التبويبات */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="flex justify-center gap-6 bg-gray-100 rounded-xl p-2 w-fit mx-auto">
          <TabsTrigger
            value="upcoming"
            className="flex items-center gap-2 border-b-2 border-orange-400"
          >
            <Calendar className="h-4 w-4" /> القادمة
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex items-center gap-2 border-b-2 border-green-400"
          >
            <CheckCircle className="h-4 w-4" /> المكتملة
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="flex items-center gap-2 border-b-2 border-red-400"
          >
            <XCircle className="h-4 w-4" /> الملغاة
          </TabsTrigger>
        </TabsList>

        {/* القادمة */}
        <TabsContent value="upcoming" className="mt-6 space-y-4">
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
                <Card className="p-4 grid grid-cols-1 md:grid-cols-2 items-center shadow-md gap-4">
                  {/* العمود الأول: البيانات */}
                  <div className="text-right space-y-1">
                    <h3 className="font-bold text-lg flex items-center gap-2 justify-end">
                      {lesson.teacher}{" "}
                      <User className="h-5 w-5 text-gray-600" />
                    </h3>
                    <p className="text-sm text-gray-500">
                      {lesson.subject}
                    </p>
                    <p className="text-sm mt-1 flex items-center gap-1 justify-end">
                      <Calendar className="h-4 w-4 text-red-500" />{" "}
                      {lesson.date}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                      ⏰ {lesson.time}
                    </p>
                  </div>

                  {/* العمود الثاني: الحالة والأزرار */}
                  <div className="flex flex-col items-start gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        lesson.status === "مؤكد"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {lesson.status}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-28">
                      دخول الجلسة
                    </Button>
                    <Button variant="outline" className="w-28">
                      إلغاء الحجز
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* المكتملة */}
        <TabsContent value="completed" className="mt-6 space-y-4">
          {completedLessons.length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات مكتملة</p>
            </Card>
          ) : (
            completedLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="p-4 grid grid-cols-1 md:grid-cols-2 items-center shadow-md gap-4"
              >
                <div className="text-right space-y-1">
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
                <div className="flex flex-col items-start gap-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                    مكتملة
                  </span>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        {/* الملغاة */}
        <TabsContent value="cancelled" className="mt-6 space-y-4">
          {cancelledLessons.length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <XCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات ملغاة</p>
            </Card>
          ) : (
            cancelledLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="p-4 grid grid-cols-1 md:grid-cols-2 items-center shadow-md gap-4"
              >
                <div className="text-right space-y-1">
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
                <div className="flex flex-col items-start gap-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">
                    ملغاة
                  </span>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
