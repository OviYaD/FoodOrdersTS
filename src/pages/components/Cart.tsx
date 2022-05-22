import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { clearCart, updateCartItem } from "../../firestore";
import { CartItem } from "../../models/cartItem";
import { cartItemsState } from "../../recoil/atoms";

function Cart() {
  //console.log("Cart rendered");
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  let totalCost = 0;
  const totalItems = cartItems.length;

  cartItems.forEach((item: CartItem) => {
    totalCost += item.product.price * item.quantity;
  });

  const navigate = useNavigate();

  const btnPopup = () => {
    (document.getElementById("clrCart") as HTMLElement).classList.add("vs");
  };

  const onClearCart = async () => {
    (document.getElementById("clrCart") as HTMLElement).classList.remove("vs");
    await clearCart(cartItems);
    setCartItems([]);
  };

  const increment = (data: CartItem) => {
    let newList: CartItem[] = cartItems.map((item: CartItem) => {
      if (item.product.name === data.product.name) {
        let cartItem = new CartItem(
          item.id,
          item.product,
          item.quantity + 1,
          item.uid
        );

        updateCartItem(cartItem);
        return cartItem;
      } else return item;
    });
    setCartItems(newList);
  };

  const decrement = (data: CartItem) => {
    let newList = cartItems
      .map((item: CartItem) => {
        if (item.product.name === data.product.name) {
          let cartItem = new CartItem(
            item.id,
            item.product,
            item.quantity - 1,
            item.uid
          );
          updateCartItem(cartItem);
          return cartItem;
        } else return item;
      })
      .filter((item: CartItem) => item.quantity !== 0);

    setCartItems(newList);
  };
  const authorize = () => {
    return navigate("/checkout");
  };
  return (
    <>
      {cartItems.length && (
        <div className="cartNav bg-body p-2 text-dark border-top">
          <div className="container-cart p-2 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBottom"
                onClick={btnPopup}
              >
                <i className="bi bi-chevron-double-up text-dark"></i>
              </button>
              <div className="h4">{`Your Orders (${totalItems})`}</div>
              <div className="h4">Subtotal: &#8377;{totalCost}</div>
              <div className="d-inline-flex">
                <button
                  type="button"
                  id="clrCart"
                  className="btn btn-outline-danger invisible me-2"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasBottom"
                  onClick={onClearCart}
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={authorize}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {cartItems.length && (
        <div
          className="offcanvas offcanvas-bottom"
          //   tabIndex="-1"
          id="offcanvasBottom"
        >
          <div className="offcanvas-header">
            <h3 className="offcanvas-title" id="offcanvasBottomLabel">
              Your Orders
            </h3>
            <div>
              <button
                type="button"
                id="close"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <hr />
          <div className="offcanvas-body small">
            <table className="table">
              <tbody>
                {cartItems.map((l: CartItem) => (
                  <tr key={l.id}>
                    <td className="h5">
                      <span>
                        <i
                          className={`bi bi-circle-fill ${
                            l.product.type === "veg" ? "greenColor" : "redColor"
                          }`}
                        ></i>
                      </span>
                      {l.product.name}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-danger"
                          onClick={() => decrement(l)}
                        >
                          -
                        </button>
                        <button className="btn btn-danger">{l.quantity}</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => increment(l)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>&#8377;{l.quantity * l.product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Cart);
