"use client"

import type React from "react"

import { useState } from "react"

interface Message {
  type: "sent" | "received"
  text: string
}

interface Chat {
  name: string
  status: string
  messages: Message[]
}

export default function MessagesScreen() {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState("")

  const [chats] = useState<Record<string, Chat>>({
    mohamed: {
      name: "محمد أحمد",
      status: "متصل الآن",
      messages: [
        { type: "received", text: "السلام عليكم، عندي سؤال في الدرس الأخير." },
        { type: "sent", text: "وعليكم السلام، تفضل اسألني." },
        { type: "received", text: "ممكن توضح طريقة الحل في المثال الثالث؟" },
      ],
    },
    sara: {
      name: "سارة خالد",
      status: "آخر ظهور منذ 5 دقائق",
      messages: [
        { type: "received", text: "تم تأكيد الدرس ليوم الثلاثاء." },
        { type: "sent", text: "ممتاز، أشكرك 🌹" },
      ],
    },
  })

  const loadChat = (chatId: string) => {
    setCurrentChatId(chatId)
  }

  const sendMessage = () => {
    if (messageInput.trim() === "" || !currentChatId) return

    // In a real app, you would update the chat state here
    setMessageInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const currentChat = currentChatId ? chats[currentChatId] : null

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[80vh]">
        {/* قائمة المحادثات */}
        <div className="bg-white rounded-xl shadow-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">المحادثات</h2>
          <div className="space-y-3">
            {/* محادثة */}
            <div
              className={`flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer ${currentChatId === "mohamed" ? "bg-gray-50" : ""}`}
              onClick={() => loadChat("mohamed")}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">👤</span>
              </div>
              <div className="mr-3">
                <h3 className="font-bold">محمد أحمد</h3>
                <p className="text-sm text-gray-500 truncate">السلام عليكم...</p>
              </div>
            </div>

            <div
              className={`flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer ${currentChatId === "sara" ? "bg-gray-50" : ""}`}
              onClick={() => loadChat("sara")}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl">👤</span>
              </div>
              <div className="mr-3">
                <h3 className="font-bold">سارة خالد</h3>
                <p className="text-sm text-gray-500 truncate">تم تأكيد الدرس...</p>
              </div>
            </div>
          </div>
        </div>

        {/* نافذة المحادثة */}
        <div className="bg-white rounded-xl shadow-lg md:col-span-2 flex flex-col">
          {/* الهيدر */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-gray-500 text-lg">👤</span>
              </div>
              <div>
                <h3 className="font-bold">{currentChat?.name || "اختر محادثة"}</h3>
                <p className="text-sm text-gray-500">{currentChat?.status || "---"}</p>
              </div>
            </div>
          </div>

          {/* الرسائل */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {currentChat?.messages.map((message, index) => (
              <div key={index} className={`chat-bubble ${message.type} mb-3`}>
                {message.text}
              </div>
            ))}
          </div>

          {/* كتابة رسالة */}
          <div className="p-4 border-t flex">
            <input
              type="text"
              placeholder="اكتب رسالتك هنا..."
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="ml-2 btn-primary text-white px-4 py-2 rounded-lg" onClick={sendMessage}>
              إرسال
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
