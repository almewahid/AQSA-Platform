"use client";

import { useState } from "react";
import { Calendar, CheckCircle, BookOpen, XCircle, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function MyLessons() {
  const [stats] = useState({
    total: 8,
    completed: 3,
    upcoming: 3,
    remaining: 2,
  });

  const [filter, setFilter] = useState("");

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

  const filterLessons = (lessons: any[]) =>
    lessons.filter(
      (l) =>
        l.subject.toLowerCase().includes(filter.toLowerCase()) ||
        l.teacher.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div className="p-6 space-y-6">
      {/* العنوان */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">جلساتي التعليمية</h1>
        <p className="text-gray-500 text-lg">
          تتبع جلساتك وإدارة رحلتك التعليمية
        </p>
      </div>

      {/* شريط البحث */}
      <div className="flex justify-center mb-4">
        <Input
          placeholder="🔍 ابحث حسب المادة أو اسم المدرس"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md rounded-xl"
        />
      </div>

      {/* الكروت الإحصائية */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-md flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">إجمالي الجلسات</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <BookOpen className="h-10 w-10 text-blue-500" />
        </Card>

        <Card className="p-4 shadow-md flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">المكتملة</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
          <CheckCircle className="h-10 w-10 text-green-500" />
        </Card>

        <Card className="p-4 shadow-md flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">القادمة</p>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>
          <Calendar className="h-10 w-10 text-orange-500" />
        </Card>

        <Card className="p-4 shadow-md flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">المتبقية</p>
            <p className="text-2xl font-bold">{stats.remaining}</p>
          </div>
          <XCircle className="h-10 w-10 text-purple-500" />
        </Card>
      </div>

      {/* التبويبات */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="flex justify-center gap-6 bg-gray-100 rounded-xl p-2 w-fit mx-auto">
          <TabsTrigger
            value="upcoming"
            className="flex items-center gap-2 border-2 border-orange-500 rounded-lg px-3"
          >
            <Calendar className="h-4 w-4 text-orange-500" /> القادمة
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex items-center gap-2 border-2 border-green-500 rounded-lg px-3"
          >
            <CheckCircle className="h-4 w-4 text-green-500" /> المكتملة
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="flex items-center gap-2 border-2 border-red-500 rounded-lg px-3"
          >
            <XCircle className="h-4 w-4 text-red-500" /> الملغاة
          </TabsTrigger>
        </TabsList>

        {/* القادمة */}
        <TabsContent value="upcoming" className="mt-6 space-y-4">
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
            filterLessons(upcomingLessons).map((lesson) => (
              <Card
                key={lesson.id}
                className="p-4 flex justify-between items-center shadow-md border border-orange-400"
              >
                {/* البيانات على اليمين */}
                <div className="text-right">
                  <h3 className="font-bold text-lg">{lesson.teacher}</h3>
                  <p className="text-sm text-gray-500">{lesson.subject}</p>
                  <p className="text-sm mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-4 w-4 text-red-500" /> {lesson.date}
                  </p>
                  <p className="text-sm text-gray-500">⏰ {lesson.time}</p>
                </div>
                {/* الحالة + الأزرار على اليسار */}
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
                    دخول
                  </Button>
                  <Button variant="outline" className="w-28">
                    إلغاء
                  </Button>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        {/* المكتملة */}
        <TabsContent value="completed" className="mt-6 space-y-4">
          {filterLessons(completedLessons).length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات مكتملة</p>
            </Card>
          ) : (
            filterLessons(completedLessons).map((lesson) => (
              <Card
                key={lesson.id}
                className="p-4 flex justify-between items-center shadow-md border border-green-400"
              >
                <div className="text-right">
                  <h3 className="font-bold text-lg">{lesson.teacher}</h3>
                  <p className="text-sm text-gray-500">{lesson.subject}</p>
                  <p className="text-sm mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-4 w-4 text-red-500" /> {lesson.date}
                  </p>
                  <p className="text-sm text-gray-500">⏰ {lesson.time}</p>
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
          {filterLessons(cancelledLessons).length === 0 ? (
            <Card className="p-8 text-center shadow-md">
              <XCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">لا توجد جلسات ملغاة</p>
            </Card>
          ) : (
            filterLessons(cancelledLessons).map((lesson) => (
              <Card
                key={lesson.id}
                className="p-4 flex justify-between items-center shadow-md border border-red-400"
              >
                <div className="text-right">
                  <h3 className="font-bold text-lg">{lesson.teacher}</h3>
                  <p className="text-sm text-gray-500">{lesson.subject}</p>
                  <p className="text-sm mt-1 flex items-center gap-1 justify-end">
                    <Calendar className="h-4 w-4 text-red-500" /> {lesson.date}
                  </p>
                  <p className="text-sm text-gray-500">⏰ {lesson.time}</p>
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
