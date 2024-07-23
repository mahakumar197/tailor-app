// src/components/DataComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DataComponent() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://sheetdb.io/api/v1/fl4471aq24iqh/search?id=${id}`)
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
    </div>
  );
}

export default DataComponent;
