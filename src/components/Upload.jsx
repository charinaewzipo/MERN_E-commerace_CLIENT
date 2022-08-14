import React from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import app from "../utills/firebase";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border: 1px solid black;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  margin: 20px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  border: none;
`;
const Desc = styled.textarea`
  border-radius: 3px;
  padding: 10px;
  border: none;

  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState("");
  const [inputs, setInputs] = useState([]);
  const [cat, setCat] = useState({});
  const [color, setColor] = useState({});
  const [size, setSize] = useState({});
  const [imgPerc, setImgPerc] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChangeInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangeCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleChangeColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleChangeSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const uploadFiles = (imgFile) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + img.name;
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setInputs((prev) => {
            return {
              ...prev,
              img: downloadURL,
            };
          });
        });
      }
    );
  };
  useEffect(() => {
    uploadFiles(img);
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/products/add`,
        {
          ...inputs,
          categories: cat,
          color: color,
          size: size,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      Swal.fire({
        title: "Upload was successful!!",
        text: res.data.title,
        imageUrl: res.data.img,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cat);
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Product</Title>
        <Label>Image</Label>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {imgPerc > 0 && "Upload is " + imgPerc + "% done"}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChangeInput}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows="8"
          onChange={handleChangeInput}
        />
        <Input
          type="text"
          placeholder="Catagory = (shirt,jean,shoe)"
          name="catagory"
          onChange={handleChangeCat}
        />
        <Input
          type="text"
          placeholder="Color (Black, White,Green,Red,Blue,Yellow)"
          name="color"
          onChange={handleChangeColor}
        />
        <Input
          type="text"
          placeholder="Size (XS,S,M,L,XL)"
          name="size"
          onChange={handleChangeSize}
        />
        <Input
          type="number"
          placeholder="Price"
          name="price"
          onChange={handleChangeInput}
        />

        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
