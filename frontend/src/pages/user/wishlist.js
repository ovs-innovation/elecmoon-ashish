import React, { useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiTrash2, FiShoppingCart, FiEye } from "react-icons/fi";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";

// internal imports
import Dashboard from "@pages/user/dashboard";
import { WishlistContext } from "@context/WishlistContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Image from "next/image";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addItem } = useCart();
  const { showingTranslateValue, getNumberTwo, currency } = useUtilsFunction();

  const handleAddToCart = (product) => {
    addItem({
      id: product._id,
      name: showingTranslateValue(product.title),
      price: product.prices?.price || product.price || 0,
      image: product.image?.[0],
      variant: product.variants?.[0] || {},
      sku: product.sku || "",
      barcode: product.barcode || "",
      deliveryCharge: product.deliveryCharge || 0,
    });
    toast.success("Added to cart!");
  };

  return (
    <Dashboard title="Wishlist" description="Your Wishlist">
      <div className="overflow-hidden">
        <h2 className="text-xl font-serif font-semibold mb-5">My Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Your wishlist is empty.</p>
            <Link href="/" className="mt-4 inline-block bg-[#0b1d3d] text-white px-6 py-2 rounded-md hover:bg-[#162542] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {wishlistItems.map((item) => (
              <div key={item._id} className="group relative bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50">
                   {item.image?.[0] ? (
                    <Image
                        src={item.image[0]}
                        alt={showingTranslateValue(item.title)}
                        fill
                        className="object-contain p-2"
                    />
                   ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                   )}
                   
                   <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => removeFromWishlist(item._id)}
                        className="p-2 bg-white text-red-500 rounded-full shadow-md transition-colors"
                        title="Remove from Wishlist"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                      <Link href={`/product/${item.slug}`} className="p-2 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <FiEye className="w-4 h-4" />
                      </Link>
                   </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1">
                    {showingTranslateValue(item.title)}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#A821A8] font-bold">
                        {currency}{getNumberTwo(item.prices?.price || item.price || 0)}
                    </span>
                    <button 
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1 bg-[#0b1d3d] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#162542] transition-colors"
                    >
                        <FiShoppingCart className="w-3 h-3" />
                        Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
