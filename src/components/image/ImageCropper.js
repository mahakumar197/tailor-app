import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage/cropImage"; // Correct import

const ImageCropper = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropCompleteCallback = useCallback(
    (croppedArea, croppedAreaPixels) => {
      // Crop complete callback
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  return (
    <div
      className="crop-container"
      style={{ position: "relative", width: "200px", height: "200px" }}
    >
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1} // Square crop
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropCompleteCallback}
        style={{ width: "100%", height: "100%" }}
      />
      {/* Add any additional controls or buttons here */}
    </div>
  );
};

export default ImageCropper;
