import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atoms";

function Cart() {
  //console.log("Cart rendered");
  const isLoggedIn = useRecoilValue(loginState);
  const list: any[] = [];
  const totalCost = 0;
  const totalItems = 0;

  const navigate = useNavigate();

  const btnPopup = () => {
    (document.getElementById("clrCart") as HTMLElement).classList.add("vs");
  };

  const clearCart = () => {};
  const increment = (data: any) => {};
  const decrement = (data: any) => {};
  const authorize = () => {
    return navigate("/checkout");
  };
  return (
    <>
      {list.length && (
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
                  onClick={clearCart}
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
      {list.length && (
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
                {list.map((l) => (
                  <tr key={l.itemName}>
                    <td className="h5">
                      <span>
                        <i
                          className={`bi bi-circle-fill ${
                            l.vegan === "veg"
                              ? "greenColor"
                              : l.vegan === "Non veg"
                              ? "redColor"
                              : "yellowColor"
                          }`}
                        ></i>
                      </span>
                      {l.itemName}
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
                    <td>&#8377;{l.quantity * l.price}</td>
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