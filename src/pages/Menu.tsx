import React from "react";
import { useRecoilValue } from "recoil";
import { CartItem } from "../models/cartItem";
import { cartItemsState } from "../recoil/atoms";
import Cart from "./components/Cart";
import CheckNavbar from "./components/checkNavbar";
import RestaurantMenu from "./components/RestaurantMenu";

function Menu() {
  const list: CartItem[] = useRecoilValue(cartItemsState);
  return (
    <div>
      <CheckNavbar />
      <RestaurantMenu />
      {list.length > 0 ? <Cart /> : <></>}
    </div>
  );
}

export default React.memo(Menu);
