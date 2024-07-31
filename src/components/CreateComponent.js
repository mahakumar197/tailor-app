import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "./arrow.png";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
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
      <h1 className="my-4">Create New Entry</h1>
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            {Object.keys(formData).map((key) => (
              <tr key={key}>
                <td>
                  <label>{key.replace("_", " ")}</label>
                </td>
                <td>
                  {key !== "img" ? (
                    <input
                      type="text"
                      name={key}
                      className="form-control"
                      placeholder={key.replace("_", " ")}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type="file"
                      name={key}
                      className="form-control"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
        <Button
          as={Link}
          variant="dark"
          to={`/`}
          className="btnn-view d-flex me-2 mt-3"
        >
          Back
          <img src={arrow} className="ms-2" alt="arrow" />
        </Button>
      </form>
    </div>
  );
}

export default CreateComponent;
