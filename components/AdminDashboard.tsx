"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// بيانات تجريبية للإحصائيات العامة
const overviewStats = {
  students: 1247,
  teachers: 89,
  sessions: 342,
  totalEarnings: 125400,
}

// بيانات تجريبية للأرباح الشهرية
const monthlyRevenue = [
  { month: "يناير", revenue: 45000 },
  { month: "فبراير", revenue: 52000 },
  { month: "مارس", revenue: 48000 },
  { month: "أبريل", revenue: 61000 },
  { month: "مايو", revenue: 55000 },
  { month: "يونيو", revenue: 67000 },
]

// بيانات تجريبية للمستخدمين
const users = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    type: "طالب",
    status: "نشط",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "فاطمة سالم",
    email: "fatima@example.com",
    type: "مدرس",
    status: "نشط",
    joinDate: "2024-01-10",
  },
  {
    id: 3,
    name: "محمد أحمد",
    email: "mohammed@example.com",
    type: "طالب",
    status: "معلق",
    joinDate: "2024-01-20",
  },
  {
    id: 4,
    name: "نورا عبدالله",
    email: "nora@example.com",
    type: "مدرس",
    status: "نشط",
    joinDate: "2024-01-08",
  },
  {
    id: 5,
    name: "خالد يوسف",
    email: "khalid@example.com",
    type: "طالب",
    status: "نشط",
    joinDate: "2024-01-25",
  },
]

// بيانات تجريبية للجلسات
const sessions = [
  {
    id: 1,
    name: "الرياضيات المتقدمة",
    teacher: "أ. فاطمة سالم",
    date: "2024-01-28",
    students: 15,
    status: "قادم",
  },
  {
    id: 2,
    name: "الفيزياء النووية",
    teacher: "أ. نورا عبدالله",
    date: "2024-01-29",
    students: 12,
    status: "مكتمل",
  },
  {
    id: 3,
    name: "الكيمياء العضوية",
    teacher: "أ. محمد حسن",
    date: "2024-01-30",
    students: 18,
    status: "ملغى",
  },
  {
    id: 4,
    name: "اللغة العربية",
    teacher: "أ. سارة أحمد",
    date: "2024-02-01",
    students: 20,
    status: "قادم",
  },
]

// بيانات تجريبية للمدفوعات
const payments = [
  {
    id: 1,
    date: "2024-01-25",
    teacher: "أ. فاطمة سالم",
    amount: 1500,
    status: "مدفوع",
  },
  {
    id: 2,
    date: "2024-01-24",
    teacher: "أ. نورا عبدالله",
    amount: 1200,
    status: "معلق",
  },
  {
    id: 3,
    date: "2024-01-23",
    teacher: "أ. محمد حسن",
    amount: 1800,
    status: "مدفوع",
  },
  {
    id: 4,
    date: "2024-01-22",
    teacher: "أ. سارة أحمد",
    amount: 2000,
    status: "مدفوع",
  },
]

// بيانات تجريبية للتنبيهات
const notifications = [
  {
    id: 1,
    icon: "👨‍🏫",
    message: "مدرس جديد سجل في المنصة",
    date: "منذ ساعتين",
    type: "info",
  },
  {
    id: 2,
    icon: "💰",
    message: "تم استلام دفعة جديدة بقيمة 1500 ر.س",
    date: "منذ 4 ساعات",
    type: "success",
  },
  {
    id: 3,
    icon: "⚠️",
    message: "جلسة تحتاج إلى مراجعة",
    date: "منذ 6 ساعات",
    type: "warning",
  },
  {
    id: 4,
    icon: "👨‍🎓",
    message: "5 طلاب جدد انضموا اليوم",
    date: "منذ 8 ساعات",
    type: "info",
  },
  {
    id: 5,
    icon: "📊",
    message: "تقرير الأرباح الشهري جاهز",
    date: "منذ يوم",
    type: "info",
  },
]

