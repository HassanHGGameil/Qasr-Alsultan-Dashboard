"use client";

import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import { THero } from "./heroType";


interface HeroCardProps {
  bgImages: THero;
}

const HeroBanner = ({bgImages}: HeroCardProps) => {

  const {bgOne, bgTwo} = bgImages

  
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

export default HeroBanner;
