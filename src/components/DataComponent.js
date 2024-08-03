import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Tab, Tabs } from "react-bootstrap";
import arrow from "./arrow.png";
import { Link } from "react-router-dom";

function DataComponent() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/08c3963e-2d81-4d15-9aaa-1e5a1ac528d7/search?id=${id}")
      .then((response) => {
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
        <Button
          as={Link}
          variant="dark"
          to={`/`}
          className="btnn-view d-flex me-2 mt-5 fs-4"
        >
          Back
          <img src={arrow} className="ms-2" alt="arrow" />
        </Button>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <img src={data.img} alt={data.Name} className="img-rounded" />

        <h4 className="mt-5 header3-prop">{data.phoneNumber || "N/A"}</h4>
        <h1>{data.Name}</h1>
        <h5 className="header3-prop">{data.address || "N/A"}</h5>
      </div>
      <Tabs defaultActiveKey="shirt" id="data-tabs" className="mb-3">
        {data.comments && (
          <Tab eventKey="comments" title="Comments">
            <div className="mt-4">
              <h5>Comments:</h5>
              <p>{data.comments}</p>
            </div>
          </Tab>
        )}

        {/* Add more tabs if needed, for example for measurements */}
        <Tab eventKey="shirt" title="Shirt">
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
                <tr key={key}>
                  <th>{key.replace("_", " ")}</th>
                  <td>{data[key] || "N/A"}</td>
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
                  <th>{key.replace("_", " ")}</th>
                  <td>{data[key] || "N/A"}</td>
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
                  <th>{key.replace("_", " ")}</th>
                  <td>{data[key] || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </div>
  );
}

export default DataComponent;
