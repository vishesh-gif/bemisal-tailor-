import React, { useEffect, useState } from "react";
import Bill_Card from "../components/Bill_Card";
import customerService from "../appwrite/customerService";
import { useDispatch, useSelector } from "react-redux";
import Popup_Image from "../components/Popup_Image";
import { addCustomersData } from "../redux/customers_data_slice";

const AllBills = () => {
  const userId = useSelector((state) => state.profileSlice?.userData?.$id);
  const customers = useSelector((state) => state.customers_data_Slice.billData);
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const allBills = async () => {
    try {
      const customersData = await customerService.get_Customers_detail(userId);
      if (customersData) {
        dispatch(addCustomersData(customersData.documents));
        setData(customersData.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!customers.length) {
      allBills();
    }
  }, []);

  return (
    <div className="">
      <h1
        className="text-2xl text-center bg-white
      rounded py-1 font-semibold text-gray-800 mb-4"
      >
        All Bills
      </h1>
      {selectedImage && (
        <Popup_Image
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <section className="flex flex-col gap-4">
        {customers && customers.length > 0 ?
          customers.map((el) => (
            <Bill_Card key={el.$id} data={el} openImage={setSelectedImage} />
          ))
        : <div className="text-center">No Data Found</div>}
      </section>
    </div>
  );
};

export default AllBills;
