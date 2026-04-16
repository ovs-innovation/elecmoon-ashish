import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// internal import
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import CardSlider from "@components/cta-card/CardSlider";
import Loading from "@components/preloader/Loading";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import { SidebarContext } from "@context/SidebarContext";
import AttributeServices from "@services/AttributeServices";
import CategoryCarousel from "@components/carousel/CategoryCarousel";
import { sanitizeData } from "@utils/dataSanitizer";

const Search = ({ products, attributes }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProduct, setVisibleProduct] = useState(18);

  const { category } = router.query;

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  const { setSortedField, productData } = useFilter(products);

  // Capitalize name for cleaner display
  const categoryTitle = category ? category.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "All Products";

  return (
    <Layout title="Search" description="This is search page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex flex-col py-6 lg:py-8">
          <div className="w-full mb-6">
            <CardSlider />
          </div>

          <div className="relative mb-10">
            <CategoryCarousel />
          </div>

          <div className="w-full mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[#A821A8] mb-2 tracking-tight">
              {categoryTitle}
            </h1>
            <div className="h-1 w-20 bg-[#A821A8] rounded-full"></div>
          </div>

          {productData?.length === 0 ? (
            <div className="mx-auto p-5 my-5">
              <Image
                className="my-4 mx-auto"
                src="/no-result.svg"
                alt="no-result"
                width={400}
                height={380}
              />
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                {t("common:sorryText")} 😞
              </h2>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                <h6 className="text-sm font-medium text-gray-600">
                  {t("common:totalI")}{" "}
                  <span className="font-bold text-[#A821A8]">{productData?.length}</span>{" "}
                  {t("common:itemsFound")}
                </h6>
              </div>

              {isLoading ? (
                <Loading loading={isLoading} />
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
                    {productData?.slice(0, visibleProduct).map((product, i) => (
                      <ProductCard
                        key={product._id || i + 1}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>

                  {productData?.length > visibleProduct && (
                    <div className="flex justify-center mt-12 pb-10">
                      <button
                        onClick={() => setVisibleProduct((pre) => pre + 10)}
                        className="bg-white border-2 border-[#A821A8] text-[#A821A8] hover:bg-[#A821A8] hover:text-white px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm active:scale-95 shadow-lg"
                      >
                        {t("common:loadMoreBtn")}
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { query, _id, page, limit } = context.query;

  try {
    const [data, attributes] = await Promise.all([
      ProductServices.getShowingStoreProducts({
        category: _id ? _id : "",
        title: query ? encodeURIComponent(query) : "",
        page: page ? String(page) : "1",
        limit: limit ? String(limit) : "60",
      }),
      AttributeServices.getShowingAttributes({}),
    ]);

    // Sanitize all data to prevent serialization issues
    const sanitizedAttributes = sanitizeData(attributes) || [];
    const sanitizedProducts = sanitizeData(data?.products) || [];

    return {
      props: {
        attributes: sanitizedAttributes,
        products: sanitizedProducts,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    // Return fallback data on error
    return {
      props: {
        attributes: [],
        products: [],
      },
    };
  }
};
