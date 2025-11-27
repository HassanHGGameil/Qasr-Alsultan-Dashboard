"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { STORE } from "@/lib/constains/constains";
import { useLocale } from "next-intl";
import { Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Course data
const COURSES = [
  {
    id: "digital-marketing-pro",
    name: {
      en: "Digital Marketing Pro",
      ar: "التسويق الرقمي المحترف"
    },
    price: 299,
    description: {
      en: "Master digital marketing strategies, social media, and analytics",
      ar: "إتقان استراتيجيات التسويق الرقمي ووسائل التواصل الاجتماعي والتحليلات"
    }
  },
  {
    id: "seo-mastery",
    name: {
      en: "SEO Mastery",
      ar: "إتقان تحسين محركات البحث"
    },
    price: 199,
    description: {
      en: "Learn advanced SEO techniques to rank higher in search results",
      ar: "تعلم تقنيات SEO المتقدمة لتحقيق مرتبة أعلى في نتائج البحث"
    }
  },
  {
    id: "social-media-expert",
    name: {
      en: "Social Media Expert",
      ar: "خبير وسائل التواصل الاجتماعي"
    },
    price: 249,
    description: {
      en: "Become an expert in social media marketing and advertising",
      ar: "كن خبيرًا في التسويق والإعلان عبر وسائل التواصل الاجتماعي"
    }
  }
];

const formSchema = z.object({
  course: z.string().min(1, { message: "course_required" }),
  quantity: z.number().min(1).max(5),
  name: z.string().min(2, { message: "name_required" }),
  email: z.string().email({ message: "email_invalid" }),
  phone: z.string().min(6, { message: "phone_required" }).regex(/^[0-9+\-() ]+$/, { message: "phone_invalid" }),
  paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer"]),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const locale = useLocale();
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0]>();

  const translations = {
    en: {
      title: "Purchase Marketing Course",
      subtitle: "Boost your marketing skills with our expert courses",
      course: "Select Course",
      quantity: "Quantity",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      paymentMethod: "Payment Method",
      credit_card: "Credit Card",
      paypal: "PayPal",
      bank_transfer: "Bank Transfer",
      submit: "Complete Purchase",
      sending: "Processing...",
      success: "Purchase successful!",
      error: "Failed to process purchase. Please try again.",
      thank_you: "Thank You for Your Purchase!",
      confirmation: "Your course access details will be sent to your email shortly.",
      another_purchase: "Buy Another Course",
      total: "Total",
      validation_messages: {
        course_required: "Please select a course",
        name_required: "Name must be at least 2 characters",
        email_invalid: "Please enter a valid email",
        phone_required: "Phone number is required",
        phone_invalid: "Please enter a valid phone number",
      }
    },
    ar: {
      title: "شراء دورة تسويقية",
      subtitle: "طور مهاراتك التسويقية مع دوراتنا الخبيرة",
      course: "اختر الدورة",
      quantity: "الكمية",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      paymentMethod: "طريقة الدفع",
      credit_card: "بطاقة ائتمان",
      paypal: "باي بال",
      bank_transfer: "تحويل بنكي",
      submit: "إتمام الشراء",
      sending: "جاري المعالجة...",
      success: "تم الشراء بنجاح!",
      error: "فشلت عملية الشراء. يرجى المحاولة مرة أخرى.",
      thank_you: "شكراً لشرائك!",
      confirmation: "سيتم إرسال تفاصيل الوصول إلى الدورة إلى بريدك الإلكتروني قريباً.",
      another_purchase: "شراء دورة أخرى",
      total: "المجموع",
      validation_messages: {
        course_required: "الرجاء اختيار دورة",
        name_required: "يجب أن يكون الاسم مكون من حرفين على الأقل",
        email_invalid: "الرجاء إدخال بريد إلكتروني صحيح",
        phone_required: "رقم الهاتف مطلوب",
        phone_invalid: "الرجاء إدخال رقم هاتف صحيح",
      }
    }
  };

  const t = translations[locale as keyof typeof translations];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      paymentMethod: "credit_card",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const selected = COURSES.find(c => c.id === data.course);
      const totalPrice = selected ? selected.price * data.quantity : 0;

      const payload = {
        ...data,
        courseName: selected?.name[locale as keyof typeof translations] || data.course,
        totalPrice,
        currency: "USD"
      };

      const response = await axios.post(`${STORE}/api/courses/purchase`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale,
        },
      });
      
      if (response.status >= 200 && response.status < 300) {
        toast.success(t.success);
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error(response.data?.message || t.error);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error processing purchase:", error);
      const errorMessage = error.response?.data?.message || error.message || t.error;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg text-center max-w-md mx-auto"
      >
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t.thank_you}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t.confirmation}</p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="w-full bg-primary hover:bg-primary/90 transition-colors"
          variant="default"
        >
          {t.another_purchase}
        </Button>
      </motion.div>
    );
  }

  const watchCourse = form.watch("course");
  const watchQuantity = form.watch("quantity");
  const selected = COURSES.find(c => c.id === watchCourse);
  const totalPrice = selected ? selected.price * watchQuantity : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t.subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1  gap-2">
            <div className="space-y-4">
              {/* Course Selection */}
              <FormField
                control={form.control}
                name="course"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t.course}</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCourse(COURSES.find(c => c.id === value));
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.course} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COURSES.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name[locale as keyof typeof translations]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage>
                      {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Course Details */}
              {selectedCourse && (
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-bold">{selectedCourse.name[locale as keyof typeof translations]}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {selectedCourse.description[locale as keyof typeof translations]}
                  </p>
                  <p className="font-bold mt-2">${selectedCourse.price}</p>
                </div>
              )}

            </div>

            <div className="space-y-4">
              {/* Personal Information */}
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t.name}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.name}
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage>
                      {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t.email}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.email}
                        type="email"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage>
                      {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{t.phone}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.phone}
                        type="tel"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage>
                      {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Payment Method */}
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.paymentMethod}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.paymentMethod} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit_card">{t.credit_card}</SelectItem>
                        <SelectItem value="paypal">{t.paypal}</SelectItem>
                        <SelectItem value="bank_transfer">{t.bank_transfer}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Total Price */}
          {selected && (
            <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300">{t.total}:</p>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={loading || !form.watch("course")}
            size="lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.sending}
              </span>
            ) : (
              t.submit
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm;