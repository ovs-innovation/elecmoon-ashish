import requests from "./httpServices";

const ServiceServices = {
  getShowingServices: async () => {
    return requests.get("/services/show");
  },
  getServiceBySlug: async (slug) => {
    return requests.get(`/services/show/slug/${slug}`);
  },
};

export default ServiceServices;
