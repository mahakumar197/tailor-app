import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import star from "./Subtract.png";
import arrow from "./arrow.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const hardcodedUsername = "9876543210";
    const hardcodedPassword = "Today@2024";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      console.log("Login successful");
      navigate("/");
    } else {
      console.log("Invalid credentials");
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="container-fluid BG-login">
      <div className="container">
        <div className="content-center mt-5">
          {/* <p className="head-t1 m-0">Welcome to</p> */}
          <div className="d-flex">
            <p className="head-t2">HARDMAN</p>
            <img className="img-icon" src={star} alt="loading" />
          </div>
          <div className="form-content">
            <h1 className=" pb-4">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mt-4">
                <Form.Label className="pb-2 fs-2">Enter Number</Form.Label>
                <Form.Control
                  type="text"
                  className="data-input"
                  placeholder="Enter Number"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-4">
                <Form.Label className="pb-2 fs-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  className="data-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {errorMessage && (
                <p className="text-danger mt-2">{errorMessage}</p>
              )}
              <Button variant="dark" className="mt-5 btnn-log" type="submit">
                Login
                <img src={arrow} className="ms-2" alt="arrow" />
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
