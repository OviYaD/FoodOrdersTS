import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User, userConverter } from "../models/user";
import 'aadhaar-validator'//npm i aadhaar-validator
// insert aadhaar number if valid
// const aadharValidator = require("aadhaar-validator")
// const isvalidUser = aadharValidator.isValidNumber('0000000000000000') 

function Register() {
  const [user, setUser] = useState({
    uname: "",
    mail: "admin@gmail.com",
    psd: "123456",
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
  const registerMe = async (e: any) => {
    e.preventDefault();
    console.log(user);
    const { uname, mail, psd } = user;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, mail, psd)
      .then(async (userCredential) => {
        // userCredential.user.sendEmailVerification();
        console.log("Registered");
        try {
          const userRef = doc(
            db,
            "users",
            userCredential.user.uid
          ).withConverter(userConverter);

          await setDoc(
            userRef,
            new User(userCredential.user.uid, uname, mail, "", "", "")
          );

          navigate("/addDetails");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMsg(errorMessage);
      });
  };
  return (
    <>
      <img
        className="img-fluid col-md-12 bg obj-fit-cover"
        style={{ minHeight: "100vh" }}
        src="https://i.pinimg.com/originals/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg"
        alt=""
      />
      <form className="form1" onSubmit={registerMe}>
        <h2>Register Form</h2>
        <br />
        <div className="d-flex flex-column">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="email" className="form-label m-2 h5">
                Name
              </label>
              <input
                type="text"
                name="uname"
                placeholder="Name"
                className="form-control"
                value={user.uname}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label m-2 h5">
                Email
              </label>
              <input
                type="email"
                name="mail"
                placeholder="Email"
                className="form-control"
                value={user.mail}
                onChange={changeMe}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label m-2 h5">
                Password
              </label>
              <input
                type="password"
                name="psd"
                placeholder="Password"
                className="form-control"
                value={user.psd}
                onChange={changeMe}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary my-3 h4">Sign Up</button>
          <div
            className="h5 text-center"
            style={msg === "" ? {} : msg.includes("Success") ? success : fail}
          >
            {msg}
          </div>
          <hr />
          <span>
            Already have an account? | <Link to="/login">Sign in</Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default Register;
