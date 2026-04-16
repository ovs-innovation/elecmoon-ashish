import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiBookOpen } from "react-icons/fi";
import BlogServices from "@services/BlogServices";
import CMSkeleton from "@components/preloader/CMSkeleton";

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await BlogServices.getShowingBlogs();
        // Fetch at least 5 blogs as requested, up to 10 for a good scroll
        setBlogs(data?.slice(0, 10) || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const t = setTimeout(checkScroll, 100);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", checkScroll);
    };
  }, [blogs]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (dir === "left" ? -400 : 400),
      behavior: "smooth",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getTitle = (titleObj) => {
    if (typeof titleObj === "string") return titleObj;
    if (typeof titleObj === "object" && titleObj !== null) {
      return titleObj.en || titleObj[Object.keys(titleObj)[0]] || "";
    }
    return "";
  };

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="bg-gray-50 pt-16 pb-6">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        {/* Header - Left Aligned */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ED1C24] rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiBookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 leading-none">Latest Blog Posts</h2>
              <div className="w-16 h-1 bg-[#ED1C24] mt-2 rounded-full"></div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center
                         text-gray-500 hover:border-[#ED1C24] hover:text-[#ED1C24]
                         disabled:opacity-25 disabled:cursor-not-allowed transition-all bg-white"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center
                         text-gray-500 hover:border-[#ED1C24] hover:text-[#ED1C24]
                         disabled:opacity-25 disabled:cursor-not-allowed transition-all bg-white"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm" style={{ width: 280 }}>
                <CMSkeleton count={1} height={160} loading={true} />
                <div className="mt-4">
                  <CMSkeleton count={1} height={20} loading={true} />
                  <CMSkeleton count={1} height={14} loading={true} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
             ref={scrollRef}
             onScroll={checkScroll}
             className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col h-full"
                style={{ width: 280 }}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative w-full h-[160px] overflow-hidden">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={getTitle(blog.title)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#ED1C24] text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                        Compliance
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                   <p className="text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-tight">
                     {formatDate(blog.publishedAt || blog.createdAt)}
                   </p>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="text-sm font-black text-gray-900 mb-3 group-hover:text-[#ED1C24] transition-colors duration-300 line-clamp-2 min-h-[40px] leading-tight">
                      {getTitle(blog.title)}
                    </h3>
                  </Link>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-auto inline-flex items-center text-[#0b1d3d] font-bold text-[11px] tracking-widest hover:text-[#ED1C24] transition-colors"
                  >
                    READ MORE <span className="ml-1.5 text-lg">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
            <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ED1C24] font-bold transition-all group"
            >
                View All Insights <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
