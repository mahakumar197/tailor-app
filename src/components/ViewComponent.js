import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./style.css";
import arrow from "./arrow.png";
import logo from "./logo.png";

function ViewComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://sheetdb.io/api/v1/fl4471aq24iqh")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data with full dataset
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  useEffect(() => {
    const results = data.filter(
      (item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phoneNumber.includes(searchTerm)
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    // Add logic to clear user session or token
    navigate("/login");
  };

  return (
    <div className="container-fluid BG-view">
      <div className="container">
        <div className=" d-flex justify-content-between pt-5">
          <img src={logo} className="img-logo" />
          <Button variant="dark" className="btnn-arrow" onClick={handleLogout}>
            <img src={arrow} className="ms-2" alt="arrow" />
          </Button>
        </div>
        <div className=" pt-4">
          <h1 className="my-4">Client Directory</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or mobile number"
              className="form-control"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="row">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item.id} className="col-md-12 row mb-4">
                  <div className="col-4">
                    <img
                      src={item.img}
                      alt={item.Name}
                      className="card-img-top"
                      style={{ width: "80%", height: "150px" }}
                    />
                  </div>
                  <div className="col-6 d-flex align-items-center row mt-5">
                    <p className="card-title ">{item.phoneNumber}</p>
                    <h1 className="card-title ">{item.Name}</h1>
                    <span className="card-title ">{item.address}</span>
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <Button
                      as={Link}
                      variant="dark"
                      to={`/data/${item.id}`}
                      className="btnn-view d-flex"
                    >
                      View
                      <img src={arrow} className="ms-2" alt="arrow" />
                    </Button>

                    {/* <Link
                    to={`/edit/${item.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link> */}
                  </div>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
        <div className="fixed-bottom-btn">
          <Button
            variant="dark"
            onClick={() => navigate("/create")}
            className="btn-block"
          >
            Create New Customer
            <img src={arrow} className="ms-2" alt="arrow" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewComponent;
