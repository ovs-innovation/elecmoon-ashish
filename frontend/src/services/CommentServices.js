import requests from "./httpServices";

const CommentServices = {
  addComment: async (data) => {
    return requests.post("/comments/add", data);
  },
  getCommentsByBlogId: async (blogId) => {
    return requests.get(`/comments/blog/${blogId}`);
  },
};

export default CommentServices;

