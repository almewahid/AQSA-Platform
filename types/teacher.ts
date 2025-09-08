export interface Teacher {
  id: string
  name: string
  subject: string
  bio: string
  avatar?: string
  rating: number
  reviewCount: number
  courses: string[]
  reviews: Review[]
  isActive: boolean
}

export interface Review {
  id: string
  studentName: string
  rating: number
  comment: string
  date: string
}

export interface TeacherContextType {
  teachers: Teacher[]
  selectedTeacher: Teacher | null
  setSelectedTeacher: (teacher: Teacher | null) => void
  currentView: "list" | "profile"
  setCurrentView: (view: "list" | "profile") => void
}
