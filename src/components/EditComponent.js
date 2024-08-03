import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EditComponent() {
  const { id } = useParams();
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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://sheet.best/api/sheets/08c3963e-2d81-4d15-9aaa-1e5a1ac528d7`)
      .then((response) => {
        if (response.data.length > 0) {
          setFormData(response.data[0]);
        }
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

    fetch(
      "https://sheet.best/api/sheets/08c3963e-2d81-4d15-9aaa-1e5a1ac528d7/batch_update",
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              query: `id=${id}`,
              ...formData,
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(`/data/${id}`);
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