export default function AdminDashboard() {
  const [searchUsers, setSearchUsers] = useState("")
  const [searchSessions, setSearchSessions] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // تصفية المستخدمين حسب البحث
  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchUsers) ||
      user.email.includes(searchUsers) ||
      user.type.includes(searchUsers) ||
      user.status.includes(searchUsers),
  )

  // تصفية الجلسات حسب البحث
  const filteredSessions = sessions.filter(
    (session) =>
      session.name.includes(searchSessions) ||
      session.teacher.includes(searchSessions) ||
      session.status.includes(searchSessions),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
      case "مدفوع":
      case "مكتمل":
        return "bg-green-100 text-green-800"
      case "معلق":
      case "قادم":
        return "bg-yellow-100 text-yellow-800"
      case "ملغى":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserTypeColor = (type: string) => {
    return type === "مدرس" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "info":
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم الإدارة</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">تصدير التقارير</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">إعدادات النظام</Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {[
            { id: "overview", label: "نظرة عامة" },
            { id: "users", label: "إدارة الحسابات" },
            { id: "sessions", label: "إدارة الجلسات" },
            { id: "payments", label: "المدفوعات" },
            { id: "notifications", label: "التنبيهات" },
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                    👨‍🎓 عدد الطلاب
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{overviewStats.students.toLocaleString()}</div>
                  <p className="text-sm opacity-80 mt-1">+12% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                    👨‍🏫 عدد المدرسين
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{overviewStats.teachers}</div>
                  <p className="text-sm opacity-80 mt-1">+5% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                    📅 عدد الجلسات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{overviewStats.sessions}</div>
                  <p className="text-sm opacity-80 mt-1">هذا الشهر</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
                    💰 إجمالي الأرباح
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{overviewStats.totalEarnings.toLocaleString()}</div>
                  <p className="text-sm opacity-80 mt-1">ر.س هذا الشهر</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الأنشطة الحديثة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.slice(0, 4).map((notification) => (
                      <div key={notification.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-2xl">{notification.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الجلسات القادمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sessions
                      .filter((s) => s.status === "قادم")
                      .slice(0, 4)
                      .map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">{session.name}</h4>
                            <p className="text-xs text-gray-600">{session.teacher}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">{session.date}</p>
                            <p className="text-xs text-gray-500">{session.students} طالب</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Management Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="البحث في الحسابات..."
                value={searchUsers}
                onChange={(e) => setSearchUsers(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <Button variant="outline">تصفية</Button>
                <Button className="bg-green-600 hover:bg-green-700">+ إضافة مستخدم</Button>
              </div>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>إدارة الحسابات</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">تاريخ التسجيل</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getUserTypeColor(user.type)}>{user.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              تعديل
                            </Button>
                            <Button size="sm" variant="destructive">
                              حذف
                            </Button>
                            <Button size="sm" variant="secondary">
                              إيقاف
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sessions Management Tab */}
        {activeTab === "sessions" && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="البحث في الجلسات..."
                value={searchSessions}
                onChange={(e) => setSearchSessions(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <Button variant="outline">تصفية</Button>
                <Button className="bg-green-600 hover:bg-green-700">+ إضافة جلسة</Button>
              </div>
            </div>

            {/* Sessions Table */}
            <Card>
              <CardHeader>
                <CardTitle>إدارة الجلسات</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">اسم الجلسة</TableHead>
                      <TableHead className="text-right">المدرس</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">عدد الطلاب</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.name}</TableCell>
                        <TableCell className="text-gray-600">{session.teacher}</TableCell>
                        <TableCell className="text-gray-600">{session.date}</TableCell>
                        <TableCell className="text-gray-600">{session.students}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              تعديل
                            </Button>
                            <Button size="sm" variant="destructive">
                              حذف
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>التدفقات المالية الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                    </LineChart>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">اسم المدرس</TableHead>
                      <TableHead className="text-right">المبلغ</TableHead>
                      <TableHead className="text-right">حالة الدفع</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="text-gray-600">{payment.date}</TableCell>
                        <TableCell className="font-medium">{payment.teacher}</TableCell>
                        <TableCell className="font-medium">{payment.amount.toLocaleString()} ر.س</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              عرض
                            </Button>
                            {payment.status === "معلق" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                دفع
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <Card>
            <CardHeader>
              <CardTitle>التنبيهات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${getNotificationColor(notification.type)}`}
                  >
                    <span className="text-2xl">{notification.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.date}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      ✕
                    </Button>
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
