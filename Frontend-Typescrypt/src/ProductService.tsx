import axios from "axios";
import { Product } from "./types";
import { AxiosResponse } from "axios";
import { AuthResponse } from "./authLogic/models/response/AuthResponse";
const API_URL = `http://localhost:5000/auth`;
interface Products {
  data: Product[];
}
export const API_URL2 = `http://localhost:5000/api`;
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL2,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log('попали в не авторизован интерцептор')
    const originalRequest = error.config;
    originalRequest._isRetry=true;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  }
);

export default class ProductService {
  static async getInfo(): Promise<Products | undefined> {
    try {
      const response: AxiosResponse<Products> = await $api.get<Products>("/getAllProducts");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  }

  static async getProduct(id: string): Promise<Product | undefined> {
    try {
      const response: AxiosResponse<Product> = await $api.get<Product>(`/product/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const response: AxiosResponse<void> = await $api.delete<void>(`/deleteProduct/${id}`);
      console.log(response);
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
      throw error;
    }
  }

  static async createProduct(formData: FormData): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await $api.post<Product>(`/newProduct`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
      throw error;
    }
  }

  static async updateProduct(formData: FormData): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await $api.put<Product>(`/editProduct`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при обновлении продукта:", error);
      throw error;
    }
  }
}