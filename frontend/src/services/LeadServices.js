import requests from "./httpServices";

const LeadServices = {
  addLead: async (body, headers) => {
    return requests.post("/leads", body, headers);
  },
  getUserLeads: async (userId, headers) => {
    return requests.get(`/leads/user/${userId}`, headers);
  },
};

export default LeadServices; 
