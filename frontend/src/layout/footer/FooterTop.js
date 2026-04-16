import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";

const FooterTop = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  return (
    <div
      id="downloadApp"
      className="bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
          <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
            <Image
              src={
                storeCustomizationSetting?.home?.daily_need_img_left ||
                "/app-download-img-left.png"
              }
              alt="app download"
              width={500}
              height={394}
              priority
              className="block w-auto"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
              <CMSkeleton
                count={1}
                height={30}
                loading={loading}
                data={storeCustomizationSetting?.home?.daily_need_title}
              />
            </h3>
            <p className="text-base opacity-90 leading-7">
              <CMSkeleton
                count={5}
                height={10}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.daily_need_description}
              />
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={`${
                  storeCustomizationSetting?.home?.brochure_link ||
                  "/brochure.pdf"
                }`}
                className="inline-flex items-center px-6 py-3 bg-[#EF4036] text-white font-semibold rounded-lg hover:bg-[#C53030] transition-colors duration-300 transform hover:scale-105"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Brochure
              </Link>
            </div>
            {/* <div className="mt-8 flex">
              <Link
                href={`${storeCustomizationSetting?.home?.daily_need_app_link}`}
                className="mx-2"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  // width={170}
                  // height={50}
                  // className="mr-2 rounded"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                  src={
                    storeCustomizationSetting?.home?.button1_img ||
                    "/app/app-store.svg"
                  }
                  alt="app store"
                />
              </Link>
              <Link
                href={`${storeCustomizationSetting?.home?.daily_need_google_link}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  // width={170}
                  // height={50}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto"
                  src={
                    storeCustomizationSetting?.home?.button2_img ||
                    "/app/play-store.svg"
                  }
                  alt="play store"
                />
              </Link>
            </div> */}
          </div>
          <div className="md:hidden lg:block">
            <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
              <Image
                src={
                  storeCustomizationSetting?.home?.daily_need_img_right ||
                  "/app-download-img.png"
                }
                width={500}
                height={394}
                priority
                alt="app download"
                className="block w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
