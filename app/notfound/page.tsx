// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h1>
      <p className="text-gray-600 mb-6">تأكد من صحة الرابط أو ارجع للرئيسية.</p>
      <Link href="/" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
        العودة للرئيسية
      </Link>
    </div>
  );
}
