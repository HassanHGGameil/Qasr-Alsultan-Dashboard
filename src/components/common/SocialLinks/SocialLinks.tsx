import React from "react";

import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import Link from "../Link";

const links = [
  {
    id: crypto.randomUUID(),
    title: "Facebook",
    href: `https://www.facebook.com/share/1A53PrkBSG/`,
    iconLink: <FaFacebookF />,
  },
  {
    id: crypto.randomUUID(),
    title: "Instagram",
    href: `https://www.instagram.com/asasy.market?igsh=bG8zMnNnYW5qaGM1`,
    iconLink: <FaInstagram />,
  },

  {
    id: crypto.randomUUID(),
    title: "Tiktok",
    href: `https://www.tiktok.com/@asasy.market?_t=ZS-8tseXmOb0hE&_r=1`,
    iconLink: <FaTiktok />,
  },

  {
    id: crypto.randomUUID(),
    title: "Whatsapp",
    iconLink: <FaWhatsapp />,

    href: `https://wa.me/+201204999930`,
  },
];

function SocialLinks() {
  return (
    <div className="flex gap-4">
      {links.map((items) => (
        <Link href={`${items.href}`} key={items.id} target="_blank">
          <div className="bg-white text-slate-900 hover:text-white  h-6 w-6 shadow-sm text-base rounded-md flex items-center justify-center footer-icons hover:bg-[#FFD500]  hover:-translate-y-1 hover:transition-all duration-300">
            <span className="text-sm">{items.iconLink}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SocialLinks;
