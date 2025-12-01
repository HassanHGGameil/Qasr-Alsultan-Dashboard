import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/common/Heading/Heading";
import Link from "@/components/common/Link";
import { Image as ImageIcon } from "lucide-react";
import React from "react";
import { HiOutlineCreditCard, HiOutlineTag } from "react-icons/hi2";

const MenuPage = async () => {
  const currentUser = await getCurrentUser();

  const isManager = ["OWNER", "MANAGER", "ADMIN"].includes(
    currentUser?.role ?? ""
  );

  if (!isManager) {
    return (
      <main className="min-h-screen py-10 flex justify-center items-center">
        <div className="p-6 bg-blue-50 border border-blue-300 rounded-xl text-blue-700 max-w-md text-center">
          <p className="text-lg font-medium">
            You do not have access to this page.
          </p>
          <p className="text-sm opacity-75 mt-1">
            Contact your admin if you believe this is a mistake.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <section className="container w-full space-y-10">
        {/* Header */}
        <Heading
          title="Manage Home Page"
          description="Control the sections displayed on your store homepage"
        />

        {/* ============================= */}
        {/*       HOME MAIN SECTIONS      */}
        {/* ============================= */}
        <div className="p-6 rounded-xl border shadow-sm bg-white space-y-5">
          <h3 className="text-lg font-semibold">Home Page Sections</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Hero Section */}
            <Link
              href="/dashboard/hero/6923ec7e8b9407d22a84dff3"
              className="p-5 bg-primary/5 border rounded-lg flex flex-col gap-3 hover:bg-primary/10 transition"
            >
              <ImageIcon className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-semibold">Hero Section</h4>
                <p className="text-sm text-muted-foreground">
                  Update homepage banners & main images.
                </p>
              </div>
            </Link>

            {/* Best Sellers */}
            <Link
              href={`/dashboard/sections/mainSection/692be03e152fe9fedb14152a`}
              className="p-5 bg-primary/5 border rounded-lg flex flex-col gap-3 hover:bg-primary/10 transition"
            >
              <HiOutlineCreditCard className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-semibold">Home Last Section </h4>
                <p className="text-sm text-muted-foreground">
                  Edite Last Section.
                </p>
              </div>
            </Link>

            {/* Featured Section */}
            <Link
              href={`/dashboard/sections/banner`}
              className="p-5 bg-primary/5 border rounded-lg flex flex-col gap-3 hover:bg-primary/10 transition"
            >
              <HiOutlineTag className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-semibold">Home Banner</h4>
                <p className="text-sm text-muted-foreground">
                  Edite Home Banner
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* ============================= */}
        {/*        PRODUCT SECTIONS       */}
        {/* ============================= */}
      </section>
    </main>
  );
};

export default MenuPage;
