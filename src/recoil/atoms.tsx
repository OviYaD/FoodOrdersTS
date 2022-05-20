import { atom } from "recoil";
import { Product } from "../models/product";
import { User } from "../models/user";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: new User(),
});

export const productState = atom({
  key: "productState",
  default: [new Product()],
});
