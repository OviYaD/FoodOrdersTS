import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { productState } from "../../recoil/atoms";
import MenuCard from "./MenuCard";

function RestaurantMenu() {
  const products: any = useRecoilValue(productState);
  const [loading, setLoading] = useState(false);

  return loading === false ? (
    //  Breakfast
    <div className="container-fluid menuLayout">
      <div key={"breakfast"} className="container d-flex flex-column">
        <div className="h3 tt" id={"breakfast"}>
          Breakfast
        </div>
        <div className="menuCardWrapper d-flex flex-wrap">
          {products.breakfast.map((i: any) => (
            <MenuCard data={i} key={i.name} />
          ))}
        </div>
      </div>

      {/* LUNCH  */}
      <div key={"lunch"} className="container d-flex flex-column">
        <div className="h3 tt" id={"lunch"}>
          Lunch
        </div>
        <div className="menuCardWrapper d-flex flex-wrap">
          {products.lunch.map((i: any) => (
            <MenuCard data={i} key={i.name} />
          ))}
        </div>
      </div>

      {/* Dinner */}
      <div key={"dinner"} className="container d-flex flex-column">
        <div className="h3 tt" id={"dinner"}>
          Dinner
        </div>
        <div className="menuCardWrapper d-flex flex-wrap">
          {products.dinner.map((i: any) => (
            <MenuCard data={i} key={i.name} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="spinnerBlock d-flex justify-content-center">
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default React.memo(RestaurantMenu);
