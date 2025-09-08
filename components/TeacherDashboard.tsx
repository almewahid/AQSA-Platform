"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// بيانات تجريبية للأرباح الشهرية
const monthlyEarnings = [
  { month: "يناير", earnings: 2400 },
  { month: "فبراير", earnings: 1398 },
  { month: "مارس", earnings: 9800 },
  { month: "أبريل", earnings: 3908 },
  { month: "مايو", earnings: 4800 },
  { month: "يونيو", earnings: 3800 },
]

// بيانات تجريبية للجلسات
const sessions = [
  {
    id: 1,
    name: "الرياضيات - الجبر",
    date: "2024-01-15",
    students: 12,
    price: 150,
    status: "مؤكدة",
  },
  {
    id: 2,
    name: "الفيزياء - الحركة",
    date: "2024-01-16",
    students: 8,
    price: 120,
    status: "معلقة",
  },
  {
    id: 3,
    name: "الكيمياء - التفاعلات",
    date: "2024-01-17",
    students: 15,
    price: 180,
    status: "مؤكدة",
  },
]

// بيانات تجريبية للمدفوعات
const payments = [
  {
    id: 1,
    date: "2024-01-10",
    amount: 450,
    student: "أحمد محمد",
    status: "مدفوع",
  },
  {
    id: 2,
    date: "2024-01-12",
    amount: 300,
    student: "فاطمة علي",
    status: "معلق",
  },
  {
    id: 3,
    date: "2024-01-14",
    amount: 600,
    student: "محمد سالم",
    status: "مدفوع",
  },
]

// بيانات تجريبية للتقييمات
const reviews = [
  {
    id: 1,
    student: "أحمد محمد",
    rating: 5,
    comment: "شرح ممتاز ومفهوم، استفدت كثيراً من الحصص",
    avatar: "bg-blue-500",
  },
  {
    id: 2,
    student: "فاطمة علي",
    rating: 4,
    comment: "مدرس رائع ولكن أتمنى المزيد من الأمثلة العملية",
    avatar: "bg-pink-500",
  },
  {
    id: 3,
    student: "محمد سالم",
    rating: 5,
    comment: "أفضل مدرس رياضيات! أسلوب شرح واضح ومبسط",
    avatar: "bg-green-500",
  },
]

// بيانات تجريبية للتقويم
const calendarDays = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  hasSession: Math.random() > 0.7,
  sessionCount: Math.floor(Math.random() * 3) + 1,
}))

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // تصفية الجلسات حسب البحث
  const filteredSessions = sessions.filter(
    (session) =>
      session.name.includes(searchTerm) || session.date.includes(searchTerm) || session.status.includes(searchTerm),
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مؤكدة":
        return "bg-green-100 text-green-800"
      case "معلقة":
        return "bg-yellow-100 text-yellow-800"
      case "مدفوع":
        return "bg-green-100 text-green-800"
      case "معلق":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحبًا، أستاذ أحمد 👋</h1>
            <p className="text-gray-600">إليك نظرة عامة على أنشطتك التعليمية اليوم</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">➕ إضافة جلسة جديدة</Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {[
            { id: "overview", label: "نظرة عامة" },
            { id: "sessions", label: "الجلسات" },
            { id: "calendar", label: "التقويم" },
            { id: "earnings", label: "الأرباح" },
            { id: "reviews", label: "التقييمات" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">الجلسات القادمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <p className="text-sm text-gray-500 mt-1">هذا الأسبوع</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">عدد الطلاب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">156</div>
                  <p className="text-sm text-gray-500 mt-1">طالب نشط</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">إجمالي الأرباح</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">24,500</div>
                  <p className="text-sm text-gray-500 mt-1">ر.س هذا الشهر</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Sessions Overview */}
            <Card>
              <CardHeader>
                <CardTitle>الجلسات القادمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{session.name}</h4>
                        <p className="text-sm text-gray-600">{session.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                        <p className="text-sm text-gray-600 mt-1">{session.students} طالب</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="البحث في الجلسات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button variant="outline">تصفية</Button>
            </div>

            {/* Sessions Table */}
            <Card>
              <CardHeader>
                <CardTitle>جدول الجلسات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-right py-3 px-4 font-medium text-gray-600">اسم الجلسة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">التاريخ</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">عدد الطلاب</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">السعر</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSessions.map((session) => (
                        <tr key={session.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium">{session.name}</td>
                          <td className="py-3 px-4 text-gray-600">{session.date}</td>
                          <td className="py-3 px-4 text-gray-600">{session.students}</td>
                          <td className="py-3 px-4 text-gray-600">{session.price} ر.س</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                تعديل
                              </Button>
                              <Button size="sm" variant="destructive">
                                حذف
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === "calendar" && (
          <Card>
            <CardHeader>
              <CardTitle>تقويم الجلسات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDate(day.day)}
                    className={`
                      aspect-square p-2 rounded-lg text-sm transition-colors
                      ${
                        selectedDate === day.day
                          ? "bg-blue-600 text-white"
                          : day.hasSession
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : "hover:bg-gray-100"
                      }
                    `}
                  >
                    <div>{day.day}</div>
                    {day.hasSession && <div className="text-xs mt-1">{day.sessionCount} جلسة</div>}
                  </button>
                ))}
              </div>
              {selectedDate && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">جلسات يوم {selectedDate}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>الرياضيات - الجبر</span>
                      <span className="text-sm text-gray-600">10:00 ص</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>الفيزياء - الحركة</span>
                      <span className="text-sm text-gray-600">2:00 م</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <div className="space-y-6">
            {/* Earnings Chart */}
            <Card>
              <CardHeader>
                <CardTitle>الأرباح الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyEarnings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="earnings" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Payments Table */}
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل المدفوعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-right py-3 px-4 font-medium text-gray-600">التاريخ</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">المبلغ</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">اسم الطالب</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">حالة الدفع</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">{payment.date}</td>
                          <td className="py-3 px-4 font-medium">{payment.amount} ر.س</td>
                          <td className="py-3 px-4">{payment.student}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <Card>
            <CardHeader>
              <CardTitle>آراء الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`w-12 h-12 rounded-full ${review.avatar} flex items-center justify-center text-white font-bold`}
                    >
                      {review.student.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{review.student}</h4>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
