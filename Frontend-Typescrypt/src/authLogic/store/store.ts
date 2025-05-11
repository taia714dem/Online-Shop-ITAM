import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import { User } from "../../types";

export default class Store {
  user = {} as User;
  isAuth = false;
  isActivated = false;
  balance=0;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: User) {
    this.user = user;
  }
  checkUserActivation() {
    if (this.user.isActivated) {
      this.setAuth(true);
    }
  }
  setBalance(user: User){
    this.balance=user.balance
  }

  


  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(
        "refresh токен при регистрации: ",
        response.data.refreshToken
      );
      localStorage.setItem("token", response.data.accessToken);
      console.log("токен при регистрации: ", response);

      this.setUser(response.data.user);
      this.checkUserActivation();
      
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }
  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as User);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }
  async checkAuth() {
    console.log("начинаем проверять авторизацию");
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      this.setUser(response.data.user);
      this.checkUserActivation();
      this.setBalance(response.data.user)
      console.log(this.isAuth);
    } catch (error: any) {
      console.log(error.response?.data?.message, "ошибка в store");
    }
  }

  
}
