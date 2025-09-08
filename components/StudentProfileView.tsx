export default function StudentProfileScreen() {
  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* الغلاف العلوي مع الصورة */}
      <div className="relative">
        <div className="h-40 bg-blue-200"></div>
        <div className="absolute -bottom-16 right-6">
          <div className="w-32 h-32 rounded-full bg-white p-2 shadow-md">
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full"></div>
          </div>
        </div>
      </div>

      {/* محتوى الصفحة */}
      <div className="p-6 pt-20">
        {/* الاسم وزر التعديل */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">أحمد محمد</h1>
            <p className="text-gray-600">طالب - الصف الثالث الثانوي</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center">
            <span className="mr-2">✏️</span> تعديل الملف
          </button>
        </div>

        {/* البيانات الشخصية */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">البيانات الشخصية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="البريد الإلكتروني" value="ahmed@example.com" />
            <InfoItem label="رقم الجوال" value="+966 50 123 4567" />
            <InfoItem label="تاريخ الميلاد" value="15/03/2005" />
            <InfoItem label="المدينة" value="الرياض" />
          </div>
        </div>

        {/* المعلومات الأكاديمية */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">المعلومات الأكاديمية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="المرحلة الدراسية" value="الثانوي" />
            <InfoItem label="الصف" value="الصف الثاني الثانوي" />
            <InfoItem label="المنهج" value="المنهج السعودي" />
          </div>
        </div>

        {/* معلومات الموقع */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">معلومات الموقع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="البلد" value="المملكة العربية السعودية" />
            <InfoItem label="المحافظة / المنطقة" value="الرياض" />
          </div>
          <div className="mt-4">
            <iframe
              title="student-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.205286276997!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f035bcb4f62f3%3A0x6b08c8b3d6a8ef!2z2KfZhNis2KfZhdiq2KfZhNiq2YTZhQ!5e0!3m2!1sar!2ssa!4v1693226000000"
              width="100%"
              height="250"
              className="rounded-lg border"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* المواد المهتم بها */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">المواد المهتم بها</h2>
          <div className="flex flex-wrap gap-3">
            <Tag text="الرياضيات" color="blue" />
            <Tag text="الفيزياء" color="green" />
            <Tag text="الكيمياء" color="purple" />
            <Tag text="الإنجليزية" color="yellow" />
          </div>
        </div>

        {/* المواد الدراسية */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">المواد الدراسية</h2>
          <SubjectCard
            title="الرياضيات"
            progress={75}
            lessons={12}
            completed={9}
          />
          <SubjectCard
            title="الفيزياء"
            progress={50}
            lessons={8}
            completed={4}
          />
        </div>

        {/* إحصائيات التعلم */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4 border-b pb-2">إحصائيات التعلم</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard value="24" label="حصة تمت" color="blue" />
            <StatCard value="4.5" label="متوسط التقييمات" color="green" />
            <StatCard value="5" label="مدرسين مختلفين" color="purple" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* مكوّنات فرعية للتنظيم */
function InfoItem({ label, value }) {
  return (
    <div>
      <label className="block text-gray-600 mb-1">{label}</label>
      <p className="font-medium">{value}</p>
    </div>
  )
}

function Tag({ text, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    yellow: "bg-yellow-100 text-yellow-800",
  }
  return <span className={`px-4 py-2 rounded-lg ${colors[color]}`}>{text}</span>
}

function SubjectCard({ title, progress, lessons, completed }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">{title}</h3>
        <span className="text-primary">{progress}% إنجاز</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <span className="text-blue-500 mr-2">📚</span>
          <span>{lessons} درس</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-500 mr-2">✅</span>
          <span>{completed} مكتمل</span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ value, label, color }) {
  const colors = {
    blue: "text-blue-700 bg-blue-50",
    green: "text-green-700 bg-green-50",
    purple: "text-purple-700 bg-purple-50",
  }
  return (
    <div className={`${colors[color]} rounded-lg p-4 text-center`}>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-700">{label}</div>
    </div>
  )
}
