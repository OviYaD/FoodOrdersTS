import React from "react";
import LoggedNavbar from "./loggedNavbar";
import Navbar from "./navbar";
import { useRecoilValue } from "recoil";
import { loginState } from "../../recoil/atoms";

function CheckNavbar() {
  const loggedIn = useRecoilValue(loginState);
  return loggedIn ? <LoggedNavbar /> : <Navbar />;
}

export default CheckNavbar;
