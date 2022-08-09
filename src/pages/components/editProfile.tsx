import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { userInfoState } from "../../recoil/atoms";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { User, userConverter } from "../../models/user";
import { useRecoilValue } from "recoil";
import CheckNavbar from "./checkNavbar";
import Footer from "./Footer";
const usersCollectionRef = collection(db, "products");

function EditUser() {
  const userInfo = useRecoilValue(userInfoState);
  const [user, setUser] = useState({
    name: "",
    address: "",
    contact: "",
    aadhaar: "",
  });

  // console.log(userInfo?.name);
  const changeMe = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    // console.log(userInfo);
    setUser({
      name: userInfo?.name,
      address: userInfo?.address,
      contact: userInfo?.contact,
      aadhaar: userInfo?.aadhaar,
    });
  });

  const updateMe = async (e: any) => {
    e.preventDefault();
    console.log(user);
    const { name, address, contact } = user;
    try {
      const userRef = doc(db, "users", userInfo?.id).withConverter(
        userConverter
      );

      await setDoc(
        userRef,
        new User(
          userInfo.id,
          name,
          userInfo.mail,
          address,
          userInfo.aadhaar,
          contact
        )
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const success = {
    padding: "10px 15px",
    border: "1px solid green",
    color: "green",
  };
  const fail = { padding: "10px 15px", border: "1px solid red", color: "red" };

  return (
    <>
      <CheckNavbar />
      <img
        className="img-fluid col-md-12 bg obj-fit-cover"
        style={{ minHeight: "100vh" }}
        src="https://i.pinimg.com/originals/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg"
        alt=""
      />
      <form className="form1" onSubmit={updateMe}>
        <h2>EDIT PROFILE</h2>
        <br />
        <div className="d-flex flex-column">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="name" className="form-label m-2 h5">
                Name:
              </label>
              <input
                type="text"
                name="name"
                placeholder=""
                className="form-control"
                value={user.name}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label m-2 h5">
                Email:
              </label>
              <input
                type="text"
                name="email"
                placeholder=""
                className="form-control"
                value={userInfo?.mail}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="aadhaar" className="form-label m-2 h5">
                Aadhaar Number:
              </label>
              <input
                type="text"
                name="aadhaar"
                placeholder=""
                className="form-control"
                value={user.aadhaar}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact" className="form-label m-2 h5">
                Contact:
              </label>
              <input
                type="text"
                name="contact"
                placeholder=""
                className="form-control"
                value={user.contact}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label m-2 h5">
                Address:
              </label>
              <input
                type="text"
                name="address"
                placeholder=""
                className="form-control"
                value={user.address}
                onChange={changeMe}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary my-3 h4">UPDATE</button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default React.memo(EditUser);
