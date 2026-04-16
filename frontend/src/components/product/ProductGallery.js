import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

const ProductGallery = ({ images, title, description }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-xl border border-gray-100">
        <span className="text-gray-400 text-sm">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image Swiper */}
      <div className="relative group bg-white rounded-xl border border-gray-100 p-2 md:p-4 overflow-hidden">
        <div className="relative w-full overflow-hidden" style={{ paddingTop: '100%' }}>
            <div className="absolute inset-0">
                <Swiper
                style={{
                    "--swiper-navigation-color": "#A821A8",
                    "--swiper-pagination-color": "#A821A8",
                    height: '100%',
                    width: '100%'
                }}
                spaceBetween={10}
                navigation={false}
                pagination={{
                    clickable: true,
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="w-full h-full product-main-swiper"
                >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center bg-white h-full">
                    {img && (
                        <div className="relative w-full h-full">
                        <Image
                            src={img}
                            alt={`${title} - image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                            priority={index === 0}
                        />
                        </div>
                    )}
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
      </div>

      {/* Pagination dots spacing (dots are actually inside the swiper but we want them to look like the screenshot) */}
      {/* The screenshot shows dots below the main image, then thumbnails below that. */}
      {/* Swiper pagination is typically inside. To make it outside, we can use a custom pagination container or just adjust CSS. */}

      {/* Thumbnails Swiper */}
      {images.length > 1 && (
        <div className="relative px-8 mt-2">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="product-thumbs-swiper h-20 md:h-24"
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
                320: { slidesPerView: 3, spaceBetween: 8 },
                640: { slidesPerView: 4, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 10 }
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="cursor-pointer h-full">
                <div className="relative h-full w-full rounded-lg border-2 border-gray-100 overflow-hidden transition-all bg-white shadow-sm p-1 hover:border-[#A821A8]">
                  <Image
                    src={img}
                    alt={`${title} thumb ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-contain p-1"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Arrows */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-[#A821A8] z-10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-[#A821A8] z-10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Description text for Quick View as per screenshot */}
      {description && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Description</h3>
          <div 
            className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      <style jsx global>{`
        .product-main-swiper .swiper-pagination {
          position: absolute !important;
          bottom: 10px !important;
        }
        .product-main-swiper .swiper-pagination-bullet {
          background: #e5e7eb !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
          transition: all 0.3s ease;
        }
        .product-main-swiper .swiper-pagination-bullet-active {
          background: #A821A8 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        .product-thumbs-swiper .swiper-slide-thumb-active > div {
          border-color: #A821A8 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductGallery;
