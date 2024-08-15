import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import arrow from "./arrowleft.png";
import "./createStyle.css";
import axios from "axios";
function Create() {
  const [formData, setFormData] = useState({
    Name: "",
    "Phone Number": "",
    Address: "",
    img: "",
    Comments: "",
    "Suit Length & Waist Coat Length suit": "",
    "Bandhi Length & Indowestern Length suit": "",
    "Shirt Length & Kurta Length suit": "",
    "Shoulder & Sleeve Length suit": "",
    "Chest & Waist | Bicep & Cuff suit": "",
    "Upper & Lower Chest suit": "",
    "Length & Inseam": "",
    "Waist & Seat": "",
    "Thigh & Knee | Calf & Ankle": "",
    "Fork Round": "",
  });

  const [toggle, setToggle] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file && file.size <= maxSize) {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        70,
        0,
        (uri) => {
          setFormData((prevData) => ({ ...prevData, img: uri }));
        },
        "base64"
      );
    } else {
      alert("File exceeds 5MB. Please upload a smaller image.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://sheets.googleapis.com/v4/spreadsheets/16bY1IcTHpcirNZMIkaR5B_I261927rPcvGjPsYVxSM4/values/Measurement_data/?key=AIzaSyCUVzbeXceE_bc8NF1X3qbI4_C1o1fTuaY`,
        formData
      )
      .then(() => {
        navigate("/view");
      })
      .catch((error) => console.error("Error creating data:", error));
  };

  const updateToggle = (id) => {
    setToggle(id);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Create New Entry</h1>
        <Link to="/view" className="btn btn-sm fs-2 mt-4">
          <img src={arrow} className="ms-4 img-height-arrow me-3" alt="arrow" />
          Back
        </Link>
      </div>
      <div className="tab">
        <ul className="d-flex justify-content-between">
          {["Info", "Shirt", "Suit", "Trouser"].map((tab, index) => (
            <li
              className="list-prop"
              onClick={() => updateToggle(index + 1)}
              key={index}
            >
              <Button
                variant={toggle === index + 1 ? "dark" : "light"}
                className="btnn-tab d-flex me-2 mt-5"
              >
                {tab}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Form onSubmit={handleSubmit}>
        <div className={toggle === 1 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {["Name", "Phone Number", "Address", "Comments"].map((key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">{key}</label>
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
                    onChange={handleFileChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional forms based on toggle */}
        {/* ... (Rest of your code for Shirt, Suit, and Trouser sections) */}

        <div className="mt-5">
          <Button
            variant="dark"
            type="submit"
            className="btn btnn-save btn-lg mb-5"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
