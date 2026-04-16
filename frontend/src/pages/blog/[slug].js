import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@layout/Layout";
import BlogServices from "@services/BlogServices";
import CommentServices from "@services/CommentServices";
import CMSkeleton from "@components/preloader/CMSkeleton";
import { FiUser, FiFolder, FiMessageCircle, FiSearch, FiHome } from "react-icons/fi";

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  // Load saved info from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("comment_name");
      const savedEmail = localStorage.getItem("comment_email");
      const savedWebsite = localStorage.getItem("comment_website");
      const savedInfo = localStorage.getItem("comment_save_info") === "true";

      if (savedInfo && (savedName || savedEmail)) {
        setCommentForm((prev) => ({
          ...prev,
          name: savedName || "",
          email: savedEmail || "",
          website: savedWebsite || "",
          saveInfo: true,
        }));
      }
    }
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await BlogServices.getBlogBySlug(slug);
        setBlog(data);
        
        // Fetch recent blogs for sidebar
        const recent = await BlogServices.getShowingBlogs();
        // Get first 5 blogs, excluding current blog
        const filtered = recent.filter(b => b.slug !== slug).slice(0, 5);
        setRecentBlogs(filtered);

        // Fetch comments for this blog
        if (data._id) {
          try {
            setCommentLoading(true);
            const commentsData = await CommentServices.getCommentsByBlogId(data._id);
            setComments(commentsData || []);
          } catch (err) {
            console.error("Error fetching comments:", err);
          } finally {
            setCommentLoading(false);
          }
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getText = (textObj) => {
    if (typeof textObj === "string") return textObj;
    if (typeof textObj === "object" && textObj !== null) {
      return textObj.en || textObj[Object.keys(textObj)[0]] || "";
    }
    return "";
  };

  const getTitle = (titleObj) => {
    if (typeof titleObj === "string") return titleObj;
    if (typeof titleObj === "object" && titleObj !== null) {
      return titleObj.en || titleObj[Object.keys(titleObj)[0]] || "";
    }
    return "";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!blog?._id) return;

    // Clear previous messages
    setSubmitMessage({ type: "", text: "" });

    // Validate required fields
    if (!commentForm.name.trim() || !commentForm.email.trim() || !commentForm.comment.trim()) {
      setSubmitMessage({ type: "error", text: "Please fill in all required fields (Name, Email, and Comment)." });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(commentForm.email)) {
      setSubmitMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      setSubmitting(true);
      setSubmitMessage({ type: "", text: "" });
      
      await CommentServices.addComment({
        blogId: blog._id,
        name: commentForm.name.trim(),
        email: commentForm.email.trim(),
        website: commentForm.website.trim() || "",
        comment: commentForm.comment.trim(),
      });

      // Save to localStorage if saveInfo is checked
      if (commentForm.saveInfo && typeof window !== "undefined") {
        localStorage.setItem("comment_name", commentForm.name.trim());
        localStorage.setItem("comment_email", commentForm.email.trim());
        localStorage.setItem("comment_website", commentForm.website.trim() || "");
        localStorage.setItem("comment_save_info", "true");
      } else if (typeof window !== "undefined") {
        localStorage.removeItem("comment_name");
        localStorage.removeItem("comment_email");
        localStorage.removeItem("comment_website");
        localStorage.removeItem("comment_save_info");
      }

      // Reset form
      setCommentForm({
        name: commentForm.saveInfo ? commentForm.name : "",
        email: commentForm.saveInfo ? commentForm.email : "",
        website: commentForm.saveInfo ? commentForm.website : "",
        comment: "",
        saveInfo: commentForm.saveInfo,
      });

      // Refresh comments dynamically
      const commentsData = await CommentServices.getCommentsByBlogId(blog._id);
      setComments(commentsData || []);
      
      setSubmitMessage({ type: "success", text: "Comment submitted successfully! Your comment is now visible." });
      
      // Scroll to comments section
      setTimeout(() => {
        const commentsSection = document.getElementById("comments-section");
        if (commentsSection) {
          commentsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setSubmitMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to submit comment. Please try again." 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCommentForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading blog post">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-12">
          <CMSkeleton count={10} height={20} loading={true} />
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout title="Blog Not Found" description="Blog post not found">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link href="/blog">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
              Back to Blog
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={getText(blog.title)} description={getText(blog.description)}>
      <style jsx global>{`
        /* Match editor styling exactly */
        .blog-content {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #000000;
        }
        .blog-content p {
          margin: 0 0 1em 0;
          padding: 0;
          line-height: 1.5;
          font-size: 16px;
        }
        .blog-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          line-height: 1.2;
        }
        .blog-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          line-height: 1.2;
        }
        .blog-content h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
          line-height: 1.2;
        }
        .blog-content h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1.33em 0;
          line-height: 1.2;
        }
        .blog-content h5 {
          font-size: 0.83em;
          font-weight: bold;
          margin: 1.67em 0;
          line-height: 1.2;
        }
        .blog-content h6 {
          font-size: 0.67em;
          font-weight: bold;
          margin: 2.33em 0;
          line-height: 1.2;
        }
        .blog-content ul,
        .blog-content ol {
          margin: 0 0 1em 0;
          padding-left: 40px;
        }
        .blog-content li {
          margin: 0.5em 0;
          line-height: 1.5;
        }
        .blog-content blockquote {
          margin: 0 0 1em 0;
          padding-left: 20px;
          border-left: 4px solid #ddd;
          font-style: italic;
        }
        .blog-content code {
          background-color: #f5f5f5;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: "Courier New", Courier, monospace;
          font-size: 0.9em;
        }
        .blog-content pre {
          background-color: #f5f5f5;
          padding: 10px;
          border-radius: 3px;
          overflow-x: auto;
          margin: 0 0 1em 0;
        }
        .blog-content pre code {
          background: none;
          padding: 0;
        }
        .blog-content a {
          color: #1890ff;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #40a9ff;
        }
        .blog-content strong,
        .blog-content b {
          font-weight: bold;
        }
        .blog-content em,
        .blog-content i {
          font-style: italic;
        }
        .blog-content u {
          text-decoration: underline;
        }
        .blog-content s,
        .blog-content strike {
          text-decoration: line-through;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em auto;
        }
        .blog-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }
        .blog-content table td,
        .blog-content table th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .blog-content table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
      `}</style>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600 transition-colors">
              <FiHome className="inline mr-1" />
              Home
            </Link>
            <span className="mx-2">/</span>
            {blog.category && (
              <>
                <Link href={`/blog?category=${blog.category}`} className="hover:text-red-600 transition-colors capitalize">
                  {blog.category}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-900 line-clamp-1">{getTitle(blog.title)}</span>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="bg-white py-8 lg:py-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              {blog.image && (
                <div className="relative w-full h-[250px] lg:h-[300px] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={blog.image}
                    alt={getText(blog.title)}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b border-gray-200">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                )}
                {(blog.category || blog.tags?.length > 0) && (
                  <div className="flex items-center gap-2">
                    <FiFolder className="w-4 h-4" />
                    <span className="flex flex-wrap gap-2">
                      {blog.category && (
                        <Link href={`/blog?category=${blog.category}`} className="hover:text-red-600 transition-colors capitalize">
                          {blog.category}
                        </Link>
                      )}
                      {blog.tags && blog.tags.length > 0 && blog.tags.slice(0, 2).map((tag, index) => (
                        <React.Fragment key={index}>
                          {blog.category && index === 0 && <span>, </span>}
                          {index > 0 && <span>, </span>}
                          <Link href={`/blog?tag=${tag}`} className="hover:text-red-600 transition-colors capitalize">
                            {tag}
                          </Link>
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <FiMessageCircle className="w-4 h-4" />
                  <span>{comments.length}</span>
                </div>
              </div>

              {/* Blog Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {getTitle(blog.title)}
              </h1>

              {/* Blog Content */}
              {blog.description && (
                <div className="mb-8">
                  <p className="text-lg text-gray-700 leading-8">
                    {getText(blog.description).split('.').map((sentence, index) => {
                      if (index === 0 && sentence.trim()) {
                        return <strong key={index}>{sentence.trim()}. </strong>;
                      }
                      return sentence.trim() ? `${sentence.trim()}. ` : '';
                    })}
                  </p>
                </div>
              )}

              {blog.content && (
                <div className="mb-8">
                  <div
                    className="blog-content"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: '#000000',
                      padding: '0 15px'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: typeof blog.content === "string" 
                        ? blog.content 
                        : getText(blog.content),
                    }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Search */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
                    >
                      <FiSearch className="w-5 h-5" />
                    </button>
                  </form>
                </div>

                {/* Recent Posts */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
                  <ul className="space-y-3">
                    {recentBlogs.length > 0 ? (
                      recentBlogs.map((recentBlog) => (
                        <li key={recentBlog._id}>
                          <Link
                            href={`/blog/${recentBlog.slug}`}
                            className="text-gray-700 hover:text-red-600 transition-colors text-sm leading-relaxed block"
                          >
                            {getTitle(recentBlog.title)}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 text-sm">No recent posts</li>
                    )}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;

