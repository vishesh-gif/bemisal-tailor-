import React, { useState } from "react";
import InputField from "../utils/InputField";
import { SlEnvolope } from "react-icons/sl";
import { TiLockClosed } from "react-icons/ti";
import { useForm } from "react-hook-form";
import auth from "../appwrite/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const session = await auth.login(data);

      if (session) {
        const user = await auth.getCurrentUser();
        dispatch(logIn(user));
        setLoading(false);
        navigate("/home/dashboard");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-[#374252] text-center mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <InputField
            label={
              <span className="flex items-center gap-1">
                <SlEnvolope />
                Email
              </span>
            }
            type="email"
            placeholder=" Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <InputField
            label={
              <span className="flex items-center gap-1">
                <TiLockClosed />
                Password
              </span>
            }
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "password is required",
            })}
          />

          <button
            type="submit"
            className="w-full bg-[#3171c9] text-white py-3 rounded-lg font-semibold hover:bg-[#1e61c0] transition"
          >
            {loading ?
              <span className="text-center">
                <AiOutlineLoading3Quarters className="text-4xl animate-spin text-white m-auto" />
              </span>
            : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
