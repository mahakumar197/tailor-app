import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Tab, Tabs } from "react-bootstrap";
import arrow from "./arrowleft.png";
import { Link } from "react-router-dom";
import profile from "./Profile.png";

function DataComponent() {
  const { id } = useParams();
  const [data, setData] = useState(null);
const [toggle, setToggle] = useState(1);

function updateToggle(id) {
  setToggle(id);
}
  useEffect(() => {
    axios
      .get(
        `https://sheet.best/api/sheets/16653153-1f20-4372-ad25-23df3d5a54ae/id/${id}`
      )
      .then((response) => {
        console.log(response, "resdata");
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  if (!data) {
    return (
      <div className="container pt-5">
        <h2>Loading...</h2>
      </div>
    );
  }
console.log(data,"data")
  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Customer Details</h1>
        <div className="d-flex">
          <Link to={`/view`} className="btn btn-sm fs-2 mt-4">
            <img
              src={arrow}
              className="ms-4 img-height-arrow me-3"
              alt="arrow"
            />
            Back
          </Link>
          <Link to={`/edit/${id}`} className="btn btn-sm fs-2 mt-4">
            Edit
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <img
          src={data.img || profile}
          alt={data.Name}
          className="img-rounded"
        />

        <h4 className="mt-5 header3-prop">{data["Phone Number"] || "N/A"}</h4>
        <h1>{data.Name}</h1>
        <h5 className="header3-prop">{data.Address || "N/A"}</h5>
      </div>
      <div>
        <ul className="d-flex justify-content-between">
          <li className="list-prop" onClick={() => updateToggle(1)}>
            <Button
              variant={toggle === 1 ? "dark" : "light"}
              className="btnn-tab d-flex me-2 mt-5 fs-4"
            >
              {" "}
              Suit
            </Button>
          </li>
          <li className=" list-prop" onClick={() => updateToggle(2)}>
            <Button
              variant={toggle === 2 ? "dark" : "light"}
              className="btnn-tab d-flex me-2 mt-5 fs-4"
            >
              Shirt
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(3)}>
            <Button
              variant={toggle === 3 ? "dark" : "light"}
              className="btnn-tab d-flex me-2 mt-5 fs-4"
            >
              Trouser
            </Button>
          </li>
        </ul>
      </div>
      <div className={toggle === 1 ? "show-content" : "content"}>
        <table className="table">
          <tbody>
            {[
              {
                label: "Suit Length & Waist Coat Length",
                key: "Suit Length & Waist Coat Length",
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
              {
                label: "Comments",
                key: "Comments",
              },
            ].map(({ label, key }) => (
              <React.Fragment key={key}>
                <tr>
                  <td className="border-0">
                    {/* <label className="fs-5">{label}</label> */}
                    <th className="fs-5">{label}</th>
                  </td>
                </tr>
                <tr>
                  <td className="transparent-input fs-5">
                    {data[key] || "N/A"}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className={toggle === 2 ? "show-content" : "content"}>
        <table className="table">
          <tbody>
            {[
              "Suit Length & Waist Coat Length",
              "Bandhi Length & Indowestern Length",
              "Shirt Length & Kurta Length",
              "Shoulder & Sleeve Length",
              "Chest & Waist | Bicep & Cuff",
              "Upper & Lower Chest",
              "Comments",
            ].map((key) => (
              <React.Fragment key={key}>
                <tr>
                  <th className="fs-5">{key.replace("_", " ")}</th>
                </tr>
                <tr>
                  <td className="transparent-input fs-5">
                    {data[key] || "N/A"}
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
              "Length & Inseam",
              "Waist & Seat",
              "Thigh & Knee | Calf & Ankle",
              "Fork Round",
              "Comments",
            ].map((key) => (
              <React.Fragment key={key}>
                <tr>
                  <th className="fs-5">{key.replace("_", " ")}</th>
                </tr>
                <tr>
                  <td className="transparent-input fs-5">
                    {data[key] || "N/A"}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataComponent;
