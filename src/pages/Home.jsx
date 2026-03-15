import React from "react";
import LoginPage from "../pages/LoginPage";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="px-2 py-2">
      <Outlet />
    </div>
  );
};

export default Home;
