import React from "react";
import CheckNavbar from "./components/checkNavbar";
import Footer from "./components/Footer";
import HomeInfoCardContainer from "./components/homeInfoCardContainer";
import "./css/home-cards.css";
function Home() {
  return (
    <div>
      <CheckNavbar />
      <HomeInfoCardContainer />
      <Footer />
    </div>
  );
}

export default React.memo(Home);
