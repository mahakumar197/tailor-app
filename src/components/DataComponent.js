import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import arrow from "./arrow.png";
import { Link, useNavigate } from "react-router-dom";

function DataComponent() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://sheetdb.io/api/v1/1pebjs86gedd7/search?id=${id}`)
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">{data.Name}</h1>
      <img src={data.img} alt={data.Name} className="img-fluid mb-3" />
      <table className="table table-striped">
        <tbody>
          {Object.keys(data).map(
            (key) =>
              key !== "id" &&
              key !== "Name" &&
              key !== "img" && (
                <tr key={key}>
                  <th>{key.replace("_", " ")}</th>
                  <td>{data[key]}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
      <Button
        as={Link}
        variant="dark"
        to={`/`}
        className="btnn-view d-flex me-2 W-25"
      >
        Back
        <img src={arrow} className="ms-2" alt="arrow" />
      </Button>
    </div>
  );
}

export default DataComponent;
