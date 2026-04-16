import requests from "./httpServices";

const ShortVideoServices = {
  getShowingShortVideos: async () => {
    return requests.get("/short-videos/show");
  },
};

export default ShortVideoServices;
