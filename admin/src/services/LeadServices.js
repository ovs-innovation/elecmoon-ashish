import requests from "./httpService";

const LeadServices = {
  getAllLeads: async ({
    body,
    headers,
    name = "",
    email = "",
    phone = "",
    status = "",
    page = 1,
    limit = 20,
    startDate = "",
    endDate = "",
  } = {}) => {
    return requests.get(
      `/leads?name=${name}&email=${email}&phone=${phone}&status=${status}&page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`,
      body,
      headers
    );
  },

  getLeadById: async (id, body, headers) => {
    return requests.get(`/leads/${id}`, body, headers);
  },

  updateLead: async (id, body, headers) => {
    return requests.put(`/leads/${id}`, body, headers);
  },

  deleteLead: async (id) => {
    return requests.delete(`/leads/${id}`);
  },

  getDashboardCount: async () => {
    return requests.get('/leads/dashboard/count');
  },

  getDashboardRecentLeads: async ({ page = 1, limit = 8 } = {}) => {
    return requests.get(`/leads/dashboard/recent?page=${page}&limit=${limit}`);
  },

  getDashboardLeadData: async () => {
    return requests.get('/leads/dashboard/data');
  },
};

export default LeadServices; 