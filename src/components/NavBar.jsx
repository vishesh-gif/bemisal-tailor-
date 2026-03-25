import React from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/profileSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout_user } from "../firebase/services/firebase_auth_service";
const NavBar = () => {
  const { loginStatus } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const log_Out = await logout_user();

      if (log_Out) {
        dispatch(logOut()); // 🔥 update state first
        toast.success("Logout successfully");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      throw new Error(data.error?.message || "Log out failed");
    }
  };
  return (
    <div className="relative w-full p-3 bg-[#3171c9] text-center text-white">
      <h1 className="text-2xl font-semibold">BEMISAL TAILOR</h1>
      <p>Bill Entry System</p>

      {loginStatus && (
        <div className="absolute right-3 top-3">
          <button onClick={() => handleClick()} className="cursor-pointer">
            <MdLogout className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
