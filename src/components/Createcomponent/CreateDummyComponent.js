import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Createcomponent/createStyle.css"; // Import the custom CSS
import arrow from "./Createcomponent/arrowleft.png";
import axios from "axios";
import ImageCropper from "../image/ImageCropper"; // Import ImageCropper component
import { getCroppedImg } from "../image/cropImage/cropImage"; // Ensure the path is correct

function CreateDummyComponent() {
  const [formData, setFormData] = useState({
    Name: "",
    phoneNumber: "",
    address: "",
    img: "",
    Suit: "",
    "Waist Coat": "",
    Bandhi: "",
    Indowestern: "",
    shirt: "",
    kurta: "",
    shoulder: "",
    "sleeve length": "",
    chest: "",
    waist: "",
    seat: "",
    "neck ": "",
    bicep: "",
    comments: "",
  });

  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // State for cropped image
  const [toggle, setToggle] = useState(1);
  const navigate = useNavigate();
  const [existingData, setExistingData] = useState([]);
  const [nextId, setNextId] = useState(1); // Add this line to define nextId state

  function updateToggle(id) {
    setToggle(id);
  }

  useEffect(() => {
  fetch(`https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb`)
      .then((response) => response.json())
      .then((data) => {
        setExistingData(data);
        const maxId = data.reduce(
          (max, item) => Math.max(max, parseInt(item.id || 0)),
          0
        );
        setNextId(maxId + 1); // Set the nextId here
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleFileChange = (e) => {
  const imageFile = e.target.files[0];
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes

  if (imageFile) {
    if (imageFile.size > maxSize) {
      alert("File size exceeds 5MB. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        img: reader.result, // Store the Base64 string in formData
      });
    };
    reader.readAsDataURL(imageFile); // Convert image to Base64 string
  }
};


 const handleSubmit = (e) => {
   console.log("save");
   e.preventDefault(); // Prevents the default form submission

   const newData = { ...formData, id: nextId.toString() };
   console.log("Submitting data:", newData);

   fetch(`https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb`, {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newData),
   })
     .then((response) => response.json())
     .then((data) => {
       console.log("Response data:", data);
       if (data) {
         // Redirect to the view component after successful submission
         navigate("/ "); // Change '/view' to your actual view route
       } else {
         console.error("Error response data:", data);
       }
     })
     .catch((error) => {
       console.error("There was an error creating the entry!", error);
     });
 };


  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="header1-prop my-4">Add New Customer</h1>
        <Link to={`/`} className="btn btn-sm fs-5 mt-4">
          <img src={arrow} className="ms-4 img-height-arrow me-2" alt="arrow" />
          back
        </Link>
      </div>
      <div className="tab">
        <ul className="d-flex justify-content-between">
          <li className="list-prop" onClick={() => updateToggle(1)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 ">
              Info
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(2)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 ">
              Shirt
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(3)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 ">
              Suit
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(4)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 ">
              Trouser
            </Button>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="mt-5">
        {/* Personal Details Tab */}
        <div className={toggle === 1 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {["Name", "phoneNumber", "address"].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-5"
                        value={formData[key]}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              <tr>
                <td className="border-0">
                  <label className="fs-5">Image</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="file"
                    name="img"
                    className="form-control transparent-input fs-5"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                  />
                  {/* {file && (
                    <ImageCropper
                      image={file}
                      onCropComplete={onCropComplete}
                    />
                  )}
                  {formData.img && (
                    <img
                      src={formData.img}
                      alt="Cropped"
                      className="mt-3"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )} */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Shirt Tab */}
        <div className={toggle === 2 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {[
                "shoulder",
                "sleeve length",
                "chest",
                "waist",
                "seat",
                "neck ",
                "bicep",
                "comments",
              ].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-5"
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {/* Suit Tab */}
        <div className={toggle === 3 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {["Suit", "Waist Coat", "Bandhi", "Indowestern"].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-5"
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {/* Trouser Tab */}
        <div className={toggle === 4 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {["pant waist", "pant length", "thigh", "bottom"].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-5"
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-5">
          <Button variant="dark" type="submit" className="btn btn-lg mb-5">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateDummyComponent;
