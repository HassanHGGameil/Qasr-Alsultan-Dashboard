// import React, { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Autoplay,
// } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import { LottieHandler } from "../../Feedback/LottiHandler/LottiHandler";
// import {
//   HiChevronLeft,
//   HiChevronRight,
// } from "react-icons/hi";

// type SliderListProps<T> = {
//   records?: T[];
//   renderItem: (itemData: T) => React.ReactNode;
//   emptyMessage: string;
// };

// type HasId = { id: number };

// const BannerSliderList = <T extends HasId>({
//   records = [],
//   renderItem,
//   emptyMessage,
// }: SliderListProps<T>): JSX.Element => {
//   const [init, setInit] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAtBeginning, setIsAtBeginning] = useState(true);
//   const [isAtEnd, setIsAtEnd] = useState(false);

//   const prevRef = useRef<HTMLDivElement>(null);
//   const nextRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (init) {
//       setInit(false);
//     }
//   }, [init]);

//   const handleSlideChange = (swiper: any) => {
//     setIsAtBeginning(swiper.isBeginning);
//     setIsAtEnd(swiper.isEnd);
//   };

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Swiper
//         modules={[Pagination, Navigation, Autoplay]}
//         spaceBetween={30}
//         slidesPerView={1}
//         // pagination={{ clickable: false }}
//         autoplay={{ delay: 4000 }}
//         className="w-full h-full"
//         navigation={{
//           prevEl: prevRef.current,
//           nextEl: nextRef.current,
//         }}
//         onInit={() => setInit(true)}
//         onSlideChange={handleSlideChange}
//       >
//         {records.length > 0 ? (
//           records.map((itemData) => (
//             <SwiperSlide key={itemData.id}>{renderItem(itemData)}</SwiperSlide>
//           ))
//         ) : (
//           <SwiperSlide>
//             <div>
//               <LottieHandler type="empty" message={emptyMessage} />
//             </div>
//           </SwiperSlide>
//         )}
//       </Swiper>

//       <div
//         className={` md:block w-full absolute top-[40%] z-10 px-4  ${
//           isHovered
//             ? "opacity-100 transition-opacity duration-300 ease-in-out"
//             : "opacity-70 transition-opacity duration-300 ease-in-out"
//         }`}
//       >
//         <div
//           ref={prevRef}
//           className={`p-2 lg:p-3 rounded-full  ${
//             isAtBeginning ? "bg-black/70 text-white" : "bg-primary text-white"
//           } cursor-pointer shadow-sm absolute -left-4`}
//         >
//           <HiChevronLeft className="text-[19px]" />
//         </div>
//         <div
//           ref={nextRef}
//           className={`p-2 lg:p-3 rounded-full text-[16px] ${
//             isAtEnd ? "bg-black/70 text-white" : "bg-primary text-white"
//           } cursor-pointer shadow-sm absolute -right-4`}
//         >
//           <HiChevronRight className="text-[19px]" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BannerSliderList;
