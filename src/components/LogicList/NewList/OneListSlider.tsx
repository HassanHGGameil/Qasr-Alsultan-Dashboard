import React, { useRef, useState, useEffect, JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

type SliderListProps<T> = {
  records?: T[];
  renderItem: (itemData: T) => React.ReactNode;
  emptyMessage: string;
};

type HasId = { id: string };

const OneListSlider = <T extends HasId>({
  records = [],
  renderItem,
  emptyMessage,
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
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={false}
        speed={900}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="w-full h-full"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setInit(true)}
        onSlideChange={handleSlideChange}
      >
        {records.length > 0 ? (
          records.map((itemData) => (
            <SwiperSlide key={itemData.id}>{renderItem(itemData)}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>{emptyMessage}</div>
          </SwiperSlide>
        )}
      </Swiper>

      <div
        className={`md:block w-full absolute top-[40%] z-10 px-4 ${
          isHovered
            ? "opacity-100 transition-opacity duration-700 ease-in-out"
            : "opacity-70 transition-opacity duration-700 ease-in-out"
        }`}
      >
        <div
          ref={prevRef}
          className={`p-2 lg:p-3 rounded-full ${
            isAtBeginning ? "bg-black/70 text-white" : "bg-[#F6AA02] text-black"
          } cursor-pointer shadow-sm absolute -left-1 lg:-left-4`}
        >
          <HiChevronLeft />
        </div>
        <div
          ref={nextRef}
          className={`p-2 lg:p-3 rounded-full ${
            isAtEnd ? "bg-black/70 text-white" : "bg-[#F6AA02] text-black"
          } cursor-pointer shadow-sm absolute right-1 lg:-right-4`}
        >
          <HiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default OneListSlider;
