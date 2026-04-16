import requests from "./httpServices";

const ReviewServices = {
  addReview: async (body) => {
    return requests.post("/reviews/add", body);
  },
  getReviewsByProduct: async (id) => {
    return requests.get(`/reviews/product/${id}`);
  },
  updateReview: async (id, body) => {
    return requests.put(`/reviews/${id}`, body);
  },
  deleteReview: async (id, body) => {
    return requests.delete(`/reviews/${id}`, body);
  },
};

export default ReviewServices;
