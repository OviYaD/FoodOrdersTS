import React from "react";
import Cart from "./Cart";
import CategoryBar from "./CategoryBar";
import RestaurantMenu from "./RestaurantMenu";

function Menu() {
  //console.log("menu rendered");
  // navbar scrollup and down logic
  //let prev= window.scrollY;
  const list: any[] = [];
  return (
    <div>
      <CategoryBar />
      <RestaurantMenu />
      {list && (list.length > 0 ? <Cart /> : <></>)}
    </div>
  );
}

export default React.memo(Menu);
