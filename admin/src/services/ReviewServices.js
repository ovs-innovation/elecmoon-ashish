import requests from "./httpService";

const ReviewServices = {
  getAllReviews: async () => {
    return requests.get("/reviews");
  },
  updateReviewStatus: async (id, body) => {
    return requests.put(`/reviews/${id}`, body);
  },
  deleteReview: async (id) => {
    return requests.delete(`/reviews/${id}`);
  },
};

export default ReviewServices;
