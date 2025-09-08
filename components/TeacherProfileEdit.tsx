"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// icons
import {
  User,
  BookOpen,
  Clock,
  DollarSign,
  Award,
  Star,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase as Certificate,
  Plus,
  X,
  Eye,
  Save,
  ChevronRight,
  Check,
} from "lucide-react"

// -------------------- helpers --------------------
const daysOfWeek = [
  "السبت",
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
]

const subjectsOptions = [
  "الرياضيات",
  "الجبر",
  "الهندسة",
  "التفاضل والتكامل",
  "الإحصاء",
  "الفيزياء",
  "الكيمياء",
]
const gradesOptions = ["ابتدائي", "إعدادي", "ثانوي عام", "IG", "American", "SAT"]
const curriculaOptions = ["المنهج المصري", "المنهج الأمريكي", "المنهج البريطاني"]

// schema
const timeSlotSchema = z.object({ time: z.string().min(1, "أدخل وقتًا") })
const dayScheduleSchema = z.object({
  day: z.string(),
  times: z.array(timeSlotSchema),
})

const experienceSchema = z.object({
  type: z.enum(["certificate", "course", "degree"]),
  title: z.string().min(2),
  institution: z.string().min(2),
  year: z.string().min(2),
})

const formSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب"),
  address: z.string().min(3, "العنوان مطلوب"),
  phone: z
    .string()
    .min(6, "رقم الهاتف غير صالح")
    .regex(/^[+\d][\d\s-]+$/, "صيغة الهاتف غير صحيحة"),
  email: z.string().email("صيغة البريد غير صحيحة"),
  shortBio: z.string().min(10, "أدخل نبذة مناسبة"),
  detailedBio: z.string().min(20, "أدخل وصفًا تفصيليًا"),
  videoUrl: z.string().url("رابط غير صالح"),
  schedules: z.array(dayScheduleSchema),
  holidays: z.array(z.string()),
  subjects: z.array(z.string()).min(1, "اختر مادة واحدة على الأقل"),
  grades: z.array(z.string()).min(1, "اختر مرحلة واحدة على الأقل"),
  curricula: z.array(z.string()).min(1, "اختر منهجًا واحدًا على الأقل"),
  pricing: z.object({
    singleSession: z.coerce.number().min(1),
    eightSessions: z.coerce.number().min(1),
    twelveSessions: z.coerce.number().min(1),
  }),
  discounts: z.object({
    enabled: z.boolean(),
    type: z.enum(["all", "specific"]).default("all"),
    student: z.string().optional().default(""),
    single: z.coerce.number().min(0).max(100).default(0),
    eight: z.coerce.number().min(0).max(100).default(0),
    twelve: z.coerce.number().min(0).max(100).default(0),
  }),
})

export type TeacherProfileForm = z.infer<typeof formSchema>

// default data
const defaultValues: TeacherProfileForm = {
  name: "أحمد محمد علي",
  address: "القاهرة، مصر",
  phone: "+20 123 456 7890",
  email: "ahmed.mohamed@example.com",
  shortBio: "مدرس رياضيات متخصص مع خبرة 10 سنوات في تدريس المناهج المصرية والدولية",
  detailedBio:
    "أستاذ رياضيات حاصل على ماجستير في الرياضيات التطبيقية من جامعة القاهرة. خبرة في جميع المراحل التعليمية. أسلوب مبسط وفعال يساعد الطلاب على الفهم العميق وتحقيق نتائج متميزة.",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  schedules: daysOfWeek.slice(0, 6).map((d) => ({ day: d, times: [{ time: "9:00 ص" }, { time: "11:00 ص" }] })),
  holidays: ["الجمعة", "العطل الرسمية"],
  subjects: ["الرياضيات", "الجبر"],
  grades: ["إعدادي", "ثانوي عام"],
  curricula: ["المنهج المصري", "المنهج البريطاني"],
  pricing: { singleSession: 150, eightSessions: 1100, twelveSessions: 1500 },
  discounts: { enabled: true, type: "all", student: "", single: 10, eight: 15, twelve: 20 },
}

