import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//internal import
import { ctaCardData } from "@utils/data";

const CardSlider = () => {
  // Add custom styles for pagination dots
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .mySwiper .swiper-pagination {
        position: relative !important;
        margin-top: 16px !important;
        bottom: auto !important;
      }
      .mySwiper .swiper-pagination-bullet {
        background: #EF4036 !important;
        opacity: 0.3 !important;
        width: 8px !important;
        height: 8px !important;
        margin: 0 4px !important;
      }
      .mySwiper .swiper-pagination-bullet-active {
        opacity: 1 !important;
        background: #EF4036 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Mobile Slider View */}
      <div className="block md:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              spaceBetween: 16,
              slidesPerView: 1,
            },
            375: {
              spaceBetween: 20,
              slidesPerView: 1,
            },
            414: {
              spaceBetween: 20,
              slidesPerView: 1,
            },
          }}
        >
          {ctaCardData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full max-w-sm mx-auto relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl">
                <Link href={item.url} className="block">
                  <div className="relative w-full h-48 sm:h-52">
                    <Image
                      fill
                      src={item.image}
                      alt={item.title}
                      priority
                      className="object-cover"
                      sizes="(max-width: 375px) 360px, (max-width: 414px) 400px, 450px"
                    />
                  </div>
                  <div className="absolute top-0 left-0 z-10 p-3 flex-col flex w-full h-full text-center justify-center">
                    <div className="pt-1">
                      <h2 className="font-serif text-sm font-semibold text-gray-600">
                        {item.title} <br />
                        <span className="text-base font-bold text-black">
                          {item.subTitle}
                        </span>
                      </h2>
                      <p className="text-xs font-sans text-gray-500 mt-1">
                        Best prices, limited time
                      </p>
                      {/* <Link href="/contact-us">
                        <button className="text-xs mx-auto leading-6 font-serif font-medium mt-2 px-3 py-1 bg-green-500 text-center rounded-full text-white hover:bg-green-600 transition-colors duration-200">
                          Enquire Now
                        </button>
                      </Link> */}
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 2xl:gap-6">
        {ctaCardData.map((item) => (
          <div
            key={item.id}
            className="w-full relative rounded-lg overflow-hidden transition ease-out duration-400 delay-150 transform hover:shadow-xl"
          >
            <Link href={item.url} className="block">
              <div className="relative w-full h-56 md:h-60 lg:h-64">
                <Image
                  fill
                  src={item.image}
                  alt={item.title}
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="absolute top-0 left-0 z-10 p-4 md:p-6 lg:p-8 flex-col flex w-full h-full text-center justify-center">
                <div className="pt-2 md:pt-4">
                  <h2 className="font-serif text-base md:text-lg lg:text-lg font-semibold text-gray-600">
                    {item.title} <br />
                    <span className="text-lg md:text-xl lg:text-2xl font-bold text-black">
                      {item.subTitle}
                    </span>
                  </h2>
                  <p className="text-sm font-sans text-gray-500 mt-1">
                    Best prices, limited time
                  </p>
                  {/* <Link href="/contact-us">
                    <button className="text-xs mx-auto leading-6 font-serif font-medium mt-3 md:mt-4 px-4 py-1 bg-green-500 text-center rounded-full text-white hover:bg-green-600 transition-colors duration-200">
                      Enquire Now
                    </button>
                  </Link> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardSlider;
