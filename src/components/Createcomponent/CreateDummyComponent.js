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

  function updateToggle(id) {
    setToggle(id);
  }

  useEffect(() => {
    // Load the image from localStorage
    const savedImage = localStorage.getItem("croppedImage");
    if (savedImage) {
      setFormData((prevState) => ({
        ...prevState,
        img: savedImage,
      }));
    }

    // Fetch existing data from API
    axios
      .get(`https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb`)
      .then((response) => {
        setExistingData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const nextId = useMemo(() => {
    return existingData.length > 0
      ? Math.max(...existingData.map((item) => parseInt(item.id, 10))) + 1
      : 1;
  }, [existingData]);

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
        setFile(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const onCropComplete = async (croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(file, croppedAreaPixels);
      setCroppedImage(croppedImg); // Set cropped image
      resizeAndSetImage(croppedImg);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const resizeAndSetImage = (croppedImg) => {
    const img = new Image();
    img.src = croppedImg;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_WIDTH = 600; // Updated size
      const MAX_HEIGHT = 600; // Updated size
      let { width, height } = img;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          const file = new File([blob], "croppedImage.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          const filePreview = URL.createObjectURL(file);

          // Save to localStorage
          localStorage.setItem("croppedImage", filePreview);

          setFormData((prevState) => ({
            ...prevState,
            img: filePreview,
          }));
        },
        "image/jpeg",
        1
      );
    };

    img.onerror = () => {
      alert("Invalid image content.");
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the new data with the nextId
    const newData = { ...formData, id: nextId.toString() };

    // Prepare the request payload
    const requestPayload = [newData]; // Ensure it's an array of objects

    fetch(
      `https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully saved:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the entry:", error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Add New Customer</h1>
        <Link to={`/`} className="btn btn-sm fs-2 mt-4">
          <img src={arrow} className="ms-4 img-height-arrow me-3" alt="arrow" />
          back
        </Link>
      </div>
      <div className="tab">
        <ul className="d-flex justify-content-between">
          <li className="list-prop" onClick={() => updateToggle(1)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Personal Details
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(2)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Shirt
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(3)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Suit
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(4)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
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
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-1"
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
                  <label className="label-props">Image</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="file"
                    name="img"
                    className="form-control transparent-input fs-1"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                  />
                  {file && (
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
                  )}
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
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-1"
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
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-1"
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
              {["shirt", "kurta"].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-1"
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
        <button type="submit" className="btn btn-dark btn-lg mt-5">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateDummyComponent;
