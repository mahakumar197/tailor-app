import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import debounce from "lodash/debounce";
import "./style.css";
import arrow from "./arrowBlack.png";
import profile from "./Profile.png";
import add from "./addbtn.png";

function ViewComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/16bY1IcTHpcirNZMIkaR5B_I261927rPcvGjPsYVxSM4/values/Measurement_data/?key=AIzaSyCUVzbeXceE_bc8NF1X3qbI4_C1o1fTuaY`
        );

        // Extract headers and rows
        const [headers, ...rows] = response.data.values;

        // Map rows to objects based on headers
        const formattedData = rows.map((row) => {
          const item = {};
          headers.forEach((header, index) => {
            item[header] = row[index] || ""; // Handle missing values
          });
          return item;
        });

        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  // Set greeting message based on the time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [navigate]);

  // Debounce the search input
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const results = data.filter((item) => {
          const name = item.Name ? item.Name.toLowerCase() : "";
          const phoneNumber = item["Phone Number"] ? item["Phone Number"] : "";

          return (
            name.includes(value.toLowerCase()) || phoneNumber.includes(value)
          );
        });
        setFilteredData(results);
      }, 300),
    [data]
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="container pt-5">
      <div className="d-flex header-content justify-content-between">
        <h1 className="header1-prop">{greeting}</h1>
      </div>
      <div className="pt-4">
        <h5 className="my-4 header3-prop fw-medium">Search Customer</h5>
        <div className="d-flex justify-content-between mb-4">
          <input
            type="text"
            placeholder="Enter Customer's Phone Number Or Name"
            className="form-control search-box"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            variant="dark"
            onClick={() => navigate("/create")}
            className="btn-block btnn-create"
          >
            Add New
            <img src={add} className="ms-2" alt="arrow" />
          </Button>
        </div>

        <div className="row data-container">
          <h5 className="header4-prop fw-semibold mb-5">Customer List</h5>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="col-md-12 row mb-4">
                <div className="col-2">
                  <img
                    src={item.img || profile}
                    alt="profile"
                    className="img-rounded"
                  />
                </div>
                <div className="col-8 d-flex align-items-center row mb-5">
                  <p className="info-color fw-semibold m-0 ">
                    {item["Phone Number"] || "N/A"}
                  </p>
                  <p className="fs-4 fw-semibold m-0">{item.Name}</p>
                  <p className="info-color">{item.Address || "N/A"}</p>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <Button
                    as={Link}
                    to={`/data/${item.id}`}
                    className="btnn-view d-flex fs-5"
                  >
                    View
                    <img src={arrow} className="ms-2" alt="arrow" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h6>No results found</h6>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewComponent;
