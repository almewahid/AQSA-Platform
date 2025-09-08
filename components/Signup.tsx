"use client"

import type React from "react"

interface SignupScreenProps {
  onShowScreen: (screen: string) => void
}

export default function SignupScreen({ onShowScreen }: SignupScreenProps) {
  const handleLoginClick = () => {
    onShowScreen("login")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onShowScreen("home")
  }

  return (
    <section className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 mt-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">إنشاء حساب جديد</h2>
        <p className="text-gray-600 mt-2">املأ البيانات التالية لإنشاء حسابك</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 mb-2">الاسم الكامل</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل اسمك"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">كلمة المرور</label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل كلمة المرور"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">نوع الحساب</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">اختر نوع الحساب</option>
            <option value="student">طالب</option>
            <option value="teacher">مدرس</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">الصورة الشخصية</label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center">
              <span className="text-gray-400 text-2xl">👤</span>
            </div>
            <button type="button" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">
              رفع صورة
            </button>
          </div>
        </div>

        <button type="submit" className="w-full btn-primary text-white font-bold py-3 px-4 rounded-lg shadow-lg">
          إنشاء الحساب
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          لديك حساب بالفعل؟
          <a
            href="#"
            className="text-primary font-medium mr-1"
            onClick={(e) => {
              e.preventDefault()
              handleLoginClick()
            }}
          >
            سجل الدخول
          </a>
        </p>
      </div>
    </section>
  )
}
