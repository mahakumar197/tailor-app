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
      <div className="card">
        <div className="align-content-center align-items-center  d-flex justify-content-center">
          <img src={data.img} className="card-img-top" alt={data.Name} />
        </div>

        <div className="card-body">
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
