"use client"
import { useState } from "react"

export default function MyLessons() {
  // بيانات تجريبية (دروس قادمة + سابقة)
  const upcomingLessons = [
    {
      id: 1,
      teacher: " محمد أحمد",
      subject: "رياضيات - ثانوي",
      status: "مؤكد",
      date: "الأحد، 8 أكتوبر 2023",
      time: "6:00 مساءً - 7:00 مساءً (60 دقيقة)",
    },
    {
      id: 2,
      teacher: "سارة خالد",
      subject: "لغة إنجليزية - متوسط",
      status: "معلق",
      date: "الثلاثاء، 10 أكتوبر 2023",
      time: "5:00 مساءً - 6:00 مساءً (60 دقيقة)",
    },
  ]

  const pastLessons = [
    {
      id: 3,
      teacher: "أحمد يوسف",
      subject: "فيزياء - ثانوي",
      status: "منتهية",
      date: "الخميس، 1 أكتوبر 2023",
      time: "4:00 مساءً - 5:00 مساءً (60 دقيقة)",
    },
    {
      id: 4,
      teacher: "ليلى محمد",
      subject: "عربي - ثانوي",
      status: "منتهية",
      date: "الاثنين، 25 سبتمبر 2023",
      time: "7:00 مساءً - 8:00 مساءً (60 دقيقة)",
    },
  ]

  // الحالة (قائمة العرض: قادمة أو سابقة)
  const [showUpcoming, setShowUpcoming] = useState(true)

  // الدروس المعروضة حسب الزر
  const lessonsToShow = showUpcoming ? upcomingLessons : pastLessons

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">دروسي</h1>

      {/* أزرار التنقل */}
      <div className="flex mb-6">
        <button
          onClick={() => setShowUpcoming(true)}
          className={`px-4 py-2 rounded-r-lg transition-colors ${
            showUpcoming
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          القادمة
        </button>
        <button
          onClick={() => setShowUpcoming(false)}
          className={`px-4 py-2 rounded-l-lg transition-colors ${
            !showUpcoming
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          السابقة
        </button>
      </div>

      {/* قائمة الدروس */}
      {lessonsToShow.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed mr-3 flex items-center justify-center">
                <span className="text-gray-500">👤</span>
              </div>
              <div>
                <h3 className="font-bold">{lesson.teacher}</h3>
                <p className="text-gray-600 text-sm">{lesson.subject}</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {lesson.status}
            </span>
          </div>

          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center text-gray-600 mb-2">
                <span className="mr-2">📅</span>
                <span>{lesson.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">🕐</span>
                <span>{lesson.time}</span>
              </div>
            </div>

            {/* الأزرار تختلف حسب إذا كانت قادمة أو سابقة */}
            {showUpcoming ? (
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  إلغاء الحجز
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  دخول الحصة
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg" disabled>
                  انتهت
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* الباقة */}
      {showUpcoming && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="font-bold text-lg mb-4">باقة الحصص المتبقية</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 text-2xl">🎫</span>
              </div>
              <div>
                <h3 className="font-bold">الباقة الأساسية (8 حصص)</h3>
                <p className="text-gray-600">تنتهي في 15 نوفمبر 2023</p>
              </div>
            </div>

            <div className="bg-blue-50 px-4 py-2 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-gray-600 text-sm">حصص متبقية</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
