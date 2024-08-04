import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./createStyle.css"; // Import the custom CSS
import arrow from "./arrowleft.png";

function Create() {
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
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();
 const [toggle, setToggle] = useState(1);


 function updateToggle(id) {
   setToggle(id);
 }
  useEffect(() => {
    fetch("https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb")
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
        setFormData((prevState) => ({
          ...prevState,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the new data with the nextId
    const newData = { ...formData, id: nextId.toString() };

    // Prepare the request payload
    const requestPayload = {
      data: [newData],
    };

    fetch(
      "https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb",
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
                        className="form-control transparent-input"
                        value={formData[key]}
                        onChange={handleChange}
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
                    className="form-control transparent-input"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-0">
                  <label className="label-props">Comments</label>
                </td>
              </tr>
              <tr>
                <td>
                  <textarea
                    name="comments"
                    className="form-control transparent-input"
                    value={formData.comments || ""}
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
                <React.Fragment key={key}>
                  <tr>
                    <td>
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
                        className="form-control transparent-input"
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
                    <td>
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
                        className="form-control transparent-input"
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
              {["trouser", "waist", "seat", "length"].map((key) => (
                <React.Fragment key={key}>
                  <tr key={key}>
                    <td>
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
                        className="form-control transparent-input"
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

        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            variant="dark"
            className="btnn-tab d-flex me-2 mt-5 fs-4"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Create;
