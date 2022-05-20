import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const usersCollectionRef = collection(db, "users");

function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({ mail: "", psd: "" });
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

  const checkCred = async (e: any) => {
    flag = true;
    e.preventDefault();
    // console.log(userLogin);
    let users;
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      users = data.docs.map((doc) => doc.data());
      //   console.log(users);
      let out = "false";
      let psd;
      const res = users.map((use, id) => {
        // console.log(use.email);
        console.log(userLogin["mail"]);
        console.log(userLogin["psd"]);
        console.log(use.email);
        console.log(use.password);
        console.log(use.email.includes(userLogin["mail"]));
        console.log(out);
        if (
          use.email.includes(userLogin["mail"]) &&
          use.password === userLogin["psd"]
        ) {
          //   out = true;

          return;
        } else {
          return "false";
        }
      });
      // console.log("out=", out === true);
      //   if (out) {
      //     flag = false;
      //     iL.method({
      //       type: "checkUser",
      //       payload: data,
      //       user: userLogin,
      //     });
      //   } else {
      //     flag = false;
      //     alert("Please enter valid credentials");
      //   }
    };

    getUsers();
  };
  const loginMe = (e: any) => {
    const { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };
  return (
    <>
      <form className="form1" onSubmit={checkCred}>
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
            onChange={loginMe}
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
            onChange={loginMe}
            placeholder="Password"
            required
          />
        </div>
        <button className="btn btn-primary btn-lg m-3 ms-0">Sign in</button>
        {/* {msg  && <span style={{color:'red',padding:'5px'}}>{msg}</span> } */}
        <hr />
        <span>
          Don't have an account? | <Link to="/register">Register Here</Link>
        </span>
      </form>
    </>
  );
}

export default Login;
