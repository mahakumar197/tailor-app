import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import arrow from "./arrow.png";
import { Link } from "react-router-dom";

function DataComponent() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://sheetdb.io/api/v1/bdmyeklcafs0f/search?id=${id}`)
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  if (!data) {
    return (
      <div className="container mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div>
        <h1>Customer Details</h1>
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <img src={data.img} alt={data.Name} className="img-rounded" />

          <h4 className="mt-5 header3-prop">{data.phoneNumber || "N/A"}</h4>
          <h1>{data.Name}</h1>
          <h5 className="header3-prop">{data.address || "N/A"}</h5>
        </div>

        <div>
          {Object.keys(data).map((key) =>
            key !== "id" && key !== "img" ? (
              <tr key={key}>
                <th>{key.replace("_", " ")}</th>
                <td>{data[key] || "N/A"}</td>
              </tr>
            ) : null
          )}
          {/* Add more fields as needed */}
        </div>
      </div>
      <Button
        as={Link}
        variant="dark"
        to={`/`}
        className="btnn-view d-flex me-2 mt-3"
      >
        Back
        <img src={arrow} className="ms-2" alt="arrow" />
      </Button>
    </div>
  );
}

export default DataComponent;
