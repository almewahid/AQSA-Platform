export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white mt-8 shadow-lg">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* النص */}
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} منصة التعليم الإلكتروني | جميع الحقوق محفوظة
        </p>

        {/* الروابط */}
        <div className="flex space-x-6 rtl:space-x-reverse mt-3 md:mt-0">
          <a
            href="/about"
            className="hover:underline hover:opacity-100 opacity-80 transition"
          >
            من نحن
          </a>
          <a
            href="/contact"
            className="hover:underline hover:opacity-100 opacity-80 transition"
          >
            تواصل معنا
          </a>
          <a
            href="/privacy"
            className="hover:underline hover:opacity-100 opacity-80 transition"
          >
            سياسة الخصوصية
          </a>
        </div>
      </div>
    </footer>
  );
}
