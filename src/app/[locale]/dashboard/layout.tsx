"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";

import AdminSidebar from "@/components/common/AdminHeader/AdminSideBar";
import Header from "@/components/common/Header";
import { useRouter } from "@/i18n/routing";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session?.user) {
      router.push("/auth/sign-in");
    }

  
  

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex w-full min-h-screen">
        <aside className="hidden lg:block w-72 border-r bg-card">
          <AdminSidebar />
        </aside>

        <section className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </section>
      </div>
    </main>
  );
}
