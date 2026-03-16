import React, { useEffect } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import storageService from "../appwrite/storageService";
const Bill_Card = ({ data, openImage }) => {
  const handleClick = async () => {
    try {
      const img = await storageService.get_Bill_Image(data.bill_image_id);
      if (img) openImage(img);
      console.log(img);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl flex-col p-4 flex justify-between relative gap-1">
      <h3 className="text-xl mb-2 font-semibold border-b border-gray-200">
        Bill# <span className="text-blue-600">{data?.billNumber}</span>
      </h3>
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
        12 Mar 2026
      </p>

      <button
        type="button"
        className="bg-[#3171c9] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#1e61c0] transition absolute right-2 bottom-2"
        onClick={() => handleClick()}
      >
        View Photo
      </button>
    </div>
  );
};

export default Bill_Card;
