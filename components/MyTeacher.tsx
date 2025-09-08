"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Amiri } from "next/font/google"

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] })

// بيانات المدرسين مع خصم
const teachers = [
  {
    id: 1,
    name: "أ. محمد أحمد",
    subject: "الرياضيات",
    curriculum: "المنهج السعودي",
    stage: "المرحلة الثانوية",
    rating: "4.9",
    price: "120",
    students: 120,
    lessons: 45,
    discount: "20 ر.س",
    bio: "مدرس رياضيات بخبرة تزيد عن 10 سنوات...",
    gradient: "from-blue-300 via-purple-300 to-pink-300",
    avatarColor: "bg-blue-400",
  },
  {
    id: 2,
    name: "أ. فاطمة علي",
    subject: "اللغة العربية",
    curriculum: "المنهج السعودي",
    stage: "المرحلة المتوسطة",
    rating: "4.8",
    price: "100",
    students: 95,
    lessons: 38,
    discount: null,
    bio: "معلمة لغة عربية متميزة...",
    gradient: "from-green-300 via-teal-300 to-lime-300",
    avatarColor: "bg-green-400",
  },
  {
    id: 3,
    name: "أ. أحمد سالم",
    subject: "الفيزياء",
    curriculum: "المنهج المصري",
    stage: "المرحلة الابتدائية",
    rating: "4.7",
    price: "110",
    students: 80,
    lessons: 30,
    discount: "15 ر.س",
    bio: "مدرس فيزياء شغوف...",
    gradient: "from-orange-300 via-red-300 to-yellow-300",
    avatarColor: "bg-orange-400",
  },
]

function TeacherCard({ teacher }: { teacher: (typeof teachers)[0] }) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleBookNow = () => router.push("/booking")
  const handleMessage = () => router.push("/messages")
  const handleShare = () => alert(`تم نسخ رابط ملف المدرس ${teacher.name} ✅`)
  const handleFavorite = () => setIsFavorite(!isFavorite)

  // استخراج أول حرفين بدون "أ." أو "أستاذ"
  const filteredName = teacher.name.replace(/^أ\.?\s*/, "").replace(/^أستاذ\s*/, "")
  const initials = filteredName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join(" ")

  // أيقونات المواد
  const subjectIcons: Record<string, string> = {
    الرياضيات: "📐",
    "اللغة العربية": "📖",
    الفيزياء: "⚛️",
  }
  const subjectIcon = subjectIcons[teacher.subject] || "📘"

  // أيقونات المناهج
  const curriculumIcons: Record<string, string> = {
    "المنهج السعودي": "📗",
    "المنهج المصري": "📕",
  }
  const curriculumIcon = curriculumIcons[teacher.curriculum] || "📘"

  // أيقونات المراحل
  const stageIcons: Record<string, string> = {
    "المرحلة الابتدائية": "🌱",
    "المرحلة المتوسطة": "🏫",
    "المرحلة الثانوية": "🎓",
  }
  const stageIcon = stageIcons[teacher.stage] || "🎓"

  return (
    <div className="w-full h-[420px]">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">
        {/* زر القلب أعلى يمين البطاقة */}
        <button
          className="absolute top-2 right-2 text-2xl z-10"
          onClick={handleFavorite}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* الغلاف العلوي */}
        <div
          className={`h-40 relative flex flex-col justify-start items-center p-4 bg-gradient-to-r ${teacher.gradient} animate-gradient`}
        >
          {/* التقييم أعلى يسار */}
          <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md text-xs font-bold shadow">
            ⭐ {teacher.rating}
          </div>

          {/* الاسم */}
          <h2
            className={`${amiri.className} text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] flex items-center gap-2`}
          >
            ✦ {filteredName} ✦
          </h2>

          {/* موجة زخرفية */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10" className="w-32 h-4 my-1 animate-wave" fill="none">
            <path d="M0 5 Q 25 0, 50 5 T 100 5 T 150 5 T 200 5" stroke="white" strokeWidth="2" fill="transparent" />
          </svg>

          {/* المادة */}
          <p className="text-black text-lg font-semibold tracking-wide flex items-center gap-1">
            {subjectIcon} {teacher.subject}
          </p>

          {/* الدائرة أسفل يسار (تتقلب عند hover) */}
          <div className="absolute bottom-2 left-2 group perspective-sm">
            <div className="relative w-16 h-16 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* الأمامي */}
              <div
                className={`absolute inset-0 rounded-full ${teacher.avatarColor} border-2 border-white flex items-center justify-center text-white font-bold text-xl backface-hidden`}
              >
                {initials}
              </div>
              {/* الخلفي */}
              <div
                className={`absolute inset-0 rounded-full ${teacher.avatarColor} border-2 border-white flex flex-col items-center justify-center text-white font-bold text-xs rotate-y-180 backface-hidden`}
              >
                {teacher.discount ? (
                  <>
                    <span>خصم</span>
                    <span className="text-sm">{teacher.discount}</span>
                  </>
                ) : (
                  <span className="text-lg">😊</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* باقي البطاقة */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mt-3 mb-4 text-center text-sm space-y-2">
            <div className="bg-gray-100 rounded-lg p-2">
              <p className="font-medium text-gray-700">
                {curriculumIcon} {teacher.curriculum}
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <p className="text-gray-600">
                {stageIcon} {teacher.stage}
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-gray-700">
              <span>😍 {teacher.students} طالب</span>
              <span>📅 {teacher.lessons} حصة</span>
            </div>
            <div className="mt-1">
              <span className="text-lg font-bold text-blue-600">{teacher.price} ر.س</span>
              <span className="text-gray-500 text-sm mr-1">/ الحصة</span>
            </div>
          </div>

          {/* الأزرار */}
          <div className="mt-auto flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                onClick={() => router.push(`/teacher-profile/view`)}
              >
                📑 عرض الملف
              </button>

              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                onClick={handleBookNow}
              >
                🗓️ احجز الآن
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm transition-colors border"
                onClick={handleShare}
              >
                🔗 شارك الملف
              </button>
              <button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm transition-colors border flex items-center justify-center gap-1"
                onClick={handleMessage}
              >
                💬 راسلني
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// الشاشة الرئيسية
export default function TeacherDetailScreen() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 6s linear infinite; }
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-20px); }
        }
        .animate-wave { animation: waveMove 2s linear infinite alternate; }
        .perspective-sm { perspective: 500px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <h1 className={`${amiri.className} text-3xl font-bold text-center mb-8 text-gray-800`}>
          المدرسون المتاحون
        </h1>

        {/* grid مع مسافة إضافية بين الصفوف */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-15">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </div>
  )
}
