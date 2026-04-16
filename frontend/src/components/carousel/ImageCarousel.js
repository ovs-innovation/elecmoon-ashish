import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5"; // requires a loader
import { Autoplay, Controller, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { FiPlay } from "react-icons/fi";

const ImageCarousel = ({ images, videoUrl, handleChangeImage, handleSelectVideo }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <Swiper
        spaceBetween={1}
        navigation={true}
        allowTouchMove={false}
        loop={false} // Disable loop to keep video at the start/end predictably
        autoplay={false} // Disable autoplay for carousel with video
        slidesPerView={4}
        modules={[Navigation, Pagination, Controller]}
        className="mySwiper image-carousel"
      >
        {videoUrl && (
          <SwiperSlide className="group">
            <button 
              onClick={handleSelectVideo}
              className="relative border inline-flex items-center justify-center px-3 py-1 mt-2 w-[135px] h-[100px] bg-gray-100 overflow-hidden"
            >
              {images?.[0] ? (
                <Image
                  src={images[0]}
                  alt="video thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-50"
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-red-600 rounded-full p-2 text-white shadow-lg">
                    <FiPlay size={20} />
                 </div>
              </div>
            </button>
          </SwiperSlide>
        )}
        {images?.map((img, i) => (
          <SwiperSlide key={i + 1} className="group">
            <button onClick={() => handleChangeImage(img)}>
              <Image
                className="border inline-flex items-center justify-center px-3 py-1 mt-2"
                src={img}
                alt="product"
                width={135}
                height={100} 
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default dynamic(() => Promise.resolve(ImageCarousel), { ssr: false });
