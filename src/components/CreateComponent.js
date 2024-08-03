import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css"; // Import the custom CSS
import arrow from "./arrow.png";
import logo from "./logo.png"; // Assuming you have this file

function CreateComponent() {
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
  });
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

   const [data, setData] = useState([]);
   const SPREADSHEET_ID = "1toXGwtF9SVavjy4cxOPMa0Hi3fTFngkfMF4UbWdv16I";
   const RANGE = "Measurement_data"; // Adjust the range as needed
   const API_KEY = "AIzaSyBsxIsRvRV50Hx2IQ0fevtqb2dAWaawgxQ";

  useEffect(() => {
    fetch("https://sheet.best/api/sheets/08c3963e-2d81-4d15-9aaa-1e5a1ac528d7")
      .then((response) => response.json())
      .then((data) => {
        const maxId = data.reduce(
          (max, item) => Math.max(max, parseInt(item.id || 0)),
          0
        );
        setNextId(maxId + 1);
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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          img: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...formData, id: nextId.toString() };

    fetch(
      "https://sheet.best/api/sheets/08c3963e-2d81-4d15-9aaa-1e5a1ac528d7",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [newData] }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the entry!", error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Add New Customer</h1>
        <Button
          as={Link}
          variant="dark"
          to={`/`}
          className="btnn-back d-flex me-2 mt-5 fs-4"
        >
          Back
          <img src={arrow} className="ms-4 img-height-arrow" alt="arrow" />
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultActiveKey="details" id="measurement-tabs" className="mb-3">
          <Tab
            eventKey="details"
            className="tab-props custom-tab-title"
            title="Personal Details"
          >
            <table className="table">
              <tbody>
                {["Name", "phoneNumber", "address"].map((key) => (
                  <tr key={key}>
                    <td>
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control"
                        placeholder={key.replace("_", " ")}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <label className="label-props">Image</label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="img"
                      className="form-control"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label-props">Comments</label>
                  </td>
                  <td>
                    <input
                      type="textarea"
                      className="form-control"
                      placeholder="Add comments"
                      value={formData.comments}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="shirt" title="Shirt">
            <table className="table">
              <tbody>
                {[
                  "shirt",
                  "kurta",
                  "shoulder",
                  "sleeve length",
                  "chest",
                  "waist",
                  "seat",
                  "neck",
                  "bicep",
                ].map((key) => (
                  <tr key={key}>
                    <td>
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control"
                        placeholder={key.replace("_", " ")}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="suit" title="Suit">
            <table className="table">
              <tbody>
                {["Suit", "Waist Coat", "Bandhi", "Indowestern"].map((key) => (
                  <tr key={key}>
                    <td>
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control"
                        placeholder={key.replace("_", " ")}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="trouser" title="Trouser">
            <table className="table">
              <tbody>
                {["trouser", "waist", "seat", "length"].map((key) => (
                  <tr key={key}>
                    <td>
                      <label className="label-props">
                        {key.replace("_", " ")}
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name={key}
                        className="form-control"
                        placeholder={key.replace("_", " ")}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
        </Tabs>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-dark btnn-back mt-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateComponent;
