export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  uniqueness: string;
  category: string;
  picture?: string;
}

export interface Basket {
  productId: string;
  amount: number;
  quantity: number;
  price: number;
  name: string;
  description: string;
  uniqueness: string;
  category: string;
  picture: string;
}
export interface Inventar2 {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  description: string;
  uniqueness: string;
  category: string;
  picture?: string;
}

export interface User{
  email: string;
  id: string;
  isActivated: boolean;
  balance: number;
  role: string;
  basket: Basket[];
  inventar: Inventar2[];
}

export interface IStore {
  user: User;
  isAuth: boolean;
  balance: number;

  setAuth(bool: boolean): void;
  setUser(user: User): void;
  checkUserActivation(): void;
  setBalance(user: User): void;
  login(email: string, password: string): Promise<void>;
  registration(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  checkAuth(): Promise<void>;
}
