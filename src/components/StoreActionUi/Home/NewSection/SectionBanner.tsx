"use client";

import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import { TSection } from "./sectionType";

interface SectionCardProps {
  bgImages: TSection;
}

const SectionBanner = ({ bgImages }: SectionCardProps) => {
  const { bgOne, bgTwo } = bgImages;

  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={theme === "dark" ? bgTwo : bgOne}
        alt="Mansour Sweet Bakery Background"
        fill
        priority
        quality={80}
        className="object-cover object-center"
        sizes="100vw"
      />
    </div>
  );
};

export default SectionBanner;
