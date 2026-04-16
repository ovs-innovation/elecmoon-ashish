import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@layout/Layout";
import BlogServices from "@services/BlogServices";
import CMSkeleton from "@components/preloader/CMSkeleton";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await BlogServices.getShowingBlogs();
        setBlogs(data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

  return (
    <Layout title="Blog" description="PowerQ Test & Tag Melbourne Blog">
      {/* Hero Section */}
      <div className="relative bg-[#111] text-white min-h-[380px] sm:min-h-[380px] lg:min-h-[420px]">
        <Image
          src="https://www.powerq.com.au/wp-content/uploads/al_opt_content/IMAGE/www.powerq.com.au/wp-content/uploads/2025/03/Fire-Safety-Training-for-Oil-Gas-960x640-1.jpg.bv.webp"
          alt="Blog"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-10 py-24 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Blog
          </h1>
          <div className="w-52 h-0.5 bg-white mx-auto" />
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="bg-white py-12 lg:py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white">
                  <CMSkeleton count={1} height={200} loading={true} />
                  <div className="mt-6">
                    <CMSkeleton count={1} height={24} loading={true} />
                    <CMSkeleton count={1} height={16} loading={true} />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">Error loading blogs: {error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white group"
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="relative w-full h-[200px] lg:h-[250px] overflow-hidden mb-6">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={getTitle(blog.title)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div>
                    <Link href={`/blog/${blog.slug}`}>
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                        {getTitle(blog.title)}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4">
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </p>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-300"
                    >
                      Read More <span className="ml-1">»</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

