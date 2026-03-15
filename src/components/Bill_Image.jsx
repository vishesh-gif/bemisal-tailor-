import React, { useState } from "react";
import InputField from "../utils/InputField";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import { addBillImage } from "../redux/bill_image_Slice";
import storageService from "../appwrite/storageService";

const Bill_Image = () => {
  const dispatch = useDispatch();
  const [compressedImage, setCompressedImage] = useState(null);
  const userId = useSelector((state) => state.profileSlice?.userData?.$id);

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

      const uploadBillImage =
        await storageService.upload_Bill_Image(compressedRealFile);

      if (uploadBillImage) dispatch(addBillImage(uploadBillImage));

      console.log(uploadBillImage);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <InputField
        label="Photo"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
      />
      {compressedImage && (
        <img src={URL.createObjectURL(compressedImage)} alt="" width="200" />
      )}
    </>
  );
};

export default Bill_Image;
