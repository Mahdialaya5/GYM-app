import React from "react";
import CardsList from "../CardsList/CardsList";
import "./home.css";
import Navbar from "../Navbar/Navbar";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <CardsList />
      
    </div>
  );
}

export default Home;
