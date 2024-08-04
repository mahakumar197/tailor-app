import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const EditComponent = ({ match, history }) => {
  const [data, setData] = useState({
    Name: "",
    phoneNumber: "",
    address: "",
    img: "",
    Suit: "",
    WaistCoat: "",
    Bandhi: "",
    Indowestern: "",
    shirt: "",
    kurta: "",
    shoulder: "",
    sleeveLength: "",
    chest: "",
    waist: "",
    seat: "",
    neck: "",
    bicep: "",
    comments: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(
        `https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb/id/${id}`
      )
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        `https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb/id/${id}`,
        data
      )
      .then((response) => {
       navigate(`/data/${id}`);// Redirect to view component
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="Name"
            value={data.Name}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPhoneNumber">
        <Form.Label column sm="2">
          Phone Number
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formAddress">
        <Form.Label column sm="2">
          Address
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formImage">
        <Form.Label column sm="2">
          Image
        </Form.Label>
        <Col sm="10">
          <img
            src={data.img}
            alt="Profile"
            style={{ width: "100px", height: "100px" }}
          />
          <Form.Control
            type="text"
            name="img"
            value={data.img}
            onChange={handleChange}
            placeholder="Paste base64 image data"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formSuit">
        <Form.Label column sm="2">
          Suit
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="Suit"
            value={data.Suit}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formWaistCoat">
        <Form.Label column sm="2">
          Waist Coat
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="WaistCoat"
            value={data.WaistCoat}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBandhi">
        <Form.Label column sm="2">
          Bandhi
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="Bandhi"
            value={data.Bandhi}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formIndowestern">
        <Form.Label column sm="2">
          Indowestern
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="Indowestern"
            value={data.Indowestern}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formShirt">
        <Form.Label column sm="2">
          Shirt
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="shirt"
            value={data.shirt}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formKurta">
        <Form.Label column sm="2">
          Kurta
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="kurta"
            value={data.kurta}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formShoulder">
        <Form.Label column sm="2">
          Shoulder
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="shoulder"
            value={data.shoulder}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formSleeveLength">
        <Form.Label column sm="2">
          Sleeve Length
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="sleeveLength"
            value={data.sleeveLength}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formChest">
        <Form.Label column sm="2">
          Chest
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="chest"
            value={data.chest}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formWaist">
        <Form.Label column sm="2">
          Waist
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="waist"
            value={data.waist}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formSeat">
        <Form.Label column sm="2">
          Seat
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="seat"
            value={data.seat}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formNeck">
        <Form.Label column sm="2">
          Neck
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="neck"
            value={data.neck}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBicep">
        <Form.Label column sm="2">
          Bicep
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="bicep"
            value={data.bicep}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formComments">
        <Form.Label column sm="2">
          Comments
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            name="comments"
            value={data.comments}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm="10">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EditComponent;
