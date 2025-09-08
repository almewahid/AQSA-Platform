"use client"

interface LoginScreenProps {
  onShowScreen: (screen: string) => void
  onUpdateNav: (nav: string) => void
}

export default function LoginScreen({ onShowScreen, onUpdateNav }: LoginScreenProps) {
  const handlePhoneLogin = () => {
    onShowScreen("home")
    onUpdateNav("home")
  }

  const handleSignupClick = () => {
    onShowScreen("signup")
  }

  return (
    <section className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 mt-12">
      <div className="text-center mb-8">
        <div className="mx-auto bg-primary rounded-full p-4 w-24 h-24 flex items-center justify-center mb-6">
          <span className="text-white text-4xl">🎓</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">مرحباً بك في المنصة التعليمية</h2>
        <p className="text-gray-600 mt-2">سجل الدخول للبدء في رحلتك التعليمية</p>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg transition">
          <span className="text-blue-600">G</span>
          <span>تسجيل الدخول بحساب Google</span>
        </button>

        <button
          className="w-full flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 px-4 rounded-lg transition"
          onClick={handlePhoneLogin}
        >
          <span className="text-green-600">📱</span>
          <span>تسجيل الدخول برقم الهاتف</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          ليس لديك حساب؟
          <a
            href="#"
            className="text-primary font-medium mr-1"
            onClick={(e) => {
              e.preventDefault()
              handleSignupClick()
            }}
          >
            سجل الآن
          </a>
        </p>
      </div>
    </section>
  )
}