// A lightweight MultiSelect using popover+checkbox-like behaviour
function MultiSelect({
  label,
  options,
  values,
  onChange,
  placeholder,
}: {
  label?: string
  options: string[]
  values: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const toggle = (opt: string) => {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt))
    else onChange([...values, opt])
  }
  return (
    <div className="text-right">
      {label && <Label className="mb-2 block">{label}</Label>}
      <div
        className="border rounded-md px-3 py-2 cursor-pointer min-h-[40px] bg-background"
        onClick={() => setOpen((s) => !s)}
      >
        {values.length === 0 ? (
          <span className="text-muted-foreground">{placeholder ?? "اختر..."}</span>
        ) : (
          <div className="flex flex-wrap gap-2 justify-end">
            {values.map((v) => (
              <Badge key={v} variant="secondary" className="text-sm">
                {v}
              </Badge>
            ))}
          </div>
        )}
      </div>
      {open && (
        <div className="mt-2 border rounded-md p-2 max-h-56 overflow-auto bg-popover">
          <div className="grid gap-1">
            {options.map((opt) => {
              const active = values.includes(opt)
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggle(opt)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 hover:bg-accent ${
                    active ? "bg-accent" : ""
                  }`}
                >
                  <span className="text-right flex-1">{opt}</span>
                  {active ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 opacity-50" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function numberArabic(n: number) {
  return new Intl.NumberFormat("ar-EG").format(n)
}

function toEmbedUrl(url: string) {
  // try to convert YouTube watch URLs to embed
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`
    }
    return url
  } catch {
    return url
  }
}

export default function TeacherProfileEdit() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState(
    "personal" as
      | "personal"
      | "bio"
      | "schedule"
      | "subjects"
      | "pricing"
      | "experience"
      | "reviews"
  )
  const [previewOpen, setPreviewOpen] = useState(false)

  const form = useForm<TeacherProfileForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  // field arrays for schedule & experience
  const { fields: scheduleDays, append: appendDay, remove: removeDay } = useFieldArray({
    control: form.control,
    name: "schedules",
  })

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control: form.control, name: "experiences" as any }) as any // optional experiences

  useEffect(() => {
    // ensure experiences exists in form state (optional array)
    if (!(form.getValues() as any).experiences) {
      ;(form.setValue as any)("experiences", [])
    }
  }, [])

  const initials = useMemo(() => {
    const parts = form.watch("name").trim().split(/\s+/).slice(0, 2)
    return parts.map((p) => p[0]).join("")
  }, [form.watch("name")])

  const onSubmit = (values: TeacherProfileForm) => {
    // simulate save
    toast({
      title: "تم حفظ التعديلات",
      description: "تم تحديث بيانات ملف المدرس بنجاح.",
    })
    console.log("SAVED:", values)
  }

  const Step = ({ id, icon: Icon, label }: { id: typeof activeSection; icon: any; label: string }) => (
    <button
      type="button"
      onClick={() => setActiveSection(id)}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors ${
        activeSection === id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )

  // -------------- sections --------------
  const SectionPersonal = (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <User className="h-5 w-5" /> البيانات الشخصية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-right">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 grid md:grid-cols-2 gap-3">
            <div>
              <Label>الاسم</Label>
              <Input {...form.register("name")} className="text-right" />
              <p className="text-xs text-destructive mt-1">{form.formState.errors.name?.message}</p>
            </div>
            <div>
              <Label>العنوان</Label>
              <Input {...form.register("address")} className="text-right" />
              <p className="text-xs text-destructive mt-1">{form.formState.errors.address?.message}</p>
            </div>
            <div>
              <Label>الهاتف</Label>
              <Input {...form.register("phone")} className="text-right" />
              <p className="text-xs text-destructive mt-1">{form.formState.errors.phone?.message}</p>
            </div>
            <div>
              <Label>البريد الإلكتروني</Label>
              <Input type="email" {...form.register("email")} className="text-right" />
              <p className="text-xs text-destructive mt-1">{form.formState.errors.email?.message}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const SectionBio = (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <BookOpen className="h-5 w-5" /> النبذة التعريفية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-right">
        <div>
          <Label>نبذة قصيرة</Label>
          <Textarea rows={3} {...form.register("shortBio")} />
          <p className="text-xs text-destructive mt-1">{form.formState.errors.shortBio?.message}</p>
        </div>
        <div>
          <Label>التعريف التفصيلي</Label>
          <Textarea rows={6} {...form.register("detailedBio")} />
          <p className="text-xs text-destructive mt-1">{form.formState.errors.detailedBio?.message}</p>
        </div>
        <div>
          <Label>رابط الفيديو (YouTube)</Label>
          <Input {...form.register("videoUrl")} placeholder="https://www.youtube.com/watch?v=..." />
          <p className="text-xs text-destructive mt-1">{form.formState.errors.videoUrl?.message}</p>
        </div>
        <div>
          <Label className="mb-2 block">معاينة الفيديو</Label>
          <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
            <iframe
              src={toEmbedUrl(form.watch("videoUrl"))}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const SectionSchedule = (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <Clock className="h-5 w-5" /> الأوقات المتاحة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-right">
        {scheduleDays.map((dayField, idx) => (
          <div key={dayField.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">{form.getValues(`schedules.${idx}.day` as const)}</h4>
              <Button variant="ghost" size="icon" onClick={() => removeDay(idx)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DayTimesEditor index={idx} />
          </div>
        ))}
        <div className="flex flex-wrap gap-2 justify-end">
          {daysOfWeek
            .filter((d) => !form.getValues("schedules").some((s) => s.day === d))
            .map((d) => (
              <Button
                key={d}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendDay({ day: d, times: [] })}
              >
                <Plus className="h-4 w-4 ml-1" /> أضف {d}
              </Button>
            ))}
        </div>

        <Separator />

        <div>
          <Label className="mb-2 block">الأجازات</Label>
          <MultiSelect
            options={daysOfWeek}
            values={form.watch("holidays")}
            onChange={(v) => form.setValue("holidays", v, { shouldDirty: true })}
            placeholder="اختر أيام الأجازة"
          />
        </div>
      </CardContent>
    </Card>
  )

  function DayTimesEditor({ index }: { index: number }) {
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: `schedules.${index}.times` as const,
    })
    const [timeInput, setTimeInput] = useState("")
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 justify-end">
          {fields.map((f, i) => (
            <div key={f.id} className="flex items-center gap-2 border rounded-full pl-2 pr-3 py-1">
              <span>{form.getValues(`schedules.${index}.times.${i}.time` as const)}</span>
              <Button variant="ghost" size="icon" onClick={() => remove(i)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="مثال: 9:00 ص - 11:00 ص"
            className="text-right"
          />
          <Button
            type="button"
            onClick={() => {
              if (timeInput.trim()) {
                append({ time: timeInput.trim() })
                setTimeInput("")
              }
            }}
          >
            <Plus className="h-4 w-4 ml-1" /> إضافة وقت
          </Button>
        </div>
      </div>
    )
  }

  const SectionSubjects = (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <BookOpen className="h-5 w-5" /> المناهج والمراحل والمواد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-right">
        <MultiSelect
          label="المواد"
          options={subjectsOptions}
          values={form.watch("subjects")}
          onChange={(v) => form.setValue("subjects", v, { shouldDirty: true })}
          placeholder="اختر المواد"
        />
        <MultiSelect
          label="المراحل الدراسية"
          options={gradesOptions}
          values={form.watch("grades")}
          onChange={(v) => form.setValue("grades", v, { shouldDirty: true })}
          placeholder="اختر المراحل"
        />
        <MultiSelect
          label="المناهج"
          options={curriculaOptions}
          values={form.watch("curricula")}
          onChange={(v) => form.setValue("curricula", v, { shouldDirty: true })}
          placeholder="اختر المناهج"
        />
      </CardContent>
    </Card>
  )

  const SectionPricing = (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <DollarSign className="h-5 w-5" /> الأسعار
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-right">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-2 rounded-xl p-4">
            <Label className="mb-2 block">حصة واحدة</Label>
            <Input
              type="number"
              {...form.register("pricing.singleSession", { valueAsNumber: true })}
              className="text-right"
            />
          </div>
          <div className="border-2 rounded-xl p-4">
            <Label className="mb-2 block">8 حصص</Label>
            <Input
              type="number"
              {...form.register("pricing.eightSessions", { valueAsNumber: true })}
              className="text-right"
            />
          </div>
          <div className="border-2 rounded-xl p-4">
            <Label className="mb-2 block">12 حصة</Label>
            <Input
              type="number"
              {...form.register("pricing.twelveSessions", { valueAsNumber: true })}
              className="text-right"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border rounded-xl p-4">
          <div className="space-y-1">
            <Label>تفعيل الخصومات</Label>
            <p className="text-xs text-muted-foreground">يمكنك تعريف خصم عام أو لطلاب محددين</p>
          </div>
          <Switch
            checked={form.watch("discounts.enabled")}
            onCheckedChange={(v) => form.setValue("discounts.enabled", v, { shouldDirty: true })}
          />
        </div>

        {form.watch("discounts.enabled") && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>نوع الخصم</Label>
              <Select
                value={form.watch("discounts.type")}
                onValueChange={(v: "all" | "specific") => form.setValue("discounts.type", v, { shouldDirty: true })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الطلاب</SelectItem>
                  <SelectItem value="specific">طالب محدد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.watch("discounts.type") === "specific" && (
              <div>
                <Label>اسم الطالب</Label>
                <Input
                  value={form.watch("discounts.student")}
                  onChange={(e) => form.setValue("discounts.student", e.target.value, { shouldDirty: true })}
                  placeholder="اكتب اسم الطالب"
                  className="text-right"
                />
              </div>
            )}
            <div>
              <Label>خصم الحصة الواحدة (%)</Label>
              <Input
                type="number"
                value={form.watch("discounts.single")}
                onChange={(e) => form.setValue("discounts.single", Number(e.target.value), { shouldDirty: true })}
                className="text-right"
              />
            </div>
            <div>
              <Label>خصم 8 حصص (%)</Label>
              <Input
                type="number"
                value={form.watch("discounts.eight")}
                onChange={(e) => form.setValue("discounts.eight", Number(e.target.value), { shouldDirty: true })}
                className="text-right"
              />
            </div>
            <div>
              <Label>خصم 12 حصة (%)</Label>
              <Input
                type="number"
                value={form.watch("discounts.twelve")}
                onChange={(e) => form.setValue("discounts.twelve", Number(e.target.value), { shouldDirty: true })}
                className="text-right"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const SectionExperience = (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <Award className="h-5 w-5" /> الخبرات والشهادات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-right">
        <ExperienceEditor />
      </CardContent>
    </Card>
  )

  function ExperienceEditor() {
    const [type, setType] = useState("degree")
    const [title, setTitle] = useState("")
    const [institution, setInstitution] = useState("")
    const [year, setYear] = useState("")

    const add = () => {
      if (!title || !institution || !year) return
      const prev = (form.getValues() as any).experiences || []
      ;(form.setValue as any)("experiences", [...prev, { type, title, institution, year }], { shouldDirty: true })
      setTitle("")
      setInstitution("")
      setYear("")
    }

    const removeAt = (idx: number) => {
      const prev = (form.getValues() as any).experiences || []
      prev.splice(idx, 1)
      ;(form.setValue as any)("experiences", [...prev], { shouldDirty: true })
    }

    const list: any[] = ((form.watch() as any).experiences as any[]) || []

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <Label>النوع</Label>
            <Select value={type} onValueChange={setType as any}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="degree">درجة علمية</SelectItem>
                <SelectItem value="certificate">شهادة</SelectItem>
                <SelectItem value="course">دورة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>العنوان</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="text-right" />
          </div>
          <div>
            <Label>الجهة</Label>
            <Input value={institution} onChange={(e) => setInstitution(e.target.value)} className="text-right" />
          </div>
          <div>
            <Label>السنة</Label>
            <Input value={year} onChange={(e) => setYear(e.target.value)} className="text-right" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={add}>
            <Plus className="h-4 w-4 ml-1" /> أضف خبرة
          </Button>
        </div>
        <div className="grid gap-3">
          {list.length === 0 && (
            <p className="text-muted-foreground">لا توجد خبرات بعد</p>
          )}
          {list.map((exp, idx) => (
            <div key={idx} className="border rounded-lg p-3 flex items-start justify-between">
              <div className="text-right">
                <p className="font-medium">{exp.title}</p>
                <p className="text-sm text-muted-foreground">{exp.institution} • {exp.year}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeAt(idx)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const SectionReviews = (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <Star className="h-5 w-5" /> التقييمات (عرض فقط)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-right">سيتم عرض آراء الطلبة وتقييماتهم هنا (غير قابل للتعديل من صفحة التحرير).</p>
      </CardContent>
    </Card>
  )

  const sectionsMap: Record<typeof activeSection, JSX.Element> = {
    personal: SectionPersonal,
    bio: SectionBio,
    schedule: SectionSchedule,
    subjects: SectionSubjects,
    pricing: SectionPricing,
    experience: SectionExperience,
    reviews: SectionReviews,
  }

  // preview content (compact)
  const PreviewContent = () => {
    const v = form.getValues()
    return (
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="font-bold">{v.name}</p>
            <p className="text-sm text-muted-foreground">{v.address} • {v.phone} • {v.email}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-1">النبذة</p>
          <p className="text-sm">{v.shortBio}</p>
        </div>
        <div>
          <p className="font-semibold mb-1">المواد • المراحل • المناهج</p>
          <div className="flex flex-wrap gap-2 justify-end">
            {v.subjects.map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
            {v.grades.map((g) => (
              <Badge key={g}>{g}</Badge>
            ))}
            {v.curricula.map((c) => (
              <Badge key={c} className="bg-green-100 text-green-800">{c}</Badge>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm">حصة واحدة</p>
              <p className="text-2xl font-bold">{numberArabic(v.pricing.singleSession)} ج</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm">8 حصص</p>
              <p className="text-2xl font-bold">{numberArabic(v.pricing.eightSessions)} ج</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm">12 حصة</p>
              <p className="text-2xl font-bold">{numberArabic(v.pricing.twelveSessions)} ج</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-50 pb-24" // leave space for sticky bar
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">✏️ تعديل ملف المدرس</h1>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
              <Eye className="h-4 w-4 ml-1" /> معاينة
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 ml-1" /> حفظ
            </Button>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex flex-wrap gap-2 justify-end mb-6">
          <Step id="personal" icon={User} label="البيانات الشخصية" />
          <Step id="bio" icon={BookOpen} label="النبذة" />
          <Step id="schedule" icon={Clock} label="الأوقات" />
          <Step id="subjects" icon={BookOpen} label="المناهج/المواد" />
          <Step id="pricing" icon={DollarSign} label="الأسعار" />
          <Step id="experience" icon={Award} label="الخبرات" />
          <Step id="reviews" icon={Star} label="التقييمات" />
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="rounded-xl sticky top-4">
              <CardContent className="p-4 space-y-2">
                {(
                  [
                    { id: "personal", label: "البيانات الشخصية", icon: User },
                    { id: "bio", label: "النبذة التعريفية", icon: BookOpen },
                    { id: "schedule", label: "الأوقات المتاحة", icon: Clock },
                    { id: "subjects", label: "المناهج والمواد", icon: BookOpen },
                    { id: "pricing", label: "الأسعار", icon: DollarSign },
                    { id: "experience", label: "الخبرات والشهادات", icon: Award },
                    { id: "reviews", label: "التقييمات", icon: Star },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent"
                    }`}
                  >
                    <span className="flex-1">{item.label}</span>
                    <item.icon className="h-4 w-4" />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">{sectionsMap[activeSection]}</div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur border-t px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">تأكد من مراجعة بياناتك قبل الحفظ</div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
              <Eye className="h-4 w-4 ml-1" /> معاينة
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 ml-1" /> حفظ التعديلات
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-right">معاينة سريعة</DialogTitle>
          </DialogHeader>
          <PreviewContent />
          <DialogFooter>
            <Button onClick={() => setPreviewOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  )
}
