import axios from "axios";
import { Basket, IStore, User } from "./types";
import { Inventar2 } from "./types";
import { AxiosResponse } from "axios";
import { useContext } from "react";
import { Context } from "./main";

export const API_URL3 = `http://localhost:5000/Basket`;
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL3,
});


export default class BasketService {
  
  static async addToBasket(
    userId: string,
    productId: string,
    amount: number
  ): Promise<Basket[] | undefined> {
    try {
      const response: AxiosResponse<Basket[]> = await $api.post<Basket[]>(
        "/addProduct",
        {
          userId,
          productId,
          amount,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при добавлении товара в корзину: ", error);
      throw error;
    }
  }

  static async deleteProduct(
    userId: string,
    productId: string
  ): Promise<Basket[] | undefined> {
    try {
      const response: AxiosResponse<Basket[]> = await $api.put<Basket[]>(
        "/deleteProduct",
        {
          userId,
          productId,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины: ", error);
      throw error;
    }
  }
  static async removeOneFromBasket(
    userId: string,
    pId: string
  ): Promise<Basket | undefined> {
    try {
      const response: AxiosResponse<Basket> = await $api.put<Basket>(
        "/deleteOne",
        {
          userId,
          pId,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при уменьшении товара: ", error);
      throw error;
    }
  }
  static async purchaseBasket(
    userId: string,
    store: IStore
  ): Promise<User | undefined> {
    try {
      console.log('id пользователя перед покупкой: ', store.user.id)
      console.log('пользователь перед покупкой: ',store.user)
      const response: AxiosResponse<User> = await $api.post<User>(
        "/purchase",
        {
          userId
        }
      );
      console.log(response.data);
      store.setUser(response.data);
      
      console.log('пользователь после покупки: ', store.user)
      console.log('id пользователя после покупки: ', store.user.id)
      return response.data;
    } catch (error) {
      console.error("Ошибка при покупке: ", error);
      throw error;
    }
  }
  static async getAllProductsInBasket(
    userId: string
  ): Promise<Basket[] | undefined> {
    try {
      const response: AxiosResponse<Basket[]> = await $api.get<Basket[]>(
        "/getAllProductsInBasket",
        {
            params: { userId }
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при покупке: ", error);
      throw error;
    }
  }
  static async getAllProductsInInventar(
    userId: string
  ): Promise<Inventar2[] | undefined> {
    try {
      const response: AxiosResponse<Inventar2[]> = await $api.get<Inventar2[]>(
        "/getAllProductsInInventar",
        {
            params: { userId }
        }
      );
      console.log('инвентарь: ',response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении продуктов в инвентаре: ", error);
      throw error;
    }
  }
}
