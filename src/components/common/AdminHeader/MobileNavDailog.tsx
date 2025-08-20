"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";

import MainNav from "../MainNav/MainNav";
import { HiViewGrid } from "react-icons/hi";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <span
        className="flex flex-col justify-center items-center gap-1 lg:hidden text-[22px] "
        onClick={onOpen}
      >
        <HiViewGrid />
        <span className="text-[10px] font-semibold">All</span>
      </span>

      <Dialog
        open={open}
        as="div"
        className="relative z-20 lg:hidden"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25">
          <DialogPanel className="relative ml-auto flex h-full w-full max-w-[15rem] flex-col overflow-auto bg-white py-4 pb-6 shadow-xl">
            <div className="container flex items-center justify-end px-4">
              <span className="cursor-pointer">
                <X className="" size={15} onClick={onClose} />
              </span>
            </div>

            <div className="container">
              <div className="lg:flex items-center ">
                <MainNav className="flex flex-col items-start gap-5" />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileNav;
