import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";
import auth from "./appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "./redux/profileSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FloatingNavbar from "./components/FloatingNavbar";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { loginStatus } = useSelector((state) => state.profileSlice);
  const navigate = useNavigate();
  const currentUserSession = async () => {
    try {
      setLoading(true);
      const user = await auth.getCurrentUser();
      if (user) {
        dispatch(logIn(user));
        navigate("/home/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("No active session");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    currentUserSession();
  }, []);

  return loading ?
      <div className="w-full my-30 flex flex-col items-center justify-center gap-3">
        <AiOutlineLoading3Quarters className="text-4xl animate-spin text-blue-600" />
        <p className="text-gray-500">Loading...</p>
      </div>
    : <>
        <Toaster />

        <div className="relative w-full min-h-screen flex flex-col gap-4 bg-[#f4f4f7]">
          <header>
            <NavBar />
          </header>

          <section className="pb-20">
            <Home />
          </section>

          {loginStatus && (
            <section className="fixed bottom-0 w-full">
              <FloatingNavbar />
            </section>
          )}
        </div>
      </>;
};

export default App;
