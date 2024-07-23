// src/components/CreateComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateComponent() {
  const [formData, setFormData] = useState({
    Name: "",
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
    axios
      .get("https://sheetdb.io/api/v1/yxpmzp4gdv8ve")
      .then((response) => {
        const data = response.data;
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
    axios
      .post("https://sheetdb.io/api/v1/yxpmzp4gdv8ve", { data: newData })
      .then((response) => {
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
        {Object.keys(formData).map((key) =>
          key !== "img" ? (
            <div className="form-group my-2" key={key}>
              <label>{key.replace("_", " ")}</label>
              <input
                type="text"
                name={key}
                className="form-control"
                placeholder={key.replace("_", " ")}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="form-group my-2" key={key}>
              <label>{key.replace("_", " ")}</label>
              <input
                type="file"
                name={key}
                className="form-control"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
            </div>
          )
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateComponent;
