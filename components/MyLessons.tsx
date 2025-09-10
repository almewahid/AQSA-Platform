"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  BookOpen,
  XCircle,
  User,
  GraduationCap,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      {/* الهيدر */}
      <div className="flex items-center justify-center gap-2 text-blue-700">
        <BookOpen className="h-7 w-7" />
        <h1 className="text-3xl font-bold">دروسي</h1>
      </div>
      <p className="text-center text-gray-500 text-lg">
        تتبع جلساتك وإدارة رحلتك التعليمية
      </p>

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center justify-between shadow-md">
          <BookOpen className="h-10 w-10 text-blue-500" />
          <div className="text-right">
            <p className="text-base text-gray-500">إجمالي الجلسات</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between shadow-md">
          <CheckCircle className="h-10 w-10 text-green-500" />
          <div className="text-right">
            <p className="text-base text-gray-500">الجلسات المكتملة</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between shadow-md">
          <Calendar className="h-10 w-10 text-orange-500" />
          <div className="text-right">
            <p className="text-base text-gray-500">الجلسات القادمة</p>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between shadow-md">
          <GraduationCap className="h-10 w-10 text-purple-500" />
          <div className="text-right">
            <p className="text-base text-gray-500">الجلسات المتبقية</p>
            <p className="text-2xl font-bold">{stats.remaining}</p>
          </div>
        </Card>
      </div>

      {/* التبويبات */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="flex justify-center gap-6 bg-gray-100 rounded-xl p-2 w-fit mx-auto">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> القادمة
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> المكتملة
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2">
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
              <Card
                key={lesson.id}
                className="p-4 flex justify-between items-center shadow-md"
              >
                {/* بيانات الدرس */}
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
                {/* الأزرار والحالة */}
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
                className="p-4 flex justify-between items-center shadow-md"
              >
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
                className="p-4 flex justify-between items-center shadow-md"
              >
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
