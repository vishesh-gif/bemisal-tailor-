import React, { useEffect, useState } from "react";
import Bill_Card from "../components/Bill_Card";
import customerService from "../appwrite/customerService";
import { useSelector } from "react-redux";

const AllBills = () => {
  const userId = useSelector((state) => state.profileSlice?.userData?.$id);
  const [data, setData] = useState(null);
  const allBills = async () => {
    try {
      const customersData = await customerService.get_Customers_detail(userId);
      if (customersData) setData(customersData.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allBills();
  }, []);

  return (
    <div>
      <h1
        className="text-2xl text-center bg-white
      rounded py-1 font-semibold text-gray-800 mb-4"
      >
        All Bills
      </h1>
      <section className="flex flex-col gap-4">
        {data && data.length > 0 ?
          data.map((el) => <Bill_Card key={el.$id} data={el} />)
        : <div className="text-center">No Data Found</div>}
      </section>
    </div>
  );
};

export default AllBills;
