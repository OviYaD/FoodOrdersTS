import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const usersCollectionRef = collection(db, "products");

function AddProducts() {
  const [user, setUser] = useState({ item: "", type: "", price: "" });
  const [msg, setMsg] = useState("");
  const [users, checkuser] = useState([]);
  const [checkedState, setCheckedState] = useState(new Array());

  // const history = useHistory();
  // useEffect(() => {
  //   if (msg.includes("Success")) {
  //     setTimeout(() => {
  //       history.push("/login");
  //       setMsg("");
  //     }, 1000);
  //   }
  // }, [msg, history]);

  const handleOnChange = (position) => {
    if (!checkedState.includes(position)) {
      checkedState.push(position);
    } else {
      checkedState.pop(position);
    }
    console.log(checkedState, position);
  };

  const changeMe = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const emptyField = () => {
    setUser({
      ...user,
      ["item"]: "",
      ["type"]: "",
      ["price"]: "",
    });
  };
  const success = {
    padding: "10px 15px",
    border: "1px solid green",
    color: "green",
  };
  const fail = { padding: "10px 15px", border: "1px solid red", color: "red" };
  const registerMe = async (e) => {
    e.preventDefault();
    console.log(users);
    console.log(checkedState);
    await addDoc(usersCollectionRef, {
      product_name: user["item"],
      product_type: user["type"],
      price: user["price"],
      category: checkedState,
    });
    alert("Product Added Successfully");
    emptyField();
    for (var i = 0; i < 3; i++) {
      if (checkedState[i]) {
        handleOnChange(i);
      }
    }
  };
  return (
    <form className="form1" onSubmit={registerMe}>
      <h2>ADD PRODUCTS</h2>
      <br />
      <div className="d-flex flex-column">
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="item" className="form-label m-2 h5">
              Food Item:
            </label>
            <input
              type="text"
              name="item"
              placeholder="Food Item"
              className="form-control"
              value={user.item}
              onChange={changeMe}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-label m-2 h5">
              Food Type:
            </label>
            <input
              type="text"
              name="type"
              placeholder="Veg or Non-veg"
              className="form-control"
              value={user.type}
              onChange={changeMe}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label m-2 h5">
              Price:
            </label>
            <input
              type="text"
              name="price"
              placeholder="price"
              className="form-control"
              value={user.price}
              onChange={changeMe}
              required
            />
          </div>
          <div className="form-group"></div>
          <label htmlFor="address" className="form-label m-2 h5">
            Category:
          </label>
          <br />
          <input
            type="checkbox"
            id="0"
            name="breakfast"
            value="breakfast"
            onChange={() => handleOnChange("breakfast")}
          />
          <label htmlFor="0" className="form-label m-2 h5">
            breakfast
          </label>
          <br />

          <input
            type="checkbox"
            id="1"
            name="lunch"
            value="lunch"
            onChange={() => handleOnChange("lunch")}
          />
          <label htmlFor="1" className="form-label m-2 h5">
            Lunch
          </label>
          <br />

          <input
            type="checkbox"
            id="2"
            name="dinner"
            value="dinner"
            onChange={() => handleOnChange("dinner")}
          />
          <label htmlFor="2" className="form-label m-2 h5">
            Dinner
          </label>
        </div>
        <button className="btn btn-primary my-3 h4">ADD PRODUCT</button>
      </div>
    </form>
  );
}

export default React.memo(AddProducts);
