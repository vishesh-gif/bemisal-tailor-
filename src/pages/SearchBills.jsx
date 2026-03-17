import React, { useState } from "react";
import InputField from "../utils/InputField";
import { LuCalendarSearch } from "react-icons/lu";
const SearchBills = () => {
  const [input, setInput] = useState("");
  const handleClick = () => {
    
  };

  return (
    <div>
      <h1
        className="text-2xl text-center bg-white
      rounded py-1 font-semibold text-gray-800 mb-4"
      >
        Search Bills
      </h1>
      <section>
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
              onClick={() => handleClick()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg m-1 transition flex items-center gap-2"
            >
              <LuCalendarSearch className="text-lg" />
              <span className="hidden sm:block">Search</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBills;
