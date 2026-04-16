import requests from "./httpService";

const ServiceServices = {
  getAllServices: async () => {
    return requests.get("/services");
  },

  getServiceById: async (id) => {
    return requests.get(`/services/${id}`);
  },

  addService: async (body) => {
    return requests.post("/services/add", body);
  },

  updateService: async (id, body) => {
    return requests.patch(`/services/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/services/status/${id}`, body);
  },

  deleteService: async (id) => {
    return requests.delete(`/services/${id}`);
  },
};

export default ServiceServices;
