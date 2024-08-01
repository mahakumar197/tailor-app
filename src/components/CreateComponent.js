import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/fl4471aq24iqh")
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

    fetch("https://sheetdb.io/api/v1/bdmyeklcafs0f", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [newData] }),
    })
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
        <h1 className="my-4">Create New Entry</h1>
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
          <Tab eventKey="details" className="tab-props" title="Personal Details">
            <table className="table">
              <tbody>
                {["Name", "phoneNumber", "address"].map((key) => (
                  <tr key={key}>
                    <td>
                      <label>{key.replace("_", " ")}</label>
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
                    <label>Image</label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="img"
                      className="form-control"
                      accept="image/*"
                      capture="environment" // Opens the back camera on mobile devices
                      onChange={handleFileChange}
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
                      <label>{key.replace("_", " ")}</label>
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
                      <label>{key.replace("_", " ")}</label>
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
          <Tab eventKey="trouser"  title="Trouser">
            <table className="table">
              <tbody>
                {["trouser", "waist", "seat", "length"].map((key) => (
                  <tr key={key}>
                    <td>
                      <label>{key.replace("_", " ")}</label>
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
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateComponent;
