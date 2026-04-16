import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { FiHeart, FiEye, FiZap, FiShoppingBag } from "react-icons/fi";
import { useContext } from "react";
import { WishlistContext } from "@context/WishlistContext";

// internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { handleLogEvent } from "src/lib/analytics";
import { notifySuccess } from "@utils/toast";
import MainModal from "@components/modal/MainModal";

const ProductCard = ({ 
  product, 
  onEnquire, 
  overrideCategoryName, 
  hideHoverActions = false, 
  hideAddToCart = false,
  forceEnquiry = false
}) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { addToWishlist } = useContext(WishlistContext);
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue, getNumberTwo } = useUtilsFunction();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currency = globalSetting?.default_currency || "₹";

  // Handle product price and original price logic
  const price = product?.price || (product?.prices?.price) || 0;

  // For demonstration as per screenshot, if original price is missing, we show a calculated one
  const originalPrice = product?.originalPrice || (product?.prices?.originalPrice) || (price > 0 ? price + 100 : 0);

  // Category name handling
  const categoryName = overrideCategoryName || showingTranslateValue(product?.category?.name) || "Electronics";

  const handleAddToCart = () => {
    const minQty = product.minOrderQuantity || 1;
    addItem({
      id: product._id,
      name: showingTranslateValue(product.title),
      price: price,
      image: product.image?.[0],
      variant: product?.variants?.[0] || {},
      minQty: minQty,
      sku: product.sku || "",
      barcode: product.barcode || "",
      deliveryCharge: product.deliveryCharge || 0,
      gstPercentage: product.gstPercentage || 0,
      basePrice: product.basePrice || product.price || 0,
    }, minQty);
    notifySuccess(`${showingTranslateValue(product.title)} added to cart!`);

    handleLogEvent(
      "cart",
      `added ${showingTranslateValue(product?.title)} to cart`
    );
  };

  return (
    <>
      <div className="group bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-xl relative">
        {/* Sale Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-[#A821A8] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">
            Sale!
          </span>
        </div>

        {/* Product Image */}
        <div
          onClick={() => {
            if (forceEnquiry && onEnquire) {
                onEnquire(product);
            } else {
                router.push(`/product/${product.slug}`);
            }
          }}
          className="relative block cursor-pointer p-2 bg-white overflow-hidden aspect-[4/3]"
        >
          {/* Hover Action Buttons */}
          {!hideHoverActions && (
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="flex bg-white shadow-2xl rounded-sm border border-gray-100 overflow-hidden transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
                  }}
                  className="p-3 hover:bg-gray-50 border-r border-gray-100 transition-colors"
                  title="Add to Wishlist"
                >
                  <FiHeart className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  title="Quick View"
                >
                  <FiEye className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          )}
          {product.image?.[0] ? (
            <Image
              src={product.image[0]}
              alt={showingTranslateValue(product.title)}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-3 pb-3 flex flex-col flex-grow text-center">
          <div className="text-[10px] text-gray-800 font-bold mb-1 uppercase tracking-tight">
            {categoryName}
          </div>
          <h2
            className="text-xs font-bold text-gray-800 mb-2 line-clamp-2 h-8 leading-snug cursor-pointer hover:text-[#0b1d3d] transition-colors"
            onClick={() => {
                if (forceEnquiry && onEnquire) {
                    onEnquire(product);
                } else {
                    router.push(`/product/${product.slug}`);
                }
            }}
          >
            {showingTranslateValue(product.title)}
          </h2>

          {/* Min Order Quantity */}
          {product.minOrderQuantity && product.minOrderQuantity > 1 && (
            <div className="text-[10px] text-gray-500 font-medium mb-1.5 mt-[-4px]">
              Min. Order: <span className="font-bold text-gray-800">{product.minOrderQuantity} {product.minOrderQuantity > 1 ? 'Units' : 'Unit'}</span>
            </div>
          )}

          {/* Prices */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <span className="text-[#A821A8] font-bold text-sm">
              {currency}{getNumberTwo(price)}
            </span>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">
              (Incl. GST)
            </span>
            {originalPrice > price && (
              <span className="text-gray-500 line-through text-[11px]">
                {currency}{getNumberTwo(originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex gap-2 w-full">
            {onEnquire && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEnquire(product);
                }}
                className={`flex-1 bg-[#ff5c23] hover:bg-[#e04511] text-white py-2 px-2 rounded text-[11px] font-bold transition-all duration-300 active:scale-95 shadow-lg ${hideAddToCart ? 'w-full' : ''}`}
              >
                Enquire Now
              </button>
            )}
            {!hideAddToCart && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className={`${onEnquire ? 'flex-1' : 'w-full'} navy-button text-white py-2 px-2 rounded text-[11px] font-bold transition-all duration-300 active:scale-95 shadow-lg`}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <MainModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="w-full md:w-1/2 p-4 bg-gray-50 flex items-center justify-center relative min-h-[400px]">
               {product.image?.[0] ? (
                  <Image
                    src={product.image[0]}
                    alt={showingTranslateValue(product.title)}
                    width={500}
                    height={500}
                    className="object-contain max-h-[400px]"
                  />
                ) : (
                  <div className="text-gray-300">No Image</div>
                )}
                <div className="absolute top-4 left-4">
                   <span className="bg-[#A821A8] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase">
                    Quick View
                  </span>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
               <div className="mb-1 uppercase text-[10px] font-bold text-[#A821A8] tracking-widest">
                 {categoryName}
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
                 {showingTranslateValue(product.title)}
               </h2>

               <div className="space-y-4 mb-8">
                  {/* SKU, Price, Min Order Section */}
                  <div className="grid grid-cols-1 gap-3 py-4 border-y border-gray-100">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Product SKU</span>
                       <span className="text-sm font-mono font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{product.sku || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-start">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter pt-1">Product Price</span>
                       <div className="flex flex-col items-end">
                          <span className="text-2xl font-black text-[#A821A8]">{currency}{getNumberTwo(price)}</span>
                          <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter -mt-1">(Inclusive of GST)</span>
                          {(product?.price - (product?.basePrice || product?.price)) > 0 && (
                            <span className="text-[9px] text-green-600 font-bold mt-1 uppercase tracking-tighter text-right">
                              Includes {currency}{getNumberTwo(product.price - product.basePrice)} GST ({product.gstPercentage}%)
                            </span>
                          )}
                       </div>
                    </div>

                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Min. Order Quantity</span>
                       <span className="text-sm font-bold text-gray-800">{product.minOrderQuantity || 1} {product.minOrderQuantity > 1 ? 'Units' : 'Unit'}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 leading-relaxed italic">
                    {product.description ? showingTranslateValue(product.description).slice(0, 150) : "No description available"}...
                  </div>
               </div>

               <div className="mt-auto space-y-3">
                  <button
                    onClick={() => {
                      handleAddToCart();
                      setIsModalOpen(false);
                    }}
                    className="w-full bg-[#0b1d3d] hover:bg-[#162542] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag className="w-4 h-4" />
                    Add To Cart
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      router.push(`/product/${product.slug}`);
                    }}
                    className="w-full text-gray-500 hover:text-[#A821A8] py-2 rounded-lg font-bold text-[10px] transition-all uppercase tracking-widest border border-transparent hover:border-gray-50"
                  >
                    View Full Details
                  </button>
               </div>
            </div>
          </div>
        </div>
      </MainModal>
    </>
  );
};


export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
