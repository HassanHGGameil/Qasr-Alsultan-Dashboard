"use client";
import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ImageType } from "@/lib/Dtos/dtos"; 

interface GalleryProps {
  images?: ImageType[];
  imageUrl?: string;
  Alt? : string;
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, imageUrl, className, Alt }) => {
  // Ensure we have either images or imageUrl, and handle the id requirement
  const allImages = imageUrl 
    ? [{ url: imageUrl, id: "single-image" }] 
    : images || [];

  if (!allImages.length) {
    return <p className="text-center text-gray-500">No images available</p>;
  }

  return (
    <TabGroup as="div" className={`flex flex-col md:flex-row gap-4 lg:gap-6 ${className}`}>
  {/* Thumbnail List - Vertical on desktop, horizontal scroll on mobile */}
  <TabList className="flex flex-row md:flex-col gap-3 overflow-x-auto py-2 md:overflow-x-visible md:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
    {allImages.map((image, index) => (
      <Tab
        key={image.id ?? index}
        className="p-4  rounded-lg transition-all"
        aria-label={`View image ${index + 1}`}
      >
        {({ selected }) => (
          <div
            className={`relative h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden  ${
              selected
                ? "  scale-105 shadow-md"
                : "opacity-90 hover:opacity-100 hover:scale-102 border border-gray-100 dark:border-gray-700"
            }`}
          >
            <Image
              src={image.url}
              alt={`${Alt}`}
              fill
              className="object-cover object-center"
              sizes="80px"
              quality={70}
              loading={index > 2 ? "lazy" : "eager"}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/fallback-image.jpg";
                (e.target as HTMLImageElement).className = "object-contain p-1 bg-gray-100";
              }}
            />
            {selected && (
              <div className="absolute inset-0 bg-black dark:bg-white dark:bg-opacity-40  bg-opacity-10" />
            )}
          </div>
        )}
      </Tab>
    ))}
  </TabList>

  {/* Main Image Display with enhanced controls */}
  <div className="relative flex-1">
    <TabPanels className="relative aspect-square w-full h-auto max-h-[80vh] rounded-xl overflow-hidden shadow-xl bg-gray-50 dark:bg-slate-800">
      {allImages.map((image, index) => (
        <TabPanel
          key={image.id ?? index}
          className="relative w-full h-full flex items-center justify-center"
          aria-label={`Gallery image ${index + 1}`}
          aria-live="polite"
        >
          <Image
            src={image.url}
            alt={`${Alt}`}
            fill
            className="object-contain object-center transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
            quality={90}
            priority={index === 0}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/fallback-image.jpg";
              (e.target as HTMLImageElement).className = "object-contain p-4 bg-gray-100";
            }}
          />
        </TabPanel>
      ))}
    </TabPanels>

    
  </div>
</TabGroup>
  );
};

export default Gallery;