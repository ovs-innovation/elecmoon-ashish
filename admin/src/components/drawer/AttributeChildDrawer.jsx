import React from "react";
import Scrollbars from "react-custom-scrollbars-2";

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import DrawerButton from "@/components/form/button/DrawerButton";
import useAttributeSubmit from "@/hooks/useAttributeSubmit";

const AttributeChildDrawer = ({ id }) => {
  const {
    handleSubmit,
    onSubmits,
    register,
    errors,
    published,
    isSubmitting,
    setPublished,
    handleSelectLanguage,
    hexColor,
    setHexColor,
    isColorAttribute,
  } = useAttributeSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title="Add/Update Attribute Value"
            description="Add your attribute values and necessary information from here"
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title="Add/Update Attribute Values"
            description="Add your attribute values and necessary information from here"
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmits)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
              <LabelArea label="Display Name" />

              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Display Name"
                  name="name"
                  type="text"
                  placeholder="Color or Size or Dimension or Material or Fabric"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            {/* Color Picker - Only show for Color attributes */}
            {isColorAttribute && (
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
                <LabelArea label="Hex Color" />

                <div className="col-span-8 sm:col-span-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={hexColor || "#000000"}
                      onChange={(e) => setHexColor(e.target.value)}
                      className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <InputArea
                      register={register}
                      label="Hex Color Code"
                      name="hexColor"
                      type="text"
                      value={hexColor || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Validate hex color format
                        if (value === "" || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
                          setHexColor(value);
                        }
                      }}
                      placeholder="#FF0000"
                      className="flex-1"
                    />
                  </div>
                  <Error errorName={errors.hexColor} />
                  {hexColor && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexColor) && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid hex color (e.g., #FF0000)</p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 items-center">
              <LabelArea label="Published" />

              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
                <Error errorName={errors.published} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Attribute" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default AttributeChildDrawer;
