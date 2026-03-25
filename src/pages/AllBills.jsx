import React, { useEffect, useState } from "react";
import Bill_Card from "../components/Bill_Card";
import { useDispatch, useSelector } from "react-redux";
import Popup_Image from "../components/Popup_Image";
import { addCustomersData, addMoreBill } from "../redux/customers_data_slice";
import {
  get_bills,
  get_customer_count,
  getMoreBills,
} from "../firebase/services/firebase_bill_service";
import { IoPersonSharp } from "react-icons/io5";

const AllBills = () => {
  const customers = useSelector((state) => state.customers_data_Slice.billData);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [count, setCount] = useState(0);

  const allBills = async () => {
    try {
      const res = await get_bills();
      console.log(res.data);
      if (res) {
        dispatch(addCustomersData(res.data));
        setLastDoc(res.lastDoc);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = async () => {
    console.log(lastDoc);
    const res = await getMoreBills(lastDoc);
    if (res) {
      dispatch(addMoreBill(res.data));
      setLastDoc(res.lastDoc);
    }
  };
  const fetchCount = async () => {
    const total = await get_customer_count();
    setCount(total);
  };

  useEffect(() => {
    if (!customers?.length) {
      allBills();
    }
    fetchCount();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl text-center bg-white rounded py-1 font-semibold text-gray-800 mb-4">
        All Bills
      </h1>

      <p className="text-lg text-center flex items-center justify-center gap-1 bg-white rounded py-1 font-semibold text-gray-800 mb-4">
        <span>
          <IoPersonSharp className="text-[#3171c9]" />
        </span>
        Total customer : {count}
      </p>

      {selectedImage && (
        <Popup_Image
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <section className="flex flex-col gap-4">
        {customers && customers.length > 0 ?
          customers.map((el, index) => (
            <Bill_Card
              key={el?.id || index}
              data={el}
              openImage={setSelectedImage}
            />
          ))
        : <div className="text-center">No Data Found</div>}
      </section>
      <section className="flex items-center justify-center ">
        <button
          className="bg-blue-600 p-1 rounded-md mt-4 cursor-pointer text-white font-bold "
          onClick={() => handleLoadMore()}
        >
          Load More
        </button>
      </section>
    </div>
  );
};

export default AllBills;
