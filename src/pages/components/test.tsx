import React from "react";
import HomeInfoCard from "./homeInfoCard";
import { Link } from "react-router-dom";

function Test() {
  return (
    <div className="">
      <img
        className="img-fluid col-md-12 bg obj-fit-cover"
        style={{ minHeight: "200%" }}
        src="https://i.pinimg.com/originals/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg"
        alt=""
      />
      <div className="infoCardContainer d-flex flex-wrap justify-content-center align-items-center bd-grey">
        <Link to="/menu">
          <HomeInfoCard
            infoImg="https://cdn.pixabay.com/photo/2018/03/07/18/42/menu-3206749_960_720.jpg"
            infoTitle="Order your favourite food"
            infoLink="Check the Menu"
          />
        </Link>
        <Link to="#">
          <HomeInfoCard
            infoImg="https://images.squarespace-cdn.com/content/v1/56e33390b6aa60415bb5ff39/1477050412477-Q6ZG3W3JNFQZPFC4CHIP/Hours-Location-ICONS.jpg"
            infoTitle=" Outer Ring Rd, J P Nagar, Bangalore-560078"
            infoLink={`All days
            10AM - 9PM`}
          />
        </Link>
        <Link to="#">
          <HomeInfoCard
            infoImg="https://images.squarespace-cdn.com/content/v1/56e33390b6aa60415bb5ff39/1477050412477-Q6ZG3W3JNFQZPFC4CHIP/Hours-Location-ICONS.jpg"
            infoTitle=" Outer Ring Rd, J P Nagar, Bangalore-560078"
            infoLink={`All days
            10AM - 9PM`}
          />
        </Link>
        <Link to="#">
          <HomeInfoCard
            infoImg="https://images.squarespace-cdn.com/content/v1/56e33390b6aa60415bb5ff39/1477050412477-Q6ZG3W3JNFQZPFC4CHIP/Hours-Location-ICONS.jpg"
            infoTitle=" Outer Ring Rd, J P Nagar, Bangalore-560078"
            infoLink={`All days
            10AM - 9PM`}
          />
        </Link>
        <Link to="#">
          <HomeInfoCard
            infoImg="https://images.squarespace-cdn.com/content/v1/56e33390b6aa60415bb5ff39/1477050412477-Q6ZG3W3JNFQZPFC4CHIP/Hours-Location-ICONS.jpg"
            infoTitle=" Outer Ring Rd, J P Nagar, Bangalore-560078"
            infoLink={`All days
            10AM - 9PM`}
          />
        </Link>
        <Link to="#">
          <HomeInfoCard
            infoImg="https://images.squarespace-cdn.com/content/v1/56e33390b6aa60415bb5ff39/1477050412477-Q6ZG3W3JNFQZPFC4CHIP/Hours-Location-ICONS.jpg"
            infoTitle=" Outer Ring Rd, J P Nagar, Bangalore-560078"
            infoLink={`All days
            10AM - 9PM`}
          />
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Test);
