import axiosClient from "./axiosClient";

const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  profile: () => axiosClient.get("/auth/profile")
};

export default authApi;
