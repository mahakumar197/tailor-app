import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./Logo.png";
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
      navigate("/"); // Redirect to home after successful login
    } else {
      console.log("Invalid credentials");
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <div className="content-center mt-5">
        <div className="d-flex justify-content-center">
          <img className="img-icon" src={logo} alt="Logo" />
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="form-content">
            <h1 className="pb-4 d-flex justify-content-center">Login</h1>
            <Form.Group controlId="formUsername" className="mt-4">
              <Form.Label className="pb-2 fs-3 form-label-prop">
                Enter Number
              </Form.Label>
              <Form.Control
                type="text"
                className="data-input"
                placeholder="Enter Number"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-4">
              <Form.Label className="pb-2 fs-3 form-label-prop">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                className="data-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </div>

          <div className="d-flex justify-content-center">
            <Button variant="dark" className="mt-5 btnn-log" type="submit">
              Login
              <img src={arrow} className="ms-2" alt="arrow" />
            </Button>
          </div>
          <p className="d-flex justify-content-center fs-4 pt-4">
            Forgot Password?
          </p>
        </Form>
        <div className="copyright">
          <h4>Version 0.1</h4>
          <div className="mt-3">
            <h5>
              Copyrights owned by <span className="ms-3 head-t2">HARDMAN</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
