import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import ImageCropper from "./image/ImageCropper";
import { getCroppedImg } from "./image/cropImage/cropImage"; // Make sure this path is correct
import { Button } from "react-bootstrap";
import arrow from "./arrowleft.png";

const EditComponent = () => {
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

  const [invalidImage, setInvalidImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    file: null,
    filepreview: null,
  });
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // Define croppedImage state
  const { id } = useParams();
  const navigate = useNavigate();
const [toggle, setToggle] = useState(1);

function updateToggle(id) {
  setToggle(id);
}
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

  const handleFileChange = (event) => {
    const imageFile = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (!imageFile) {
      setInvalidImage("Please select an image.");
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
      setInvalidImage("Please select a valid image (JPG, JPEG, PNG, GIF).");
      return false;
    }

    if (imageFile.size > maxSize) {
      setInvalidImage("File size exceeds 5MB. Please upload a smaller image.");
      return false;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const onCropComplete = async (croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(file, croppedAreaPixels);
      setCroppedImage(croppedImg); // Set the cropped image
      resizeAndSetImage(croppedImg);
    } catch (error) {
      console.error("Error cropping image:", error);
      setInvalidImage("Error cropping image.");
    }
  };

  const resizeAndSetImage = (croppedImg) => {
    const img = new Image();
    img.src = croppedImg;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_WIDTH = 437;
      const MAX_HEIGHT = 437;
      let { width, height } = img;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          const file = new File([blob], "croppedImage.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          const filePreview = URL.createObjectURL(file);
          setUserInfo({ file, filepreview: filePreview });
          setData((prevData) => ({ ...prevData, img: filePreview }));
          setInvalidImage(null);
        },
        "image/jpeg",
        1
      );
    };

    img.onerror = () => {
      setInvalidImage("Invalid image content.");
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://sheet.best/api/sheets/dde291c8-6117-4ecc-a292-73e37c8d71bb/id/${id}`,
        data
      )
      .then((response) => {
        navigate(`/data/${id}`); // Redirect to view component
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Edit Customer</h1>
        <Link to={`/`} className="btn btn-sm fs-2 mt-4">
          <img src={arrow} className="ms-4 img-height-arrow me-3" alt="arrow" />
          back
        </Link>
      </div>
      <div className="tab">
        <ul className="d-flex justify-content-between">
          <li className="list-prop" onClick={() => updateToggle(1)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Personal Details
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(2)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Shirt
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(3)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Suit
            </Button>
          </li>
          <li className="list-prop" onClick={() => updateToggle(4)}>
            <Button variant="dark" className="btnn-tab d-flex me-2 mt-5 fs-4">
              Trouser
            </Button>
          </li>
        </ul>
      </div>

      <Form onSubmit={handleSubmit}>
        <div className={toggle === 1 ? "show-content" : "content"}>
          <Form.Group as={Row} controlId="formName">
            <Form.Label className="label-props  mb-2" column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="Name"
                value={data.Name}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPhoneNumber">
            <Form.Label className="label-props  mb-2" column sm="2">
              Phone Number
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAddress">
            <Form.Label className="label-props  mb-2" column sm="2">
              Address
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formImage">
            <Form.Label className="label-props  mb-2" column sm="2">
              Image
            </Form.Label>
            <Col sm="10">
              <input type="file" onChange={handleFileChange} />
              {file && (
                <ImageCropper image={file} onCropComplete={onCropComplete} />
              )}
              {croppedImage && (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  style={{ width: "10px", height: "10px" }}
                />
              )}
              {userInfo.filepreview && (
                <img src={userInfo.filepreview} alt="Preview" />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formComments">
            <Form.Label className="label-props  mb-2" column sm="2">
              Comments
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="comments"
                value={data.comments}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </div>
        <div className={toggle === 2 ? "show-content" : "content"}>
          <Form.Group as={Row} controlId="formSuit">
            <Form.Label className="label-props  mb-2" column sm="2">
              Suit
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="Suit"
                value={data.Suit}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formWaistCoat">
            <Form.Label className="label-props  mb-2" column sm="2">
              Waist Coat
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="WaistCoat"
                value={data.WaistCoat}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBandhi">
            <Form.Label className="label-props  mb-2" column sm="2">
              Bandhi
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="Bandhi"
                value={data.Bandhi}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formIndowestern">
            <Form.Label className="label-props  mb-2" column sm="2">
              Indowestern
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="Indowestern"
                value={data.Indowestern}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </div>
        <div className={toggle === 3 ? "show-content" : "content"}>
          <Form.Group as={Row} controlId="formShirt">
            <Form.Label className="label-props  mb-2" column sm="2">
              Shirt
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="shirt"
                value={data.shirt}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formKurta">
            <Form.Label className="label-props  mb-2" column sm="2">
              Kurta
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="kurta"
                value={data.kurta}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formShoulder">
            <Form.Label className="label-props  mb-2" column sm="2">
              Shoulder
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="shoulder"
                value={data.shoulder}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formSleeveLength">
            <Form.Label className="label-props  mb-2" column sm="2">
              Sleeve Length
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="sleeveLength"
                value={data.sleeveLength}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formChest">
            <Form.Label className="label-props  mb-2" column sm="2">
              Chest
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="chest"
                value={data.chest}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </div>
        <div className={toggle === 4 ? "show-content" : "content"}>
          <Form.Group as={Row} controlId="formWaist">
            <Form.Label className="label-props  mb-2" column sm="2">
              Waist
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="waist"
                value={data.waist}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formSeat">
            <Form.Label className="label-props  mb-2" column sm="2">
              Seat
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="seat"
                value={data.seat}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formNeck">
            <Form.Label className="label-props  mb-2" column sm="2">
              Neck
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="neck"
                value={data.neck}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBicep">
            <Form.Label className="label-props  mb-2" column sm="2">
              Bicep
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className="fs-2"
                type="text"
                name="bicep"
                value={data.bicep}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </div>

        <Button
          type="submit"
          className="btnn-tab btn-dark d-flex me-2 mt-5 fs-4"
          style={{ width: "270px" }}
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditComponent;
