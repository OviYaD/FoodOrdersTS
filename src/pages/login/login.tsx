import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const usersCollectionRef = collection(db, "users");

function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({ mail: "", psd: "" });
  const [msg, setMsg] = useState("");
  let flag = false;
  //console.log("login rendered");

  //   useEffect(() => {
  //     //navigate to specific page after login
  //     if (loggedIn === true) {
  //       if (orderedItems && orderedItems.length) {
  //         //got to checkout page
  //         //flag=true;
  //         setTimeout(() => {
  //           history.replace("/checkout");
  //         }, 1000);
  //       } else {
  //         //go to menu page
  //         history.replace("/");
  //       }
  //     }
  //   }, [loggedIn]);

  const onLogin = async (e: any) => {
    e.preventDefault();
    console.log(userLogin);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, userLogin.mail, userLogin.psd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMsg(errorMessage);
      });
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };
  return (
    <>
      <form className="form1" onSubmit={onLogin}>
        <h2>Login</h2>
        <br />
        <div className="form-group d-flex flex-column g-2">
          <label htmlFor="email" className="form-label m-2 h5">
            Email
          </label>
          <input
            type="email"
            name="mail"
            className="form-control-lg"
            value={userLogin.mail}
            onChange={onChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group d-flex flex-column g-2">
          <label htmlFor="password" className="form-label m-2 h5">
            Password
          </label>
          <input
            type="password"
            name="psd"
            className="form-control-lg"
            value={userLogin.psd}
            onChange={onChange}
            placeholder="Password"
            required
          />
        </div>
        <button className="btn btn-primary btn-lg m-3 ms-0">Sign in</button>
        {msg && <span style={{ color: "red", padding: "5px" }}>{msg}</span>}
        <hr />
        <span>
          Don't have an account? | <Link to="/register">Register Here</Link>
        </span>
      </form>
    </>
  );
}

export default Login;
