"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const stageOptions = {
  "ابتدائي": ["الصف الأول", "الصف الثاني", "الصف الثالث", "الصف الرابع", "الصف الخامس", "الصف السادس"],
  "إعدادي / متوسط": ["الصف الأول", "الصف الثاني", "الصف الثالث"],
  "ثانوي": ["الصف الأول", "الصف الثاني", "الصف الثالث"],
  "جامعة": ["المستوى الأول", "المستوى الثاني", "المستوى الثالث", "المستوى الرابع"],
}

const curriculumOptions = [
  "المنهج المصري",
  "المنهج السعودي",
  "المنهج الإماراتي",
  "المنهج الكويتي",
  "المنهج البريطاني",
  "المنهج الأمريكي",
]

const countryOptions = ["مصر", "السعودية", "الإمارات", "الكويت", "قطر", "الأردن"]

export default function StudentProfileEdit() {
  const [formData, setFormData] = useState({
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+201234567890",
    stage: "إعدادي / متوسط",
    grade: "الصف الثاني",
    curriculum: "المنهج المصري",
    country: "مصر",
    region: "القاهرة",
    mapLink: "https://maps.google.com/?q=30.0444,31.2357",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "stage" ? { grade: "" } : {}), // لو المرحلة تغيرت، نفرغ الصف
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saved data:", formData)
    alert("تم حفظ التغييرات بنجاح ✅")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto" dir="rtl">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">
              {formData.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">تعديل الملف الشخصي</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* الاسم */}
            <div>
              <Label>الاسم الكامل</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <Label>البريد الإلكتروني</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* رقم الهاتف */}
            <div>
              <Label>رقم الهاتف</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            {/* المرحلة الدراسية */}
            <div>
              <Label>المرحلة الدراسية</Label>
              <Select value={formData.stage} onValueChange={(value) => handleChange("stage", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المرحلة" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(stageOptions).map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* الصف */}
            <div>
              <Label>الصف</Label>
              <Select value={formData.grade} onValueChange={(value) => handleChange("grade", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  {(stageOptions[formData.stage as keyof typeof stageOptions] || []).map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* المنهج */}
            <div>
              <Label>المنهج</Label>
              <Select value={formData.curriculum} onValueChange={(value) => handleChange("curriculum", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنهج" />
                </SelectTrigger>
                <SelectContent>
                  {curriculumOptions.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* البلد */}
            <div>
              <Label>البلد</Label>
              <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البلد" />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* المحافظة */}
            <div>
              <Label>المحافظة / المنطقة</Label>
              <Input
                value={formData.region}
                onChange={(e) => handleChange("region", e.target.value)}
              />
            </div>

            {/* رابط الخريطة */}
            <div>
              <Label>الموقع على الخريطة (رابط Google Maps)</Label>
              <Input
                type="url"
                value={formData.mapLink}
                onChange={(e) => handleChange("mapLink", e.target.value)}
              />
            </div>

            {/* أزرار */}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" asChild>
                <a href="/student-profile">إلغاء</a>
              </Button>
              <Button type="submit">حفظ التغييرات</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
