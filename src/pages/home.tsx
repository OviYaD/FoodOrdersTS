import React from "react";
import CheckNavbar from "./checkNavbar";
import HomeInfoCardContainer from "./homeInfoCardContainer";
import Navbar from "./navbar";

function Home() {
  //console.log("home rendered");
  return (
    <div>
      <CheckNavbar />
      <HomeInfoCardContainer />
    </div>
  );
}

export default React.memo(Home);
