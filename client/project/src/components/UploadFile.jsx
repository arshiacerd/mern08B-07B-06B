import React, { useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [file, setfile] = useState("");
 const [imgUrl , setImgUrl]  =  useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData
      );
      console.log("file uploaded", response);
      setImgUrl(response.data.file)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    
    <form
      action="/upload"
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        name="uploadFile"
        onChange={(e) => setfile(e.target.files[0])}
      />
      <input type="submit" value="upload" />
    </form>

    {
        imgUrl && (<img src={`http://localhost:8000/${imgUrl}`} width={300} /> )
    }
    </>
   


  );
};

export default UploadFile;
