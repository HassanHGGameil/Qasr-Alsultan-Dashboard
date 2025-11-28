"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { THero } from "./heroType";

interface ProductCardProps {
  imagesData: THero;
}

const HeroImages = ({ imagesData }: ProductCardProps) => {
  const { heroImages } = imagesData;

  const containerRef = useRef<HTMLDivElement | null>(null);

  // MAIN IMAGE STATE
  const [selectedImage, setSelectedImage] = useState(
    heroImages?.[0]?.url ?? ""
  );

  // CLICK HANDLER
  const handleFilter = (imgUrl: string) => {
    setSelectedImage(imgUrl);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* BACKGROUND PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] bg-red-900 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.45}s`,
            }}
          ></div>
        ))}
      </div>

      {/* MAIN CENTER IMAGE */}
      <div
        className="
          relative rounded-full p-4
          bg-gradient-to-br 
          from-red-600 via-red-800 to-red-900 
          dark:from-red-800 dark:via-red-900 dark:to-black
          shadow-[0_0_80px_rgba(255,140,100,0.45)]
          w-[260px] xs:w-[310px] sm:w-[360px] md:w-[420px]
          h-[260px] xs:h-[310px] sm:h-[360px] md:h-[420px]
          transform-gpu
        "
      >
        <Image
          src={selectedImage}
          alt="Center"
          fill
          className="
            rounded-full object-cover 
            border-[8px] border-red-900/40 dark:border-red-900/50
            shadow-[inset_0_0_60px_rgba(0,0,0,0.65)]
          "
        />
      </div>

      {/* Ambient Glow */}
      <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle,rgba(255,210,100,0.28),transparent)] blur-3xl" />

      {/* Pulsing Rings */}
      <div className="absolute w-[90%] h-[90%] rounded-full border border-red-500/20 animate-pulse-slow"></div>
      <div className="absolute w-[110%] h-[110%] rounded-full border border-red-400/20 animate-pulse-slower"></div>

      {/* ORBIT IMAGES */}
      {heroImages.map((img, i) => (
        <div
          key={img.url ?? i}
          onClick={() => handleFilter(img.url)}
          className="
            absolute animate-[orbit_20s_linear_infinite]
            transform-gpu cursor-pointer
          "
          style={{
            animationDelay: `${i * 4}s`,
          }}
        >
          <div
            className={`
              group flex items-center justify-center
              w-[68px] xs:w-[72px] sm:w-[70px] md:w-[100px]
              h-[68px] xs:h-[72px] sm:h-[70px] md:h-[100px]
              rounded-xl overflow-hidden
              transition-all duration-300
              bg-red-900 dark:bg-red-950 
              ${
                selectedImage === img.url
                  ? "scale-125 border-2 border-yellow-500 dark:border-yellow-500 shadow-[0_0_20px_rgba(255,210,200,0.9)] dark:shadow-[0_0_40px_rgba(255,130,80,0.8)]"
                  : "opacity-80 hover:scale-110"
              }
            `}
          >
            <Image
              src={img.url}
              alt={`Orbit ${i}`}
              width={200}
              height={200}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroImages;
