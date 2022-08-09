import React from "react";
import CheckNavbar from "../checkNavbar";
import Footer from "../Footer";
import HomeInfoCardContainer from "../homeInfoCardContainer";
import "./css/home-cards.css";
function AdminHome() {
  return (
    <div>
      <CheckNavbar />
      <HomeInfoCardContainer />
      <Footer />
    </div>
  );
}

export default React.memo(AdminHome);
