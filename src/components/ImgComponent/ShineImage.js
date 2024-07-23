import React from "react";
import "./ShineImage.css";

const ShineImage = ({ src, alt }) => {
  return (
    <div className="image-wrapper">
      <img src={src} className="img-fluid shine" alt={alt} />
    </div>
  );
};

export default ShineImage;
