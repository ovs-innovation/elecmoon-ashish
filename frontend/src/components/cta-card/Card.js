import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import { ctaCardData } from "@utils/data";

const Card = () => {
  return (
    <>
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
                <Link href="/contact-us">
                  <button className="text-xs mx-auto leading-6 font-serif font-medium mt-3 md:mt-4 px-4 py-1 bg-gradient-to-r from-[#051124] to-[#0b1d3d] hover:from-[#0b1d3d] hover:to-[#162542] text-center rounded-full text-white shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-200">
                    Enquire Now
                  </button>
                </Link>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Card;
