import requests from "./httpServices";

const BlogServices = {
  getShowingBlogs: async () => {
    return requests.get("/blogs/show");
  },
  getAllBlogs: async () => {
    return requests.get("/blogs/");
  },
  getBlogBySlug: async (slug) => {
    return requests.get(`/blogs/slug/${slug}`);
  },
  getBlogById: async (id) => {
    return requests.post(`/blogs/${id}`);
  },
  addBlog: async (data) => {
    return requests.post("/blogs/add", data);
  },
  updateBlog: async (id, data) => {
    return requests.patch(`/blogs/${id}`, data);
  },
  updateStatus: async (id, status) => {
    return requests.put(`/blogs/status/${id}`, { status });
  },
  deleteBlog: async (id) => {
    return requests.delete(`/blogs/${id}`);
  },
};

export default BlogServices;

