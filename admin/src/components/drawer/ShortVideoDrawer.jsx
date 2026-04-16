import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

// internal import
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import DrawerButton from "@/components/form/button/DrawerButton";
import useShortVideoSubmit from "@/hooks/useShortVideoSubmit";

const ShortVideoDrawer = ({ id }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
    products,
  } = useShortVideoSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? "Update Short Video" : "Add Short Video"}
          description={id ? "Edit your video details" : "Add a new short video to your home page"}
        />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            {/* Title */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Title" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="Video Title (e.g. Transformer Shorts)"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            {/* Video URL */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Video URL" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="URL"
                  name="videoUrl"
                  type="text"
                  placeholder="YouTube Short Link (e.g. https://www.youtube.com/shorts/...)"
                />
                <Error errorName={errors.videoUrl} />
                <p className="text-[10px] text-gray-500 mt-1">Tip: Use vertical YouTube Shorts or Reels links.</p>
              </div>
            </div>

            {/* Select Product */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Associated Product" />
              <div className="col-span-8 sm:col-span-4">
                <select
                  {...register("product")}
                  name="product"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#0b1d3d] dark:bg-gray-700 dark:border-gray-500 text-sm"
                >
                  <option value="">Select a Product (Optional)</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title.en || p.title.hi || "Product"}
                    </option>
                  ))}
                </select>
                <Error errorName={errors.product} />
              </div>
            </div>

            {/* Order */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Display Order" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Order"
                  name="order"
                  type="number"
                  placeholder="0"
                />
                <Error errorName={errors.order} />
              </div>
            </div>

            {/* Published */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Published" />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Video" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default ShortVideoDrawer;
