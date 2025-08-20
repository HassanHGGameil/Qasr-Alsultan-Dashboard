"use client";
import { ImageType } from "@/lib/Dtos/dtos"; 
import { cn } from "@/lib/utils"; 
import { Tab } from "@headlessui/react";
import Image from "next/image";

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div className="">
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <Image
              fill
              src={image.url}
              alt=""
              className="object-cover object-center"
            />

            <span
              className={cn(
                "a absolute insted-0 rounded-md ",
                selected ? "" : "",
              )}
            ></span>
          </span>
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
