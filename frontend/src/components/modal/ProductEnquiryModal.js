import React from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FiZap } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// internal import
import MainModal from "@components/modal/MainModal";
import InputArea from "@components/form/InputArea";
import LeadServices from "@services/LeadServices";
import useUtilsFunction from "@hooks/useUtilsFunction";

const ProductEnquiryModal = ({ modalOpen, setModalOpen, product, selectedVariant }) => {
  const { showingTranslateValue, getNumberTwo } = useUtilsFunction();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!product) return null;

  const onSubmitEnquiry = async (data) => {
    try {
      const { phoneCountry, phone, ...rest } = data;
      const fullPhone = `${phoneCountry} ${phone}`;
      
      const leadData = {
        ...rest,
        phone: fullPhone,
        product: {
          _id: product._id,
          title: product.title,
          sku: selectedVariant?.sku || product.sku,
          images: product.image,
          prices: product.prices,
          category: product.category,
          description: product.description,
          variant: selectedVariant,
        },
      };

      await LeadServices.addLead(leadData);
      setModalOpen(false);
      toast.success("Thank you for your enquiry! We will contact you soon.");
      reset();
    } catch (error) {
      console.log("error", error);
      toast.error(
        error?.response?.data?.message || "Failed to submit enquiry."
      );
    }
  };

  const productTitle = showingTranslateValue(selectedVariant?.title) || showingTranslateValue(product?.title);
  const productImage = (selectedVariant?.image && selectedVariant.image.length > 0) ? selectedVariant.image[0] : (product?.image?.[0]);
  const productPrice = product?.prices?.price || product?.price || 0;
  const productSKU = selectedVariant?.sku || product.sku || 'N/A';
  const minOrder = product?.minOrderQuantity || 1;
  const productDescription = showingTranslateValue(selectedVariant?.description || product?.description || "").slice(0, 180);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-5xl my-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl relative">
        {/* Internal Close Button */}
        <button 
          onClick={() => setModalOpen(false)}
          className="absolute right-6 top-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-500 transition-all active:scale-90 shadow-lg border border-gray-100"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row min-h-fit lg:h-auto overflow-hidden">
          {/* Left Column: Product Info - Ultra Compact */}
          <div className="w-full lg:w-[35%] bg-gray-50/80 p-5 lg:p-7 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-r border-gray-100">
            <div className="w-28 lg:w-36 h-28 lg:h-36 relative bg-white rounded-xl border border-gray-100 p-2 shadow-sm mb-3">
              {productImage ? (
                <Image
                  src={productImage}
                  alt={productTitle}
                  fill
                  className="object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">⚡</div>
              )}
            </div>

            <div className="w-full h-full">
              <span className="text-[9px] font-black text-[#0b1d3d] uppercase tracking-[0.2em] mb-1.5 block">Product Profile</span>
              <h2 className="text-xl lg:text-2xl font-black text-gray-900 mb-4 leading-tight">
                {productTitle}
              </h2>
              
              <div className="space-y-2.5 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                  <span className="text-[9px] uppercase text-gray-400 font-black tracking-widest">SKU</span>
                  <span className="text-xs font-bold text-gray-800">{productSKU}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                  <span className="text-[9px] uppercase text-gray-400 font-black tracking-widest">List Price</span>
                  <span className="text-sm font-black text-[#0b1d3d]">₹{getNumberTwo(productPrice)}</span>
                </div>
                {minOrder > 1 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[9px] uppercase text-gray-400 font-black tracking-widest">Min. Order</span>
                    <span className="text-xs font-bold text-gray-800">{minOrder} Units</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed italic hidden lg:block opacity-70">
                Premium wholesale engineering solution. Highly durable and certified for modern requirements.
              </p>
            </div>
          </div>

          {/* Right Column: Ultra-Optimized Form Row-by-Row */}
          <div className="w-full lg:w-[65%] p-5 lg:p-7 flex flex-col bg-white">

            <div className="flex flex-col mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <FiZap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <h3 className="text-lg font-black text-gray-900 leading-none">Bulk Enquiry Form</h3>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Get Whalehose/Custom Pricing Quote</p>
            </div>

            <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-2.5">
              {/* Compact Enterprise Toggle - Back above Name */}
              <div className="flex items-center gap-2.5 p-2 bg-gray-50/80 rounded-lg border border-gray-100 mb-1">
                <input
                  type="checkbox"
                  id="isEnterprise"
                  {...register("isEnterprise")}
                  className="w-4 h-4 text-[#0b1d3d] border-gray-300 rounded focus:ring-[#0b1d3d] cursor-pointer transition-all"
                />
                <label htmlFor="isEnterprise" className="cursor-pointer flex items-baseline gap-2">
                  <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Are you an Enterprise?</span>
                  <span className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter">(Company/Organization lead)</span>
                </label>
              </div>



              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                  <input
                    {...register("name", { required: "Required" })}
                    type="text"
                    placeholder="Enter your name"
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 transition-all`}
                  />
                </div>
                <div className="space-y-0.5">
                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Work Email <span className="text-red-500">*</span></label>
                  <input
                    {...register("email", { required: "Required" })}
                    type="email"
                    placeholder="Email address"
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 transition-all`}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phone Number <span className="text-red-500">*</span></label>
                  <div className="flex gap-1.5">
                    <select 
                      {...register("phoneCountry")}
                      className="w-16 border border-gray-200 rounded-lg text-xs bg-gray-50 font-bold px-1 focus:outline-none"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input
                      {...register("phone", { required: "Required" })}
                      type="text"
                      placeholder="Enter number"
                      className={`flex-grow border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 transition-all`}
                    />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Area Pincode <span className="text-red-500">*</span></label>
                  <input
                    {...register("pincode", { required: "Required" })}
                    type="text"
                    placeholder="Zip code"
                    className={`w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-200'} rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 transition-all`}
                  />
                </div>
              </div>

              {/* Row 3: State & District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">State <span className="text-red-500">*</span></label>
                  <input
                    {...register("state", { required: "Required" })}
                    type="text"
                    placeholder="Enter State"
                    className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-200'} rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 transition-all`}
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">District <span className="text-red-500">*</span></label>
                  <input
                    {...register("district", { required: "Required" })}
                    type="text"
                    placeholder="Enter District"
                    className={`w-full border ${errors.district ? 'border-red-500' : 'border-gray-200'} rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 transition-all`}
                  />
                </div>
              </div>

              {/* Row 4: Address */}
              <div className="space-y-0.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Full Address <span className="text-red-500">*</span></label>
                <input
                  {...register("address", { required: "Required" })}
                  type="text"
                  placeholder="Street, Building, Landmark etc."
                  className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 transition-all`}
                />
              </div>

              {/* Requirement Textbox */}
              <div className="space-y-0.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Bulk Requirements (Optional)</label>
                <textarea
                  {...register("message")}
                  placeholder="Total quantity needed..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg py-1.5 px-3 text-[13px] focus:outline-none focus:border-[#0b1d3d] bg-gray-50/30 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b1d3d] text-white py-2.5 rounded-lg hover:bg-[#162542] transition-all duration-300 font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] mt-1"
              >
                Submit Enquiry Now
              </button>
            </form>


          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default ProductEnquiryModal;
