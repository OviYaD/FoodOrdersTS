import React from "react";
import { useRecoilValue } from "recoil";
import { CartItem } from "../models/cartItem";
import { cartItemsState } from "../recoil/atoms";
import Cart from "./components/Cart";
import CheckNavbar from "./components/checkNavbar";
import RestaurantMenu from "./components/RestaurantMenu";

function Menu() {
  //console.log("menu rendered");
  // navbar scrollup and down logic
  //let prev= window.scrollY;
  const list: CartItem[] = useRecoilValue(cartItemsState);
  return (
    <div>
      <CheckNavbar />
      <RestaurantMenu />
      {list && (list.length > 0 ? <Cart /> : <></>)}
      {/* <Cart /> */}
    </div>
  );
}

export default React.memo(Menu);
