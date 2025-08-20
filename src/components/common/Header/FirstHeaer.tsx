import React from "react";
import SocialLinks from "../SocialLinks/SocialLinks";
import Link from "../Link";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { SlPhone } from "react-icons/sl";

function FirstHeaer() {
  return (
    <div
      dir={`ltr`}
      className=" bg-[#edebe4] dark:bg-gray-800  pb-2 pt-2 flex flex-col items-center justify-center "
    >
      <div className="container ">
        <div className="flex items-center justify-center  lg:justify-between">
          <div className="hidden lg:block">
            <div className="flex items-center  text-xs gap-3">
              <Link
                className="flex items-center hover:text-blue-400 gap-2"
                href={`tel:${`0020502770996`.replace(/\D/g, "")}`}
              >
                <SlPhone />
                <span className="">0020502770996</span>
              </Link>{" "}
              |{" "}
              <Link
                className="flex items-center hover:text-blue-400 gap-2"
                href={`mailto:${`mansoursweetinfo@gmail.com`}`}
              >
                <MdOutlineMarkEmailRead />
                <span className=""> mohamedsherifinfo@gmail.com</span>
              </Link>
            </div>
          </div>

          <div className="">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstHeaer;
