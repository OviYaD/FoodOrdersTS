import React from "react";
import HomeInfoCard from "../homeInfoCard";
import { Link } from "react-router-dom";
import CheckNavbar from "../checkNavbar";

function adminHome() {
  return (
    <div className="">
      <CheckNavbar />

      <img
        className="img-fluid col-md-12 bg obj-fit-cover"
        style={{ minHeight: "100vh" }}
        src="https://i.pinimg.com/originals/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg"
        alt=""
      />
      <div className="infoCardContainer d-flex flex-wrap justify-content-center align-items-center bd-grey">
        <Link to="/vendorList">
          <HomeInfoCard
            infoImg="https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206749_960_720.jpg"
            infoTitle="Vendors"
            infoLink="Check vendor list"
          />
        </Link>

        <Link to="/userList">
          <HomeInfoCard
            infoImg="https://images.squarespace-cdn.com/content/v1/56e33390b6aa60415bb5ff39/1477050412477-Q6ZG3W3JNFQZPFC4CHIP/Hours-Location-ICONS.jpg"
            infoTitle="Users"
            infoLink="Check vendor list"
          />
        </Link>
      </div>
    </div>
  );
}

export default React.memo(adminHome);
