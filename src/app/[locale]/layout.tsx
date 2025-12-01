import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import "./globals.css";

import { Metadata } from "next";
import { NextAuthProvider } from "../providers/SessionProvider/SessionProvider";
import ReduxProvider from "../providers/ReduxProvider";
import { ToasterProvider } from "../providers/ToastProvider/ToasterProvider";
import { ProvidersTheme } from "../providers/ThemeProvider";
import localfont from "next/font/local";


const myFont = localfont({ src: "../../fonts/Cairo-Medium.ttf" });

export const metadata: Metadata = {
  // metadataBase: new URL("https://markup.vip"),
  title: {
    default: "Qasr Alsultan",
    template: "%s | Qasr Alsultan",
  },
  icons: {
    icon: [
      { url: "/icons/qasr-alsutan-logo.png", sizes: "32x32" },
      { url: "/icons/qasr-alsutan-logo.png", sizes: "16x16" },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  // Ensure that the incoming `locale` is valid

  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const currentLocale = locale ?? "ar"; // default to Arabic

  return (
    <html
      lang={currentLocale}
      dir={currentLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`bg-[#FBFBFB] dark:bg-slate-900 ${myFont.className}`}>
        <NextAuthProvider>
          <NextIntlClientProvider messages={messages}>
            <ReduxProvider>
              <ToasterProvider />
              <ProvidersTheme>{children}</ProvidersTheme>
            </ReduxProvider>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
