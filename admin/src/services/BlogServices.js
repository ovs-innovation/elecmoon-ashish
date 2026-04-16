import requests from "./httpService";

const BlogServices = {
  addBlog: async (body) => {
    return requests.post("/blogs/add", body);
  },
  getAllBlogs: async () => {
    return requests.get("/blogs/");
  },
  getBlogById: async (id) => {
    return requests.post(`/blogs/${id}`);
  },
  updateBlog: async (id, body) => {
    return requests.patch(`/blogs/${id}`, body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/blogs/status/${id}`, body);
  },
  deleteBlog: async (id) => {
    return requests.delete(`/blogs/${id}`);
  },
};

export default BlogServices;

