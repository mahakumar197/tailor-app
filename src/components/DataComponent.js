import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Tab, Tabs } from "react-bootstrap";
import arrow from "./arrowleft.png";
import { Link } from "react-router-dom";

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
        `https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb/id/${id}`
      )
      .then((response) => {
        console.log(response,"resdata")
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

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Customer Details</h1>
        <Link to={`/`} className="btn btn-sm fs-2 mt-4">
          <img src={arrow} className="ms-4 img-height-arrow me-3" alt="arrow" />
          back
        </Link>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <img src={data.img} alt={data.Name} className="img-rounded" />

        <h4 className="mt-5 header3-prop">{data.phoneNumber || "N/A"}</h4>
        <h1>{data.Name}</h1>
        <h5 className="header3-prop">{data.address || "N/A"}</h5>
      </div>
      <div>
        <ul className="d-flex justify-content-between">
          <li className="list-prop" onClick={() => updateToggle(1)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Shirt
            </Button>
          </li>
          <li className=" list-prop" onClick={() => updateToggle(2)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Suit
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(3)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Trouser
            </Button>
          </li>
        </ul>
      </div>
      <div className={toggle === 1 ? "show-content" : "content"}>
        <table className="table">
          <tbody>
            {[
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
                  <th>{key.replace("_", " ")}</th>
                </tr>
                <tr>
                  <td>{data[key] || "N/A"}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* </Tab> */}
      {/* <Tab eventKey="suit" title="Suit"> */}
      <div className={toggle === 2 ? "show-content" : "content"}>
        <table className="table">
          <tbody>
            {["Suit", "Waist Coat", "Bandhi", "Indowestern"].map((key) => (
              <React.Fragment key={key}>
                <tr key={key}>
                  <th>{key.replace("_", " ")}</th>
                </tr>
                <tr>
                  <td>{data[key] || "N/A"}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* </Tab> */}
      {/* <Tab eventKey="trouser" title="Trouser"> */}
      <div className={toggle === 3 ? "show-content" : "content"}>
        <table className="table">
          <tbody>
            {["trouser", "waist", "seat", "length"].map((key) => (
              <React.Fragment key={key}>
                <tr>
                  <th>{key.replace("_", " ")}</th>
                </tr>
                <tr>
                  <td>{data[key] || "N/A"}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* </Tab> */}
      {/* </Tabs> */}
    </div>
  );
}

export default DataComponent;
