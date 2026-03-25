import React, { useEffect, useState } from "react";
import { LuCalendarSearch } from "react-icons/lu";
import Bill_Card from "../components/Bill_Card";
import toast from "react-hot-toast";
import Popup_Image from "../components/Popup_Image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { search_bills_by_phoneNo } from "../firebase/services/firebase_bill_service";
const SearchBills = () => {
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!input) {
      setData(null);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const customerDetails = await search_bills_by_phoneNo(input);
        console.log(customerDetails);
        if (!customerDetails) toast.error("No Customer found");
        setData(customerDetails);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div>
      <h1
        className="text-2xl text-center bg-white
      rounded py-1 font-semibold text-gray-800 mb-4"
      >
        Search Bills
      </h1>
      {selectedImage && (
        <Popup_Image
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <section className="mb-4">
        <div className="w-full max-w-xl mx-auto">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
            {/* Input */}
            <div className="flex items-center px-3 w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search by phone number..."
                className={`placeholder:text-sm placeholder:font-semibold placeholder:text-[#768290] border-[#a9aaac] rounded-md px-3 py-2 focus:outline-none `}
              />
            </div>

            {/* Button */}
            <button
              type="button"
              disabled
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg m-1 transition flex items-center gap-2"
            >
              <LuCalendarSearch className="text-lg" />
              <span className="hidden sm:block">Search</span>
            </button>
          </div>
        </div>
      </section>
      <section className=" flex flex-col gap-4">
        {data && data.length > 0 ?
          data.map((el) => (
            <Bill_Card key={el.id} data={el} openImage={setSelectedImage} />
          ))
        : <div className="text-center">
            {input && loading ?
              <div className="w-full my-10 flex flex-col items-center justify-center gap-3">
                <AiOutlineLoading3Quarters className="text-4xl animate-spin text-blue-600" />
                <p className="text-gray-500">Loading...</p>
              </div>
            : "No Data Found"}
          </div>
        }
      </section>
    </div>
  );
};

export default SearchBills;
