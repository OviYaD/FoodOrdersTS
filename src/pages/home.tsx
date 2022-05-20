import React, { useEffect } from "react";
import CheckNavbar from "./components/checkNavbar";
import Footer from "./components/Footer";
import HomeInfoCardContainer from "./components/homeInfoCardContainer";

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
