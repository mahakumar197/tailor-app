import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./createStyle.css"; // Import the custom CSS
import arrow from "./arrowleft.png";
import axios from "axios";
import Resizer from "react-image-file-resizer";

function Create() {
  const [formData, setFormData] = useState({
    Name: "",
    "Phone Number": "",
    Address: "",
    img: "",
    Comments: "",
    "Suit Length": "",
    "Waist Coat Length": "",
    "Bandhi Length ": "",
    "Indowestern Length": "",
    "Shirt Length": "",
    "Kurta Length": "",
    "Shoulder & Sleeve Length": "",
    "Chest & Waist": "",
    "Seat & Neck": "",
    "Bicep&Cuff": "",
    "Upper & Lower Chest": "",
    "Length & Inseam": "",
    "Waist & Seat": "",
    "Thigh & Knee": "",
    "Calf & Ankle": "",
    "Fork Round": "",
  });
  // const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(1);

  function updateToggle(id) {
    setToggle(id);
  }
  const [existingData, setExistingData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://sheet.best/api/sheets/16653153-1f20-4372-ad25-23df3d5a54ae`)
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
    const files = e.target.files;
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds 5MB. Please upload a smaller image.`);
        continue; // Skip the current file if it exceeds the size limit
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Resize the image further to reduce its size
        Resizer.imageFileResizer(
          file,
          200, // reduce width further
          200, // reduce height further
          "JPEG",
          70, // reduce quality further
          0,
          (uri) => {
            setFormData((prevState) => ({
              ...prevState,
              img: uri, // Set img to a single base64 string
            }));
          },
          "base64"
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the new data with the nextId
    const newData = { ...formData, id: nextId.toString() };

    // Prepare the request payload
    const requestPayload = [newData]; // Ensure it's an array of objects

    fetch(
      `https://sheet.best/api/sheets/16653153-1f20-4372-ad25-23df3d5a54ae`,
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
        console.log(response, "response");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully saved:", data);
        navigate("/view");
      })
      .catch((error) => {
        console.error("There was an error creating the entry:", error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="header1-prop my-4">Add New Customer</h1>
        <Link to={`/view`} className="btn btn-sm fs-2 mt-4">
          <img src={arrow} className="ms-4 img-height-arrow me-2" alt="arrow" />
          Back
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
              Suit
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(3)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 ">
              Shirt
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
              {["Name", "Phone Number", "Address"].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">{key.replace("_", " ")}</label>
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
                    multiple // Allow multiple file uploads
                    onChange={handleFileChange}
                  />
                </td>
              </tr>

              <tr>
                <td className="border-0">
                  <label className="fs-5">Comments</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="Comments"
                    className="form-control transparent-input fs-5"
                    value={formData.Comments}
                    onChange={handleChange}
                  />
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
                "Suit Length",
                "Waist Coat Length",
                "Bandhi Length ",
                "Indowestern Length",
                "Shirt Length",
                "Kurta Length",
                "Shoulder & Sleeve Length",
                "Chest & Waist",
                "Seat & Neck",
                "Bicep&Cuff",
                "Upper & Lower Chest",
              ].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">{key.replace("_", " ")}</label>
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
              {[
                "Suit Length",
                "Waist Coat Length",
                "Bandhi Length ",
                "Indowestern Length",
                "Shirt Length",
                "Kurta Length",
                "Shoulder & Sleeve Length",
                "Chest & Waist",
                "Seat & Neck",
                "Bicep&Cuff",
                "Upper & Lower Chest",
              ].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">{key.replace("_", " ")}</label>
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
              {[
                "Length & Inseam",
                "Waist & Seat",
                "Thigh & Knee",
                "Calf & Ankle",
                "Fork Round",
              ].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">{key.replace("_", " ")}</label>
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
        <div className="mt-5">
          <Button variant="dark" type="submit" className="btn btnn-save mb-5">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Create;
