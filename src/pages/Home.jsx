import React from "react";
import LoginPage from "../pages/LoginPage";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default Home;
