import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User, userConverter } from "../models/user";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/atoms";

function UserDetails() {
  const userInfo = useRecoilValue(userInfoState);
  const [user, setUser] = useState({
    aadhaar: "",
    contact: "",
    address: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const changeMe = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const success = {
    padding: "10px 15px",
    border: "1px solid green",
    color: "green",
  };
  const fail = { padding: "10px 15px", border: "1px solid red", color: "red" };
  const addDetails = async (e: any) => {
    e.preventDefault();
    console.log(user);
    const { aadhaar, contact, address } = user;
    const auth = getAuth();

    try {
      const userRef = doc(db, "users", userInfo?.id).withConverter(
        userConverter
      );

      await setDoc(
        userRef,
        new User(
          userInfo?.id,
          userInfo?.name,
          userInfo?.mail,
          address,
          aadhaar,
          contact
        )
      );

      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <img
        className="img-fluid col-md-12 bg obj-fit-cover"
        style={{ minHeight: "100vh" }}
        src="https://i.pinimg.com/originals/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg"
        alt=""
      />
      <form className="form1" onSubmit={addDetails}>
        <h2>Register Form</h2>
        <br />
        <div className="d-flex flex-column">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="aadhaar" className="form-label m-2 h5">
                Aadhaar Number:
              </label>
              <input
                type="text"
                name="aadhaar"
                placeholder="Aadhaar Number"
                className="form-control"
                value={user.aadhaar}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="conatct" className="form-label m-2 h5">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                className="form-control"
                value={user.contact}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label m-2 h5">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Address"
                className="form-control"
                value={user.address}
                onChange={changeMe}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary my-3 h4">ADD</button>
        </div>
      </form>
    </>
  );
}

export default UserDetails;
