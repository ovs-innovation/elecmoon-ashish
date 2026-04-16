import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiStar, FiTrendingUp } from "react-icons/fi";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import ProductEnquiryModal from "@components/modal/ProductEnquiryModal";

/* ════════════════════════════════════════════════════════════════
   HORIZONTAL SCROLL SECTION
══════════════════════════════════════════════════════════════════ */
const ScrollSection = ({ title, icon, accent, products }) => {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanLeft(scrollLeft > 10);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    // Small delay to let DOM settle before measuring
    const t = setTimeout(checkScroll, 100);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (dir === "left" ? -320 : 320),
      behavior: "smooth",
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="mb-14">
      {/* ── Section header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ background: accent }}
          >
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">{title}</h2>
            <div
              className="h-1 w-12 rounded-full mt-1"
              style={{ background: accent }}
            />
          </div>
        </div>

        {/* Scroll arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canLeft}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center
                       text-gray-500 hover:border-[#A821A8] hover:text-[#A821A8]
                       disabled:opacity-25 disabled:cursor-not-allowed transition-all bg-white"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canRight}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center
                       text-gray-500 hover:border-[#A821A8] hover:text-[#A821A8]
                       disabled:opacity-25 disabled:cursor-not-allowed transition-all bg-white"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Cards strip ─────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.hp-scroll::-webkit-scrollbar{display:none}`}</style>
        {products.map((product) => (
          /* Each card gets a fixed width wrapper so the grid card fills it */
          <div key={product._id} className="flex-shrink-0" style={{ width: 210 }}>
            <ProductCard 
              product={product} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════════ */
const HomeProductsSection = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEnquire = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const [popular, trending] = await Promise.all([
          ProductServices.getProductsByType("popular"),
          ProductServices.getProductsByType("trending"),
        ]);
        setPopularProducts(popular || []);
        setTrendingProducts(trending || []);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  /* Nothing to show → render nothing */
  if (!loading && popularProducts.length === 0 && trendingProducts.length === 0) {
    return null;
  }

  /* Loading skeleton */
  if (loading) {
    return (
      <section className="bg-gray-50 py-10">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
          <div className="flex gap-5 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white rounded-lg animate-pulse"
                style={{ width: 210, height: 310 }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        <ScrollSection
          title="Popular Products"
          icon={<FiStar className="w-5 h-5" />}
          accent="#0b1d3d"
          products={popularProducts}
        />
        <ScrollSection
          title="Trending Products"
          icon={<FiTrendingUp className="w-5 h-5" />}
          accent="#0b1d3d"
          products={trendingProducts}
        />
      </div>
    </section>
  );
};

export default HomeProductsSection;
