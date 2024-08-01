import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import debounce from "lodash/debounce";
import "./style.css";
import arrow from "./arrowBlack.png";
import Heart from "./Heart.png";
import add from "./addbtn.png";

function ViewComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sheetdb.io/api/v1/bdmyeklcafs0f"
        );
        setData(response.data);
        setFilteredData(response.data);
        setRetryCount(0);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const delay = Math.pow(2, retryCount) * 1000;
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

  useEffect(() => {
    const updateGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        setGreeting("Good Morning");
      } else if (hours < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();

    const handleUserActivity = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        navigate("/login");
      }, 5 * 60 * 1000); // 5 minutes
      setTimeoutId(id);
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    handleUserActivity(); // Start the timer

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, [timeoutId, navigate]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        const results = data.filter(
          (item) =>
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.phoneNumber.includes(value)
        );
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
        <div className="d-flex mt-5">
          <img src={Heart} className="me-3 img-heart" alt="fav" />
          <p className="show-fav">Show Favourites</p>
        </div>
      </div>
      <div className="pt-4">
        <h2 className="my-4 header3-prop">Search Customer</h2>
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
          <h2 className="header4-prop">Customer List</h2>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="col-md-12 row mb-4">
                <div className="col-2">
                  <img src={item.img} alt={item.Name} className="img-rounded" />
                </div>
                <div className="col-7 d-flex align-items-center row mb-5 ms-5">
                  <h4>{item.phoneNumber || "N/A"}</h4>
                  <h1>{item.Name}</h1>
                  <h5>{item.address || "N/A"}</h5>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <Button
                    as={Link}
                    to={`/data/${item.id}`}
                    className="btnn-view d-flex me-2 w-75 fs-4"
                  >
                    View
                    <img src={arrow} className="ms-3 w-25" alt="arrow" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <h4>No results found</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewComponent;
