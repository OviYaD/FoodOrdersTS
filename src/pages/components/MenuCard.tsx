import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addToCart, updateCartItem } from "../../firestore";
import { CartItem } from "../../models/cartItem";
import { Product } from "../../models/product";
import { cartItemsState, userInfoState } from "../../recoil/atoms";

function MenuCard({ data }: any) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const userInfo = useRecoilValue(userInfoState);
  const onAddToCart = async (data: Product) => {
    let itemFound = false;
    let cartItem: CartItem;

    let newList = cartItems.map((item: CartItem) => {
      if (item.product.id === data.id) {
        itemFound = true;
        cartItem = new CartItem(
          item.id,
          item.product,
          item.quantity + 1,
          item.uid
        );
        return cartItem;
      } else {
        return item;
      }
    });

    if (!itemFound) {
      cartItem = new CartItem("", data, 1, userInfo.id);
      await addToCart(cartItem);
      newList.push(cartItem);
    } else {
      console.log(cartItem!);
      await updateCartItem(cartItem!);
    }
    setCartItems(newList);
  };

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
        key={data.id}
        className="menuCard d-flex justify-content-between flex-wrap"
      >
        <div className="d-flex flex-column itemDescription">
          <div>
            <div className="h5">{data.name}</div>
            <div>
              {colorCircle} {data.type.toUpperCase()}
            </div>
          </div>
          <div className="py-2">&#8377;{`${data.price}.00`}</div>
          <button
            type="button"
            className="btn btn-outline-warning mt-auto p-2 w-50 addCart"
            onClick={() => onAddToCart(data)}
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
