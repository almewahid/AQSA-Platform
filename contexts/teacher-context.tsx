"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Teacher, TeacherContextType } from "@/types/teacher"

const TeacherContext = createContext<TeacherContextType | undefined>(undefined)

const sampleTeachers: Teacher[] = [
  {
    id: "1",
    name: "أ. محمد أحمد",
    subject: "مدرس رياضيات",
    bio: "خبرة 10 سنوات في تدريس الثانوية العامة، متخصص في التفاضل والتكامل.",
    rating: 4.8,
    reviewCount: 45,
    courses: ["الرياضيات - ثانوي", "الإحصاء", "الجبر والهندسة"],
    reviews: [
      {
        id: "1",
        studentName: "طالب",
        rating: 5,
        comment: "شرح ممتاز وصبر كبير",
        date: "2024-01-15",
      },
    ],
    isActive: true,
  },
  {
    id: "2",
    name: "أ. فاطمة علي",
    subject: "مدرسة فيزياء",
    bio: "متخصصة في الفيزياء النووية والكهرباء، خبرة 8 سنوات.",
    rating: 4.6,
    reviewCount: 32,
    courses: ["الفيزياء - ثانوي", "الكهرباء والمغناطيسية"],
    reviews: [
      {
        id: "2",
        studentName: "طالبة",
        rating: 5,
        comment: "تشرح بطريقة مبسطة ومفهومة",
        date: "2024-01-10",
      },
    ],
    isActive: true,
  },
  {
    id: "3",
    name: "أ. أحمد حسن",
    subject: "مدرس كيمياء",
    bio: "دكتوراه في الكيمياء العضوية، خبرة 12 سنة في التدريس.",
    rating: 4.9,
    reviewCount: 67,
    courses: ["الكيمياء - ثانوي", "الكيمياء العضوية", "الكيمياء التحليلية"],
    reviews: [
      {
        id: "3",
        studentName: "طالب",
        rating: 5,
        comment: "أفضل مدرس كيمياء على الإطلاق",
        date: "2024-01-20",
      },
    ],
    isActive: true,
  },
]

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teachers] = useState<Teacher[]>(sampleTeachers)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [currentView, setCurrentView] = useState<"list" | "profile">("list")

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        selectedTeacher,
        setSelectedTeacher,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </TeacherContext.Provider>
  )
}

export function useTeacher() {
  const context = useContext(TeacherContext)
  if (context === undefined) {
    throw new Error("useTeacher must be used within a TeacherProvider")
  }
  return context
}
