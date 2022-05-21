import React from "react";

function MenuCard({ data }: any) {
  //console.log("menucard rendered");

  const sendId = (id: any) => {};

  const increment = () => {};

  const colorCircle =
    data.type.toLowerCase() === "veg" ? (
      <i className="bi bi-circle-fill greenColor"></i>
    ) : data.type.toLowerCase() === "egg" ? (
      <i className="bi bi-circle-fill yellowColor"></i>
    ) : (
      <i className="bi bi-circle-fill redColor"></i>
    );

  return (
    <>
      <div
        key={data.name}
        className="menuCard d-flex justify-content-between flex-wrap"
        onClick={() => sendId(data.name)}
      >
        <div className="d-flex flex-column itemDescription">
          <div>
            <div className="h5">{data.itemName}</div>
            <div>
              {colorCircle} {data.type}
            </div>
            <div>{data.name ?? ""}</div>
          </div>
          <div className="py-2">&#8377;{`${data.price}.00`}</div>
          <button
            type="button"
            className="btn btn-outline-warning mt-auto p-2 w-50 addCart"
            onClick={increment}
          >
            Add to cart
          </button>
        </div>
        <div className="menuCardImg position-relative">
          <img
            alt=""
            className="img-fluid img-rounded"
            src={
              data.img ??
              "https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI="
            }
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(MenuCard);
