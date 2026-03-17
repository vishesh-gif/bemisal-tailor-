import React, { useState } from "react";
import InputField from "../utils/InputField";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import customerService from "../appwrite/customerService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Dashboard = () => {
  const userId = useSelector((state) => state.profileSlice?.userData?.$id);
  const [loading, setLoading] = useState(false);
  const [compressedImage, setCompressedImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const handleImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const imageUrl = await uploadImage(file);
    if (imageUrl) setLoading(false);
  };

  const uploadImage = async (file) => {
    try {
      setLoading(true);
      // 🔹 Compress image first
      const options = {
        maxSizeMB: 0.2, // 200KB
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // 🔹 Upload compressed image
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", "my_unsigned_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlc935yfl/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      setCompressedImage(data);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!compressedImage) {
        toast.error("Please upload a bill image");
        return;
      }

      const createCustomer = customerService.create_Customer(userId, {
        ...data,
        bill_image_id: compressedImage.secure_url,
        public_id: compressedImage.public_id,
      });
      if (createCustomer) toast.success("Customer added");
      reset();
      setCompressedImage(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error(data.error?.message || "customer adding failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 py-4 bg-slate-100 flex justify-center">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Customer Registration</h1>
          <p className="text-gray-500 text-sm">Create customer</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <InputField
            label="Customer Name"
            placeholder="Enter customer name"
            {...register("name", {
              required: "Customer Name is required",
            })}
          />
          <InputField
            label="Bill Number"
            type="text"
            placeholder="Enter bill number"
            {...register("billNumber", {
              required: "billNumber is required",
            })}
          />

          <InputField
            label="Phone Number"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter phone number"
            {...register("phoneNumber", {
              required: "Phone Number Name is required",
            })}
          />

          {/* <Bill_Image /> */}
          <InputField
            label="Photo"
            type="file"
            accept="image/*,.jpg,.jpeg,.png"
            capture="environment"
            onChange={handleImage}
          />
          {compressedImage && (
            <img src={compressedImage.secure_url} alt="" width="250" />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#3171c9] text-white py-2 rounded-lg font-semibold hover:bg-[#1e61c0] transition ${loading ? "cursor-not-allowed opacity-80" : ""}`}
          >
            {loading ?
              <AiOutlineLoading3Quarters className="text-4xl animate-spin text-white m-auto" />
            : "SAVE BILL"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
