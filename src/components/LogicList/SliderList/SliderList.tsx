// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import { LottieHandler } from '../../Feedback/LottiHandler/LottiHandler';

// type SliderListProps<T> = {
//   records?: T[];
//   renderItem: (itemData: T) => React.ReactNode;
//   emptyMessage: string;

// };

// type HasId = { id: number };

// const SliderList = <T extends HasId>({
//   records = [],
//   renderItem,
//   emptyMessage
  
// }: SliderListProps<T>): JSX.Element => {
//   return (
//     <Swiper
//       modules={[Navigation, Pagination, A11y, Autoplay]}
//       spaceBetween={20}
//       slidesPerView={4}
//       navigation
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 5000 }} // Optional: adds autoplay with 5 seconds delay
//       className='container'
//       breakpoints={{
//         1024: {
//           slidesPerView: 4,
//         },
//         600: {
//           slidesPerView: 2,
//         },
//         480: {
//           slidesPerView: 1,
//         }
//       }}
//     >
//       {records.length > 0 ? (
//         records.map((itemData) => (
//           <SwiperSlide key={itemData.id}>
//             {renderItem(itemData)}
//           </SwiperSlide>
//         ))
//       ) : (
//         <SwiperSlide>
//           <div>
//           <LottieHandler type="empty" message={emptyMessage} />
//           </div>
//         </SwiperSlide>
//       )}
//     </Swiper>
//   );
// };

// export default SliderList;
