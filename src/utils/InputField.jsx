import React from "react";

const InputField = React.forwardRef(
  ({ label, type = "text", placeholder, divClass = "", ...props }, ref) => {
    return (
      <div className={`${divClass} flex flex-col gap-1`}>
        {label && (
          <label className="text-md font-medium text-gray-900">{label}</label>
        )}

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="border placeholder:text-sm placeholder:font-semibold placeholder:text-[#768290] border-[#a9aaac] rounded-md px-3 py-2 focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#3171c9]"
          {...props}
        />
      </div>
    );
  },
);

export default InputField;
