import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import arrow from "./arrowleft.png";
import "./style.css";
const EditComponent = () => {
  const [data, setData] = useState({
    Name: "",
    "Phone Number": "",
    Address: "",
    img: "",
    Comments: "",
    "Suit Length & Waist Coat Length suit": "",
    "Indowestern Length & Bandhi Length": "",
    "Bandhi Length & Indowestern Length suit": "",
    "Shirt Length & Kurta Length suit": "",
    "Shoulder & Sleeve Length suit": "",
    "Chest & Waist | Bicep & Cuff suit": "",
    "Upper & Lower Chest suit": "",
    "Suit Length & Waist Coat Length": "",
    "Bandhi Length & Indowestern Length": "",
    "Shirt Length & Kurta Length": "",
    "Shoulder & Sleeve Length": "",
    "Chest & Waist | Bicep & Cuff": "",
    "Upper & Lower Chest": "",
    "Length & Inseam": "",
    "Waist & Seat":"",
   "Thigh & Knee | Calf & Ankle":"",
    "Fork Round": "",
  });

  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // Define croppedImage state
  const [toggle, setToggle] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://sheet.best/api/sheets/16653153-1f20-4372-ad25-23df3d5a54ae/id/${id}`
      )
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file && file.size <= maxSize) {
      Resizer.imageFileResizer(
        file,
        200, // reduce width
        200, // reduce height
        "JPEG",
        70, // reduce quality
        0,
        (uri) => {
          setCroppedImage(uri); // Update croppedImage state
          setData((prevData) => ({ ...prevData, img: uri }));
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
      .patch(
        `https://sheet.best/api/sheets/16653153-1f20-4372-ad25-23df3d5a54ae/id/${id}`,
        data
      )
      .then(() => {
        navigate(`/data/${id}`); // Redirect to view component
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const updateToggle = (id) => {
    setToggle(id);
  };
console.log(data,"data");
 
  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Edit Customer</h1>
        <Link to="/view" className="btn btn-sm fs-2 mt-4">
          <img src={arrow} className="ms-4 img-height-arrow me-3" alt="arrow" />
          Back
        </Link>
      </div>
      <div className="tab">
        <ul className="d-flex justify-content-between">
          <li className="list-prop" onClick={() => updateToggle(1)}>
            <Button
              variant={toggle === 1 ? "dark" : "light"}
              className="btnn-tab d-flex me-2 mt-5 "
            >
              Info
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(2)}>
            <Button
              variant={toggle === 2 ? "dark" : "light"}
              className="btnn-tab d-flex me-2 mt-5 "
            >
              Shirt
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(3)}>
            <Button
              variant={toggle === 3 ? "dark" : "light"}
              className="btnn-tab d-flex me-2 mt-5 "
            >
              Suit
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(4)}>
            <Button
              variant={toggle === 4 ? "dark" : "light"}
              className="btnn-tab d-flex me-2 mt-5 "
            >
              Trouser
            </Button>
          </li>
        </ul>
      </div>

      <Form onSubmit={handleSubmit}>
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
                        value={data[key]}
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
                    value={data.Comments}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={toggle === 2 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {[
                {
                  label: "Suit Length & Waist Coat Length",
                  key: "Suit Length & Waist Coat Length suit",
                },
                {
                  label: "Bandhi Length & Indowestern Length",
                  key: "Bandhi Length & Indowestern Length suit",
                },
                {
                  label: "Shirt Length & Kurta Length",
                  key: "Shirt Length & Kurta Length suit",
                },
                {
                  label: "Shoulder & Sleeve Length",
                  key: "Shoulder & Sleeve Length suit",
                },
                {
                  label: "Chest & Waist | Bicep & Cuff",
                  key: "Chest & Waist | Bicep & Cuff suit",
                },
                {
                  label: "Upper & Lower Chest",
                  key: "Upper & Lower Chest suit",
                },
              ].map(({ label, key }) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="border-0">
                      <label className="fs-5">{label}</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control transparent-input fs-5"
                        value={data[key] || ""}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className={toggle === 3 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {[
                "Suit Length & Waist Coat Length",
                "Bandhi Length & Indowestern Length",
                "Shirt Length & Kurta Length",
                "Shoulder & Sleeve Length",
                "Chest & Waist | Bicep & Cuff",
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
                        value={data[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className={toggle === 4 ? "show-content" : "content"}>
          <table className="table">
            <tbody>
              {[
                "Length & Inseam",
                "Waist & Seat",
                "Thigh & Knee | Calf & Ankle",
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
                        value={data[key]}
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
};

export default EditComponent;
