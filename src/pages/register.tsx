import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const usersCollectionRef = collection(db, "users");

function Register() {
  const [user, setUser] = useState({
    mail: "admin@gmail.com",
    psd: "123456",
    addr: "address",
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
    const { mail, psd, addr } = user;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, mail, psd)
      .then(async (userCredential) => {
        console.log("Registered");
        try {
          const docRef = await addDoc(usersCollectionRef, {
            mail: mail,
            address: addr,
          });
          console.log("Document written with ID: ", docRef.id);
          navigate("/");
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
    <form className="form1" onSubmit={registerMe}>
      <h2>Register Form</h2>
      <br />
      <div className="d-flex flex-column">
        <div className="form-group">
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
          <label htmlFor="address" className="form-label m-2 h5">
            Address
          </label>
          <textarea
            name="addr"
            placeholder="Address"
            className="form-control"
            value={user.addr}
            onChange={changeMe}
            required
          />
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
  );
}

export default Register;
