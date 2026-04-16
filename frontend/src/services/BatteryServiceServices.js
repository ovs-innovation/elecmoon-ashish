import requests from "./httpServices";

const BatteryServiceServices = {
  submitRequest: async (body) => {
    return requests.post("/battery-service", body);
  },
};

export default BatteryServiceServices;
