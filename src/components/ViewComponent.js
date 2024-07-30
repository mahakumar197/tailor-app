import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import debounce from "lodash/debounce"; // Import debounce from lodash
import "./style.css";
import arrow from "./arrow.png";
import logo from "./logo.png";

function ViewComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sheetdb.io/api/v1/1pebjs86gedd7"
        );
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data with full dataset
        setRetryCount(0); // Reset retry count on success
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.error(
            `Too many requests, retrying in ${delay / 1000} seconds...`
          );
          setRetryCount(retryCount + 1);
          setTimeout(fetchData, delay);
        } else {
          console.error("There was an error fetching the data!", error);
        }
      }
    };

    fetchData();
  }, [retryCount]);

  // Debounced search input handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const results = data.filter(
          (item) =>
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.phoneNumber.includes(value)
        );
        setFilteredData(results);
      }, 300), // Adjust the debounce delay as needed
    [data]
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleLogout = () => {
    // Add logic to clear user session or token
    navigate("/login");
  };

  return (
    <div className="container-fluid BG-view">
      <div className="container">
        <div className="d-flex justify-content-between pt-5">
          <img src={logo} className="img-logo" alt="Logo" />
          <Button variant="dark" className="btnn-arrow" onClick={handleLogout}>
            <img src={arrow} className="ms-2" alt="arrow" />
          </Button>
        </div>
        <div className="pt-4">
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
                    <p className="card-title">{item.phoneNumber || "N/A"}</p>
                    <h2 className="card-title">{item.Name}</h2>
                    <span className="card-title">{item.address || "N/A"}</span>
                  </div>
                  <div className="col-2 d-flex align-items-center">
                    <Button
                      as={Link}
                      variant="dark"
                      to={`/data/${item.id}`}
                      className="btnn-view d-flex me-2"
                    >
                      View
                      <img src={arrow} className="ms-2" alt="arrow" />
                    </Button>
                    <Button
                      as={Link}
                      variant="warning"
                      to={`/edit/${item.id}`}
                      className="btn-sm"
                    >
                      Edit
                    </Button>
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
