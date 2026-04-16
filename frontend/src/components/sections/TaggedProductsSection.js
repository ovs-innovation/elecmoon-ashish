import React, { useState, useEffect } from "react";
import ProductCard from "@components/product/ProductCard";
import ProductServices from "@services/ProductServices";
import CMSkeleton from "@components/preloader/CMSkeleton";

const TaggedProductsSection = ({
  tag,
  title,
  description,
  limit = 6,
  attributes,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductServices.getProductsByTag(tag);
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching tagged products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (tag) {
      fetchProducts();
    }
  }, [tag]);

  if (loading) {
    return (
      <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="mb-10 flex justify-center">
          <div className="text-center w-full lg:w-2/5">
            <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
              {title || "Featured Products"}
            </h2>
            <p className="text-base font-sans text-gray-600 leading-6">
              {description || "Discover our specially curated products"}
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <CMSkeleton
              count={20}
              height={20}
              error={error}
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
      <div className="mb-10 flex justify-center">
        <div className="text-center w-full lg:w-2/5">
          <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
            {title || "Featured Products"}
          </h2>
          <p className="text-base font-sans text-gray-600 leading-6">
            {description || "Discover our specially curated products"}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
            {products.slice(0, limit).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                attributes={attributes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaggedProductsSection;
