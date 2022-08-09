import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { productState } from "../../../recoil/atoms";
import CheckNavbar from "../checkNavbar";
import MenuCard from "../MenuCard";

function UserList() {
  const products: any = useRecoilValue(productState);

  const [loading, setLoading] = useState(false);

  return loading === false ? (
    //  Breakfast
    <>
      <CheckNavbar />
      <div className="container-fluid menuLayout">
        <div key={"breakfast"} className="container d-flex flex-column">
          <div className="h3 tt" id={"breakfast"}>
            Users
          </div>
          <div className="menuCardWrapper d-flex flex-wrap">
            {products.breakfast.map((i: any) => (
              <MenuCard data={i} key={i.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <CheckNavbar />
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
    </>
  );
}

export default React.memo(UserList);
