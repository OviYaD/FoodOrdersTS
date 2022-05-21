import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Product } from "../models/product";
import { ProductCollection, productState } from "../recoil/atoms";
import MenuCard from "./MenuCard";

function RestaurantMenu() {
  const products: any = useRecoilValue(productState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //   useEffect(()=>{
  //     //console.log("Restaurant menu rendered");
  //     if(products.length ===0){
  //     axios.get('https://my-json-yumito-server.herokuapp.com/menu')
  //     .then(response =>{
  //       store.set('error', '');
  //       store.set('loading', false);
  //       store.set('products', response.data);
  //       setLoading(false);
  //       setError('');
  //       setproducts(response.data);
  //     })
  //     .catch((e)=>{
  //       store.set('loading', false);
  //       store.set('error', e.message);
  //       setError(e.message);
  //     })
  //   }
  // },[products])

  return error !== "" ? (
    <h2 className="text-center text-danger border border-dark p-2 position-absolute top-50 start-50 translate-middle">{`${error}. Please try after sometime`}</h2>
  ) : loading === false ? (
    <div className="container-fluid menuLayout">
      {products &&
        products.map((item: Product) => (
          <div key={item.name} className="container d-flex flex-column">
            <div className="h3 tt" id={item.category[0]}>
              {item.category}
            </div>
            <div className="menuCardWrapper d-flex flex-wrap">
              {item.products &&
                item.products.map((i) => <MenuCard data={i} key={i.id} />)}
            </div>
          </div>
        ))}
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
