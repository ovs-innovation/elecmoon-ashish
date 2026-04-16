import requests from "./httpService";

const ShortVideoServices = {
  addShortVideo: async (body) => {
    return requests.post("/short-videos/add", body);
  },
  getAllShortVideos: async () => {
    return requests.get("/short-videos/all");
  },
  getShowingShortVideos: async () => {
    return requests.get("/short-videos/show");
  },
  getShortVideoById: async (id) => {
    return requests.get(`/short-videos/${id}`);
  },
  updateShortVideo: async (id, body) => {
    return requests.put(`/short-videos/${id}`, body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/short-videos/status/${id}`, body);
  },
  deleteShortVideo: async (id) => {
    return requests.delete(`/short-videos/active/${id}`);
  },
};

export default ShortVideoServices;
