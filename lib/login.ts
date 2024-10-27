import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = "https://quickpickup.onrender.com/api";

const api = axios.create({ baseURL: API_BASE_URL });

export const loginUser = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const response = await api.post("/servipal-admin-login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error(response.data?.detail.split(":")[0]);
  }
  sessionStorage.setItem("accessToken", response.data.access_token);
  return response.data;
};
