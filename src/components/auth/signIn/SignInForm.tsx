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
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import MansourLogo from "../../../../public/icons/qasr-alsutan-logo.png";
import Image from "next/image";
import { axiosErrorHandler } from "@/utils";
import { useRouter } from "@/i18n/routing";
import Link from "@/components/common/Link";

const formSchema = z.object({
  email: z.string().email({ message: "email_invalid" }),
  password: z.string().min(1, { message: "password_required" }),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const router = useRouter();
    const { data: session } = useSession();

     const role = session?.user?.role;
  



  const translations = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
      email: "Email",
      password: "Password",
      submit: "Sign In",
      sending: "Signing in...",
      no_account: "Don't have an account?",
      sign_up: "Sign Up",
      forgot_password: "Forgot password?",
      validation_messages: {
        email_invalid: "Please enter a valid email",
        password_required: "Password is required",
      },
      errors: {
        invalid_credentials: "Invalid email or password",
        default: "Failed to sign in. Please try again.",
      },
    },
    ar: {
      title: "مرحباً بعودتك",
      subtitle: "سجل الدخول إلى حسابك",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      submit: "تسجيل الدخول",
      sending: "جاري تسجيل الدخول...",
      no_account: "ليس لديك حساب؟",
      sign_up: "إنشاء حساب",
      forgot_password: "نسيت كلمة المرور؟",
      validation_messages: {
        email_invalid: "الرجاء إدخال بريد إلكتروني صحيح",
        password_required: "كلمة المرور مطلوبة",
      },
      errors: {
        invalid_credentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        default: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
      },
    },
  };

  const t = translations[locale as keyof typeof translations];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
  try {
    setLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: `/`,
    });

    if (result?.error) {
      const message =
        result.error === "CredentialsSignin"
          ? t.errors.invalid_credentials
          : t.errors.default;
      toast.error(message);
      return;
    }

    if (result?.ok) {
      // Redirect based on role
      if (role === "USER") {
        await router.push(`/`);
      } else {
        await router.push(`/dashboard`);
      }
      // router.refresh(); // Optional, remove if not needed
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error?.response?.data?.message || t.errors.default;
    toast.error(message);
    axiosErrorHandler(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
    >
      <div className="mb-8 text-center">
        <Image
          src={MansourLogo}
          alt="Mansour Logo"
          width={150}
          height={150}
          className="mx-auto mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t.subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  {t.email}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.email}
                    type="email"
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${
                      fieldState.error
                        ? "border-red-500 dark:border-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                  {fieldState.error &&
                    t.validation_messages[
                      fieldState.error
                        .message as keyof typeof t.validation_messages
                    ]}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  {t.password}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.password}
                    type="password"
                    {...field}
                    disabled={loading}
                    className={`dark:bg-slate-700 ${
                      fieldState.error
                        ? "border-red-500 dark:border-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-sm">
                  {fieldState.error &&
                    t.validation_messages[
                      fieldState.error
                        .message as keyof typeof t.validation_messages
                    ]}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              {t.forgot_password}
            </Link>
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
            {t.no_account}{" "}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              {t.sign_up}
            </Link>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignInForm;
