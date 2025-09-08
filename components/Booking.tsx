"use client"

import { useState } from "react"

export default function BookingScreen() {
  const [selectedDay, setSelectedDay] = useState(8)
  const [selectedTime, setSelectedTime] = useState("6:00 م")

  const times = ["3:00 م", "4:00 م", "5:00 م", "6:00 م", "7:00 م", "8:00 م"]

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">حجز حصة مع محمد أحمد</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold text-lg mb-3">تفاصيل الحجز</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">نوع الحجز</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="online">أونلاين</option>
                <option value="home">في المنزل</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">المرحلة التعليمية</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">اختر المرحلة</option>
                <option value="elementary">الابتدائية</option>
                <option value="middle">المتوسطة</option>
                <option value="high">الثانوية</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">الصف</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">اختر الصف</option>
                <option value="1">الأول ثانوي</option>
                <option value="2">الثاني ثانوي</option>
                <option value="3">الثالث ثانوي</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">المنهج</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">اختر المنهج</option>
                <option value="saudi">المنهج السعودي</option>
                <option value="international">المنهج الدولي</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">اختر الموعد</h2>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <button className="text-primary">
                <span>▶</span>
              </button>
              <span className="font-bold">أكتوبر 2023</span>
              <button className="text-primary">
                <span>◀</span>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              <div className="text-center text-gray-500 py-2">أحد</div>
              <div className="text-center text-gray-500 py-2">اثن</div>
              <div className="text-center text-gray-500 py-2">ثلا</div>
              <div className="text-center text-gray-500 py-2">أرب</div>
              <div className="text-center text-gray-500 py-2">خمي</div>
              <div className="text-center text-gray-500 py-2">جمع</div>
              <div className="text-center text-gray-500 py-2">سبت</div>

              {/* Days */}
              {[...Array(31)].map((_, i) => {
                const day = i + 1
                const isSelected = selectedDay === day
                const isDisabled = day < 1

                return (
                  <div
                    key={day}
                    className={`calendar-day text-center py-2 cursor-pointer ${
                      isSelected
                        ? "selected bg-primary text-white"
                        : isDisabled
                          ? "disabled text-gray-300"
                          : "hover:bg-gray-200"
                    }`}
                    onClick={() => !isDisabled && setSelectedDay(day)}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">الأوقات المتاحة:</h3>
            <div className="grid grid-cols-3 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  className={`py-2 rounded ${
                    selectedTime === time ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span>المجموع:</span>
              <span className="font-bold">75 ر.س</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span className="font-bold">11.25 ر.س</span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-blue-100">
              <span className="font-bold">الإجمالي:</span>
              <span className="font-bold text-lg">86.25 ر.س</span>
            </div>
          </div>

          <button className="w-full mt-4 btn-primary text-white font-bold py-3 px-4 rounded-lg shadow-lg">
            تأكيد الحجز والدفع
          </button>
        </div>
      </div>
    </section>
  )
}
