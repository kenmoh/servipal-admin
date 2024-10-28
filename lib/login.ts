import { UserType } from "@/types/user-types";
import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = "https://quickpickup.onrender.com/api";

const api = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

// export const loginUser = async (username: string, password: string) => {
//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("password", password);

//   const response = await api.post("/servipal-admin-login", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     withCredentials: true,
//   });
//   if (response.status !== 200) {
//     throw new Error(response.data?.detail.split(":")[0]);
//   }

//   return response.data;
// };

export interface LoginCredentials {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  detail: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // const formData = new URLSearchParams({
    //   username: credentials.email,
    //   password: credentials.password,
    //   remember_me: credentials.remember_me ? "true" : "false",
    // });
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await api.post<AuthResponse>(
      "/servipal-admin-login",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(response.data?.detail.split(":")[0]);
    }
    console.log(response.data, "oooooooooooooooo");
    return response.data;
  },

  logout: async () => {
    return api.post("/api/admin-logout");
  },

  getUser: async (): Promise<UserType> => {
    const { data } = await api.get("/auth/validate");
    return data.user;
  },
};
