"use client"

import { useState } from "react"
import TeacherCardShort, { Teacher } from "./TeacherCardShort"

export default function TeacherList({ teachers }: { teachers: Teacher[] }) {
  const [filterSubject, setFilterSubject] = useState<string>("")
  const [showAllSubjects, setShowAllSubjects] = useState(false)

  // المواد الدراسية (للفلترة)
  const subjects = [
    { name: "الرياضيات", icon: "➗", color: "blue" },
    { name: "الفيزياء", icon: "⚛️", color: "green" },
    { name: "الكيمياء", icon: "🧪", color: "purple" },
    { name: "اللغة الإنجليزية", icon: "🌐", color: "yellow" },
    { name: "اللغة العربية", icon: "📖", color: "red" },
    { name: "القرآن الكريم", icon: "📖", color: "teal" },
    { name: "SCIENCE", icon: "🔬", color: "cyan" },
    { name: "MATH", icon: "📐", color: "indigo" },
  ]

  // تصفية المدرسين
  const filteredTeachers = filterSubject
    ? teachers.filter((t) => t.subject === filterSubject)
    : teachers

  return (
    <div className="space-y-6">
      {/* المواد الدراسية كفلتر */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4">المواد الدراسية</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {(showAllSubjects ? subjects : subjects.slice(0, 7)).map((subject, idx) => (
            <button
              key={idx}
              onClick={() =>
                setFilterSubject(filterSubject === subject.name ? "" : subject.name)
              }
              className={`flex flex-col items-center justify-center rounded-lg p-3 border transition ${
                filterSubject === subject.name
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-${subject.color}-100`}
              >
                <span className={`text-${subject.color}-600 text-xl`}>
                  {subject.icon}
                </span>
              </div>
              <p className="text-sm font-medium">{subject.name}</p>
            </button>
          ))}
        </div>

        {subjects.length > 7 && (
          <div className="text-center mt-3">
            <button
              onClick={() => setShowAllSubjects(!showAllSubjects)}
              className="text-blue-600 text-sm"
            >
              {showAllSubjects ? "عرض أقل ⬆️" : "عرض المزيد ⬇️"}
            </button>
          </div>
        )}
      </div>

      {/* عداد النتائج */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          عرض {filteredTeachers.length} مدرس{filteredTeachers.length > 1 ? "ين" : ""}
        </h2>
      </div>

      {/* بطاقات المعلمين */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeachers.map((teacher) => (
          <TeacherCardShort key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  )
}
