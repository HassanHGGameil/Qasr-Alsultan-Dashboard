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
import axios from "axios";
import { useLocale } from "next-intl";
import { Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import MansourLogo from "../../../../public/icons/qasr-alsutan-logo.png";
import Image from "next/image";
import { axiosErrorHandler } from "@/utils";
import { useRouter } from "@/i18n/routing";
import Link from "@/components/common/Link";

const formSchema = z.object({
  name: z.string().min(2, { message: "name_required" }),
  email: z.string().email({ message: "email_invalid" }),
  phone: z.string().min(6, { message: "phone_required" }).regex(/^[0-9+\-() ]+$/, { message: "phone_invalid" }),
  password: z.string().min(6, { message: "password_required" }),
  confirmPassword: z.string().min(6, { message: "confirm_password_required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwords_mismatch",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  const translations = {
    en: {
      title: "Create Account",
      subtitle: "Join our community today",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      submit: "Sign Up",
      sending: "Creating account...",
      success: "Account created successfully!",
      error: "Failed to create account. Please try again.",
      thank_you: "Welcome!",
      confirmation: "Your account has been created successfully.",
      sign_in: "Sign In Now",
      already_have_account: "Already have an account?",
      login: "Log In",
      validation_messages: {
        name_required: "Name must be at least 2 characters",
        email_invalid: "Please enter a valid email",
        phone_required: "Phone number is required",
        phone_invalid: "Please enter a valid phone number",
        password_required: "Password must be at least 6 characters",
        confirm_password_required: "Please confirm your password",
        passwords_mismatch: "Passwords do not match",
      }
    },
    ar: {
      title: "إنشاء حساب",
      subtitle: "انضم إلى مجتمعنا اليوم",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      submit: "تسجيل",
      sending: "جاري إنشاء الحساب...",
      success: "تم إنشاء الحساب بنجاح!",
      error: "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.",
      thank_you: "مرحباً بك!",
      confirmation: "تم إنشاء حسابك بنجاح.",
      sign_in: "تسجيل الدخول الآن",
      already_have_account: "هل لديك حساب بالفعل؟",
      login: "تسجيل الدخول",
      validation_messages: {
        name_required: "يجب أن يكون الاسم مكون من حرفين على الأقل",
        email_invalid: "الرجاء إدخال بريد إلكتروني صحيح",
        phone_required: "رقم الهاتف مطلوب",
        phone_invalid: "الرجاء إدخال رقم هاتف صحيح",
        password_required: "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل",
        confirm_password_required: "الرجاء تأكيد كلمة المرور",
        passwords_mismatch: "كلمات المرور غير متطابقة",
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
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await axios.post('/api/register', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        userPlatform: "DASHBOARD",

        password: data.password
      });

      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error(t.error);
        return;
      }

      toast.success(t.success);
      setIsSubmitted(true);
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error(t.error);
      axiosErrorHandler(error)
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
        <Image
          src={MansourLogo}
          alt="Mansour Logo"
          width={200}
          height={200}
          className="mb-6 rounded-lg"
        />
        <Button
          onClick={() => router.push('/auth/signin')}
          className="w-full bg-primary hover:bg-primary/90 transition-colors"
          variant="default"
        >
          {t.sign_in}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-md mx-auto"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t.subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">{t.name}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.name}
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
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
                <FormLabel className="text-gray-700 dark:text-gray-300">{t.email}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.email}
                    type="email"
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
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
                <FormLabel className="text-gray-700 dark:text-gray-300">{t.phone}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.phone}
                    type="tel"
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                  {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">{t.password}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.password}
                      type="password"
                      {...field}
                      disabled={loading}
                      className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                    {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">{t.confirmPassword}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.confirmPassword}
                      type="password"
                      {...field}
                      disabled={loading}
                      className={`dark:bg-slate-700 ${fieldState.error ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                    {fieldState.error && t.validation_messages[fieldState.error.message as keyof typeof t.validation_messages]}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={loading}
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

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {t.already_have_account}{' '}
            <Link
              href="/auth/sign-in" 
              className="text-primary hover:underline"
            >
              {t.login}
            </Link>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignUpForm;