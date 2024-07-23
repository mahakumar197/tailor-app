// src/components/EditComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditComponent() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://script.google.com/macros/s/AKfycbxTm1j8jpyWnzORqnu0KgVl9zlbBk2mrUgfI6BUJr8RIqBHazl1ZOCwK0_L0nz7OepM4w/exec?path=Sheet1&action=read/search?id=${id}`
      )
      .then((response) => {
        setFormData(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

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
    axios
      .put(`https://sheetdb.io/api/v1/fl4471aq24iqh/id/${id}`, {
        data: formData,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error updating the entry!", error);
      });
  };

  return (
    <div className="container">
      <h1 className="my-4">Edit Entry</h1>
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

export default EditComponent;
