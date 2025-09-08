"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

// نموذج البيانات
interface StudentData {
  fullName: string
  email: string
  phone: string
  educationStage: string
  grade: string
  curriculum: string
  country: string
  region: string
  mapLocation: string
}

const educationStages = [
  { value: "primary", label: "ابتدائي" },
  { value: "middle", label: "إعدادي / متوسط" },
  { value: "secondary", label: "ثانوي" },
  { value: "university", label: "جامعة" },
]

const gradesByStage = {
  primary: [
    { value: "1", label: "الصف الأول" },
    { value: "2", label: "الصف الثاني" },
    { value: "3", label: "الصف الثالث" },
    { value: "4", label: "الصف الرابع" },
    { value: "5", label: "الصف الخامس" },
    { value: "6", label: "الصف السادس" },
  ],
  middle: [
    { value: "1", label: "الصف الأول" },
    { value: "2", label: "الصف الثاني" },
    { value: "3", label: "الصف الثالث" },
  ],
  secondary: [
    { value: "1", label: "الصف الأول" },
    { value: "2", label: "الصف الثاني" },
    { value: "3", label: "الصف الثالث" },
  ],
  university: [
    { value: "1", label: "المستوى الأول" },
    { value: "2", label: "المستوى الثاني" },
    { value: "3", label: "المستوى الثالث" },
    { value: "4", label: "المستوى الرابع" },
  ],
}

const curriculums = [
  { value: "egyptian", label: "المنهج المصري" },
  { value: "saudi", label: "المنهج السعودي" },
  { value: "uae", label: "المنهج الإماراتي" },
  { value: "british", label: "المنهج البريطاني" },
  { value: "american", label: "المنهج الأمريكي" },
]

const countries = [
  { value: "egypt", label: "مصر" },
  { value: "saudi", label: "السعودية" },
  { value: "uae", label: "الإمارات" },
  { value: "kuwait", label: "الكويت" },
  { value: "qatar", label: "قطر" },
  { value: "bahrain", label: "البحرين" },
  { value: "oman", label: "عمان" },
  { value: "jordan", label: "الأردن" },
  { value: "lebanon", label: "لبنان" },
  { value: "syria", label: "سوريا" },
  { value: "iraq", label: "العراق" },
  { value: "morocco", label: "المغرب" },
  { value: "tunisia", label: "تونس" },
  { value: "algeria", label: "الجزائر" },
]

// مكون الخريطة
function GoogleMap({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="mapLocation">الموقع على الخريطة</Label>
      <Input
        id="mapLocation"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="أدخل رابط Google Maps"
      />
      {value && (
        <div className="mt-2 rounded-xl overflow-hidden shadow-md border">
          <iframe
            src={value}
            className="w-full h-64"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default function StudentProfileEdit() {
  const [studentData, setStudentData] = useState<StudentData>({
    fullName: "أحمد محمد علي",
    email: "ahmed.mohamed@example.com",
    phone: "+966501234567",
    educationStage: "secondary",
    grade: "2",
    curriculum: "saudi",
    country: "saudi",
    region: "الرياض",
    mapLocation: "https://maps.google.com/maps?q=24.7136,46.6753&z=12&output=embed",
  })

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setStudentData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEducationStageChange = (value: string) => {
    setStudentData((prev) => ({
      ...prev,
      educationStage: value,
      grade: "",
    }))
  }

  const handleSave = () => {
    console.log("حفظ البيانات:", studentData)
  }

  const handleCancel = () => {
    window.location.href = "/student-profile"
  }

  const getInitials = (name: string) => {
    const words = name.trim().split(" ")
    if (words.length >= 2) {
      return words[0][0] + words[1][0]
    }
    return words[0]?.slice(0, 2) || "طا"
  }

  const availableGrades = gradesByStage[studentData.educationStage as keyof typeof gradesByStage] || []

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mx-auto max-w-3xl">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <Avatar className="h-20 w-20 ring-4 ring-indigo-200">
                  <AvatarFallback className="text-lg font-semibold bg-indigo-500 text-white">
                    {getInitials(studentData.fullName)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-bold text-indigo-700">تعديل الملف الشخصي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* قسم المعلومات الشخصية */}
            <motion.div
              className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-sm"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="font-semibold text-indigo-700 mb-3">المعلومات الشخصية</h2>
              <Separator className="mb-4" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    value={studentData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={studentData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={studentData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </motion.div>

            {/* قسم المعلومات الدراسية */}
            <motion.div
              className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 shadow-sm"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="font-semibold text-green-700 mb-3">المعلومات الدراسية</h2>
              <Separator className="mb-4" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="educationStage">المرحلة الدراسية</Label>
                  <Select value={studentData.educationStage} onValueChange={handleEducationStageChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المرحلة الدراسية" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationStages.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">الصف</Label>
                  <Select
                    value={studentData.grade}
                    onValueChange={(value) => handleInputChange("grade", value)}
                    disabled={!studentData.educationStage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableGrades.map((grade) => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="curriculum">المنهج</Label>
                <Select
                  value={studentData.curriculum}
                  onValueChange={(value) => handleInputChange("curriculum", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنهج" />
                  </SelectTrigger>
                  <SelectContent>
                    {curriculums.map((curriculum) => (
                      <SelectItem key={curriculum.value} value={curriculum.value}>
                        {curriculum.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* قسم الموقع */}
            <motion.div
              className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-pink-100 shadow-sm"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="font-semibold text-pink-700 mb-3">الموقع الجغرافي</h2>
              <Separator className="mb-4" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">البلد</Label>
                  <Select value={studentData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر البلد" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">المحافظة / المنطقة</Label>
                  <Input
                    id="region"
                    value={studentData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <GoogleMap value={studentData.mapLocation} onChange={(val) => handleInputChange("mapLocation", val)} />
              </div>
            </motion.div>

            {/* أزرار الحفظ */}
            <div className="flex gap-4 pt-6">
              <Button onClick={handleSave} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                حفظ التغييرات
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
