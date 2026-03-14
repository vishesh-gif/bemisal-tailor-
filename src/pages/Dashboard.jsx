import React from "react";
import InputField from "../utils/InputField";

const Dashboard = () => {
  return (
    <div>
      <form action="">
        <InputField label="Bill Number" />
        <InputField label="Customer Name" />
        <InputField label="Phone Number" type="number" />
        <InputField label="photo" type="file" capture={"environment"} />
      </form>
    </div>
  );
};

export default Dashboard;
