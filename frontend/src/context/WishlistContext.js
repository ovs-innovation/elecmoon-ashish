import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { status } = useSession();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount (Guest only)
  useEffect(() => {
    if (status === "unauthenticated") {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist && savedWishlist !== "undefined" && savedWishlist !== "null") {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Error parsing wishlist from localStorage:", e);
        }
      }
    }
  }, [status]);

  // Save wishlist to localStorage (Guest only)
  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, status]);


  const addToWishlist = (product) => {
    const isExist = wishlistItems.find((item) => item._id === product._id);
    if (isExist) {
       toast.info("Product already in wishlist!");
       return;
    }
    setWishlistItems((prev) => [...prev, product]);
    toast.success("Added to wishlist!");
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    toast.error("Removed from wishlist!");
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const loadWishlist = (items) => {
    setWishlistItems(items || []);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    loadWishlist,
    isProductInWishlist,
    totalWishlistItems: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
