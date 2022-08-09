import { atom } from "recoil";
import { CartItem } from "../models/cartItem";
import { Product } from "../models/product";
import { User } from "../models/user";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: null as unknown as User,
});

export const productState = atom({
  key: "productState",
  default: {
    breakfast: [] as Product[],
    lunch: [] as Product[],
    dinner: [] as Product[],
  },
});

export const cartItemsState = atom({
  key: "cartItemsState",
  default: [] as CartItem[],
});
