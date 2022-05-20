import React from "react";
import LoggedNavbar from "./loggedNavbar";
import Navbar from "./navbar";

function CheckNavbar() {
  // console.log("CheckNavbar rendered");
  const loggedIn = false;
  return loggedIn ? <LoggedNavbar /> : <Navbar />;
}

export default CheckNavbar;
