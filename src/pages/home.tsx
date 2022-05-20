import React from "react";
import CheckNavbar from "./components/checkNavbar";
import HomeInfoCardContainer from "./components/homeInfoCardContainer";

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
