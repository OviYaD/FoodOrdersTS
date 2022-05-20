import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [userLogin, setUserLogin] = useState({
    mail: "admin@gmail.com",
    psd: "123456",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e: any) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, userLogin.mail, userLogin.psd)
      .then((userCred) => {
        navigate("/");
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
