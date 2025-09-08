"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SessionDetailProps {
  sessionId?: number
  onBack?: () => void
}

// بيانات تجريبية للجلسة
const sessionData = {
  id: 1,
  name: "الرياضيات المتقدمة - الجبر الخطي",
  teacher: {
    name: "أ. فاطمة سالم",
    avatar: "ف س",
  },
  date: "2024-02-15",
  time: "10:00 ص - 11:30 ص",
  duration: "90 دقيقة",
  price: 150,
  status: "قادم",
  sessionLink: "https://zoom.us/j/123456789",
  totalStudents: 15,
  attendedStudents: 12,
  participants: [
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", status: "حاضر", avatar: "أ م" },
    { id: 2, name: "فاطمة علي", email: "fatima@example.com", status: "حاضر", avatar: "ف ع" },
    { id: 3, name: "محمد سالم", email: "mohammed@example.com", status: "غائب", avatar: "م س" },
    { id: 4, name: "نورا أحمد", email: "nora@example.com", status: "حاضر", avatar: "ن أ" },
    { id: 5, name: "خالد يوسف", email: "khalid@example.com", status: "حاضر", avatar: "خ ي" },
  ],
}

export default function SessionDetail({ sessionId, onBack }: SessionDetailProps) {
  const [notes, setNotes] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "قادم":
        return "bg-blue-100 text-blue-800"
      case "مكتمل":
        return "bg-green-100 text-green-800"
      case "ملغى":
        return "bg-red-100 text-red-800"
      case "جاري":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAttendanceColor = (status: string) => {
    return status === "حاضر" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(sessionData.sessionLink)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const saveNotes = () => {
    // هنا يمكن إضافة منطق حفظ الملاحظات
    console.log("Saving notes:", notes)
  }

  const attendanceRate = Math.round((sessionData.attendedStudents / sessionData.totalStudents) * 100)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
              ← رجوع
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">تفاصيل الجلسة</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الجلسة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{sessionData.name}</h3>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-500 text-white font-semibold">
                    {sessionData.teacher.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{sessionData.teacher.name}</p>
                  <p className="text-sm text-gray-600">المدرس</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">التاريخ والوقت</label>
                  <p className="font-medium">
                    {sessionData.date} - {sessionData.time}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">المدة</label>
                  <p className="font-medium">{sessionData.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">السعر</label>
                  <p className="font-medium text-green-600">{sessionData.price} ر.س</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">الحالة</label>
                  <Badge className={getStatusColor(sessionData.status)}>{sessionData.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>رابط الجلسة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">رابط الانضمام:</p>
                <p className="font-mono text-sm break-all">{sessionData.sessionLink}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyLink} variant="outline" className="flex-1 bg-transparent">
                  {linkCopied ? "تم النسخ ✓" : "نسخ الرابط"}
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">الانضمام الآن</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>قائمة الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الطالب</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>حالة الحضور</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionData.participants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-500 text-white text-xs">
                              {participant.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{participant.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{participant.email}</TableCell>
                      <TableCell>
                        <Badge className={getAttendanceColor(participant.status)}>{participant.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الملاحظات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="اكتب ملاحظاتك حول الجلسة هنا..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button onClick={saveNotes} className="w-full md:w-auto">
                حفظ الملاحظات
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ملخص سريع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">عدد الطلاب المسجلين</span>
                <span className="font-bold text-blue-600">{sessionData.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">عدد الطلاب الحاضرين</span>
                <span className="font-bold text-green-600">{sessionData.attendedStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">نسبة الحضور</span>
                <span className="font-bold text-purple-600">{attendanceRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${attendanceRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
