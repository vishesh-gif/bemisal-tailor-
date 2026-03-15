import React, { useState } from "react";
import InputField from "../utils/InputField";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
import Bill_Image from "../components/Bill_Image";
import customerService from "../appwrite/customerService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import storageService from "../appwrite/storageService";
import { addBillImage } from "../redux/bill_image_Slice";

const Dashboard = () => {
  const userId = useSelector((state) => state.profileSlice?.userData?.$id);
  const [compressedImage, setCompressedImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const handleImage = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const compressedRealFile = new File([compressedFile], file.name, {
        type: compressedFile.type,
      });
      setCompressedImage(compressedRealFile);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!compressedImage) {
        toast.error("Please upload a bill image");
        return;
      }
      const uploadBillImage =
        await storageService.upload_Bill_Image(compressedImage);
      if (!uploadBillImage) return;
      const createCustomer = customerService.create_Customer(userId, {
        ...data,
        bill_image_id: uploadBillImage.$id,
      });
      if (createCustomer) toast.success("Customer added");
      reset();
      setCompressedImage(null);
    } catch (error) {
      console.log(error);
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
            label="Bill Number"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter bill number"
            {...register("billNumber", {
              required: "billNumber is required",
            })}
          />

          <InputField
            label="Customer Name"
            placeholder="Enter customer name"
            {...register("name", {
              required: "Customer Name is required",
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
            accept="image/*"
            capture="environment"
            onChange={handleImage}
          />
          {compressedImage && (
            <img
              src={URL.createObjectURL(compressedImage)}
              alt=""
              width="200"
            />
          )}

          <button
            type="submit"
            className="w-full bg-[#3171c9] text-white py-2 rounded-lg font-semibold hover:bg-[#1e61c0] transition"
          >
            SAVE BILL
          </button>
        </form>
        {/* <img src={URL.createObjectURL(compressedImage)} alt="" width="200" /> */}
      </div>
    </div>
  );
};

export default Dashboard;
