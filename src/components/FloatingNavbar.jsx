import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";

const FloatingNavbar = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-300 shadow-lg flex justify-around py-2">
      <NavLink
        to="/home/dashboard"
        className="flex flex-col items-center text-gray-600 text-sm"
      >
        <IoMdHome className="text-xl" />
        Add Bill
      </NavLink>

      <NavLink
        to="/home/search-bills"
        className="flex flex-col items-center text-gray-600 text-sm"
      >
        <IoIosSearch className="text-xl" />
        Search
      </NavLink>

      <NavLink
        to="/home/all-bills"
        className="flex flex-col items-center text-gray-600 text-sm"
      >
        <RiContactsBook2Fill className="text-xl" />
        Records
      </NavLink>
    </div>
  );
};

export default FloatingNavbar;
