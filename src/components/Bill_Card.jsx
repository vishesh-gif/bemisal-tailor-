import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import storageService from "../appwrite/storageService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import customerService from "../appwrite/customerService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../redux/customers_data_slice";

const Bill_Card = ({ data, openImage }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    openImage(data?.bill_image_id);
    setLoading(false);
  };

  const deleletBillImg = async (public_id) => {
    try {
      const res = await fetch("/.netlify/functions/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      });

      const text = await res.text(); // safer
      const data = text ? JSON.parse(text) : null;

      console.log("Deleted:", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        deleletBillImg(data.public_id);
        const customerDetails_Delete = await customerService.delete_Customer(
          data.$id,
        );

        if (customerDetails_Delete) {
          dispatch(deleteCustomer(data.$id));
          toast.success("Customer Details deteled");
        }
      } catch (error) {
        console.log(error);
      }
    } else return;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl flex-col p-4 flex justify-between relative gap-1">
      <div className="flex border-b mb-1 border-gray-200 items-center justify-between">
        <h3 className="text-xl font-semibold mb-2">
          Bill# <span className="text-blue-600">{data?.billNumber}</span>
        </h3>
        <button
          onClick={() => handleDelete()}
          className="text-2xl text-red-800 mb-2"
        >
          <RxCrossCircled />
        </button>
      </div>
      <p className="text-md font-semibold text-black">{data?.name}</p>
      <p className="text-md font-semibold text-gray-700 flex items-center">
        <span className="text-sm">
          <FaPhone />
        </span>
        {data?.phoneNumber}
      </p>
      <p className="text-sm text-gray-600 flex items-center">
        <span>
          <FaRegCalendarAlt />
        </span>
        {new Date(data?.$createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      <button
        type="button"
        disabled={loading}
        className={`bg-[#3171c9] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#1e61c0] transition absolute right-2 bottom-2 ${loading ? "cursor-not-allowed opacity-80" : ""}`}
        onClick={() => handleClick()}
      >
        {loading ?
          <AiOutlineLoading3Quarters className="text-xl animate-spin text-white m-auto" />
        : "View Photo"}
      </button>
    </div>
  );
};

export default Bill_Card;
