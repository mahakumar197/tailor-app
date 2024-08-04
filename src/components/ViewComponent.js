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
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb`
        );
        setData(response.data);
        console.log(response.data,"dsts")
        setFilteredData(response.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

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

    // Setup user activity timeout
    // const handleUserActivity = () => {
    //   clearTimeout(window.activityTimeout);
    //   window.activityTimeout = setTimeout(() => {
    //     navigate("/login");
    //   }, 5 * 60 * 1000); // 5 minutes
    // };

    // window.addEventListener("mousemove", handleUserActivity);
    // window.addEventListener("keydown", handleUserActivity);
    // window.addEventListener("click", handleUserActivity);

    // handleUserActivity(); // Start the timer

    // return () => {
    //   clearTimeout(window.activityTimeout);
    //   window.removeEventListener("mousemove", handleUserActivity);
    //   window.removeEventListener("keydown", handleUserActivity);
    //   window.removeEventListener("click", handleUserActivity);
    // };
  }, [navigate]);

  // Debounce the search input
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
                  <Link
                    to={`/edit/${item.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>
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
