import { UserType } from "@/types/user-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = "https://quickpickup.onrender.com/api";

const api = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

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

// Add a helper to manage token storage
const TOKEN_KEY = "auth_token";

const tokenStorage = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  },
  getToken: () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
  },
  removeToken: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  },
};

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
        // withCredentials: true,
      }
    );
    if (response.status !== 200) {
      throw new Error(response.data?.detail.split(":")[0] || "Login failed");
    }

    // Store the token
    if (response.data.access_token) {
      tokenStorage.setToken(response.data.access_token);
    }

    return response.data;
  },

  logout: async () => {
    const token = tokenStorage.getToken();
    try {
      await api.post("/api/admin-logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } finally {
      tokenStorage.removeToken();
    }
  },
  // Add a method to get current user from token
  getCurrentUser: (): UserType | null => {
    const token = tokenStorage.getToken();
    if (token) {
      try {
        return jwtDecode<UserType>(token);
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  },
};

// Interceptor to add the token to all requests
api.interceptors.request.use((config) => {
  const token = tokenStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
