"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export interface Teacher {
  id: number
  name: string
  subject: string
  curriculum: string
  stage: string
  rating: number
  reviews: number
  price: number
  students: number
  lessons: number
  bio: string
  gradient: string
  avatarColor: string
  lessonType: "online" | "home"
  discount?: string | null
  featured?: boolean
}

interface TeacherCardShortProps {
  teacher: Teacher
}

export default function TeacherCardShort({ teacher }: TeacherCardShortProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = () => setIsFavorite(!isFavorite)
  const handleViewProfile = () => router.push(`/teacher-profile/view`)

  // أيقونات المواد
  const subjectIcons: Record<string, string> = {
    الرياضيات: "➗",
    الفيزياء: "⚛️",
    الكيمياء: "🧪",
    "اللغة العربية": "📖",
    "القرآن الكريم": "📖",
    SCIENCE: "🔬",
    MATH: "📐",
  }
  const subjectIcon = subjectIcons[teacher.subject] || "📘"

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col transition hover:shadow-2xl">
      <div className="grid grid-cols-3 gap-4 items-start">
        {/* العمود ١: المستطيل الملون + المادة + الأيقونة + الشارات */}
        <div
          className={`relative flex flex-col items-center justify-center rounded-xl p-4 h-full bg-gradient-to-r ${teacher.gradient}`}
        >
          {/* شارات أونلاين/منازل + مميز */}
          <div className="absolute top-2 right-2 flex gap-2">
            {teacher.lessonType === "online" && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">أونلاين</span>
            )}
            {teacher.lessonType === "home" && (
              <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded">منازل</span>
            )}
            {teacher.featured && (
              <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">مميز</span>
            )}
          </div>

          {/* اسم المعلم */}
          <h2 className="text-lg font-bold text-white">{teacher.name}</h2>

          {/* المادة + الأيقونة */}
          <div className="mt-3 flex items-center gap-2 bg-white/30 px-3 py-1 rounded-full shadow">
            <span className="text-xl">{subjectIcon}</span>
            <p className="text-black text-sm font-semibold">{teacher.subject}</p>
          </div>
        </div>

        {/* العمود ٢: النبذة + التعليقات */}
        <div className="flex flex-col justify-start">
          {/* النبذة */}
          <p className="text-gray-700 text-sm mb-2 line-clamp-2">{teacher.bio}</p>

          {/* تعليق الطلاب */}
          <div className="bg-gray-50 p-2 rounded-lg text-xs mb-3">
            <p className="text-yellow-500">⭐⭐⭐⭐☆</p>
            <p className="text-gray-600">"شرح ممتاز وسلس"</p>
          </div>
        </div>

        {/* العمود ٣: التقييم + الأسعار + عدد الطلاب */}
        <div className="flex flex-col items-end gap-2 text-sm">
          {/* المفضلة */}
          <button onClick={handleFavorite} className="text-xl mb-2">
            {isFavorite ? "❤️" : "🤍"}
          </button>

          {/* تقييم تفصيلي */}
          <div className="text-yellow-500 text-sm">
            ⭐ {teacher.rating}{" "}
            <span className="text-gray-500">({teacher.reviews} مراجعة)</span>
          </div>

          {/* الأسعار */}
          <p className="text-blue-700 font-bold">{teacher.price} ر.س / الحصة</p>
          <p className="text-gray-600">{teacher.price * 4} ر.س / ٤ حصص</p>

          {/* الطلاب والحصص */}
          <p className="text-gray-700 text-sm">😍 {teacher.students} طالب</p>
          <p className="text-gray-700 text-sm">📅 {teacher.lessons} حصة</p>
        </div>
      </div>

      {/* الأزرار الثلاثة أسفل الأعمدة الثلاثة */}
      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={handleViewProfile}
          className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm transition"
        >
          راسلني
        </button>
        <button
          onClick={() => alert("تم الحجز")}
          className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm transition"
        >
          احجز الآن
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg text-sm"
        >
          🔗 مشاركة
        </button>
      </div>
    </div>
  )
}
