import { useRouter } from "next/navigation";

const router = useRouter();

<button
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
  onClick={() => router.push(`/teacher/${teacher.id}`)}
>
  عرض الملف
</button>
