"use client"
import React, { useRef, useState, useEffect, JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SliderListProps<T extends Record<string, any>> = {
  records?: T[];
  renderItem: (itemData: T) => React.ReactNode;
  emptyMessage: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewList = <T extends Record<string, any>>({
  records = [],
  renderItem,
}: SliderListProps<T>): JSX.Element => {
  const [init, setInit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setIsAtBeginning(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  return (
    <div
    dir="ltr"
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={2}
        spaceBetween={10}
        speed={900}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          440: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          // Tablet (768px and up)
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          // Large tablet (900px and up)
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // Desktop (1024px and up)
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          // Large desktop (1200px and up)
          1200: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          // Extra large desktop (1400px and up)
          1400: {
            slidesPerView: 5,
            spaceBetween: 24,
          }
          
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setInit(true)}
        onSlideChange={handleSlideChange}
      >
        {records.length > 0 ? (
          records.map((itemData) => (
            <SwiperSlide key={itemData.slug}>{renderItem(itemData)}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>
              thre is now category
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <div
        className={` container  md:block w-full absolute top-[40%] z-10 px-4  ${
          isHovered
            ? "opacity-100 transition-opacity duration-300 ease-in-out"
            : "opacity-70 transition-opacity duration-300 ease-in-out"
        }`}
      >
        <div
          ref={prevRef}
          className={`p-2  lg:p-3 rounded-full  ${
            isAtBeginning ? "bg-black/70 text-white" : "bg-[#F6AA02] text-black"
          } cursor-pointer shadow-sm absolute -left-1 lg:-left-4`}
        >
          <HiChevronLeft />
        </div>
        <div
          ref={nextRef}
          className={`p-2 lg:p-3 rounded-full ${
            isAtEnd ? "bg-black/70 text-white" : "bg-[#F6AA02] text-black"
          } cursor-pointer shadow-sm absolute right-1  lg:-right-4`}
        >
          <HiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default NewList;
