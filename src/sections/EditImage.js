import React, { useState, useEffect, useRef } from "react";
import "../css/EditImage.css";
import "../css/CommonStyles.css";

const Section = ({ imageToEdit, shape, onSave, onCancel }) => {
  const [zoom, setZoom] = useState(1); // Default zoom level
  const [rotation, setRotation] = useState(0); // Default rotation angle
  const [offsetX, setOffsetX] = useState(0); // Image offset for dragging
  const [offsetY, setOffsetY] = useState(0); // Image offset for dragging
  const [dragging, setDragging] = useState(false); // Track dragging state
  const [startX, setStartX] = useState(0); // Starting mouse X position
  const [startY, setStartY] = useState(0); // Starting mouse Y position

  const imageRef = useRef(null); // Reference for the image to edit
  const canvasRef = useRef(null); // Reference for the canvas

  const resetState = () => {
    setZoom(1);
    setRotation(0);
    setOffsetX(0);
    setOffsetY(0);
    setDragging(false);
    setStartX(0);
    setStartY(0);
  };

  useEffect(() => {
    resetState(); // Call resetState when imageToEdit changes
  }, [imageToEdit]);

  // Handle zoom change
  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  // Handle rotation change
  const handleRotationChange = (e) => setRotation(e.target.value);

  // Start dragging
  const startDrag = (e) => {
    // Only start drag if mouse button is pressed
    setDragging(true);
    setStartX(e.clientX - offsetX);
    setStartY(e.clientY - offsetY);
  };

  // Stop dragging
  const stopDrag = () => {
    setDragging(false); // Stop dragging on mouseup or mouseleave
  };

  // Drag image
  const dragImage = (e) => {
    if (!dragging) return; // If not dragging, don't update position

    const newOffsetX = e.clientX - startX;
    const newOffsetY = e.clientY - startY;

    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = imageRef.current;
    const maskImg = new Image();
    maskImg.src = shape; // The mask shape image URL (e.g., heart, circle, etc.)

    maskImg.onload = () => {
      // Set the canvas size to match the edit-image-container size (300x300)
      canvas.width = 300;
      canvas.height = 300;

      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the mask shape (the mask will be used to clip the image)
      ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);

      // Apply clipping based on the mask
      ctx.globalCompositeOperation = "source-in"; // Ensures that only the part of the image covered by the mask is visible

      // Save the current canvas state before applying transformations
      ctx.save();

      // Translate to the center of the canvas (150, 150) - since the canvas is 300x300
      ctx.translate((canvas.width / 2) + offsetX, (canvas.height / 2) + offsetY); // Move to the center of the canvas

      // Apply rotation to the image
      ctx.rotate((rotation * Math.PI) / 180); // Convert rotation to radians

      // Apply zoom (scaling)
      ctx.scale(zoom, zoom);

      // Calculate the rotated image's new width and height
      const imageWidth = img.width;
      const imageHeight = img.height;

      const drawX = -imageWidth / 2;
      const drawY = -imageHeight / 2;

      // Draw the image on the canvas with proper positioning
      ctx.drawImage(img, drawX, drawY, imageWidth, imageHeight);

      // Restore the canvas state after drawing
      ctx.restore();

      // Reset composite operation to default
      ctx.globalCompositeOperation = "source-over";

      // Export the result as a PNG image
      const editedImage = canvas.toDataURL("image/png");

      // Optionally, update the state to save the edited image in your app (base64 string)
      const editedImageObject = {
        original: imageToEdit.original,
        edited: editedImage,
        hasBeenEdited: true
      };

      onSave(editedImageObject); // Save the edited image state
    };

    maskImg.onerror = () => {
      console.error("Error loading the mask image:", shape);
    };
  };

  return (
    <div className="SectionDetails">
      <div className="subtitleDiv">
        <span>Click and drag the image to move it,</span>
        <span>and use the sliders to rotate or zoom the image.</span>
      </div>

      {/* Static shape in the center */}
      <div
        className="edit-image-container"
        style={{
          maskImage: `url(${shape})`,
          maskComposite: "intersect",
          WebkitMaskImage: `url(${shape})`,
          WebkitMaskComposite: "intersect",
          maskRepeat: "no-repeat", // Prevent repeating the mask image
          WebkitMaskRepeat: "no-repeat", // For Safari compatibility
          backgroundImage: `url(${shape})`, // Use background image to center the mask
          backgroundPosition: "center", // Center the mask image
          backgroundSize: "contain", // Ensure the mask scales properly without stretching
        }}
      >
        {/* Editable image */}
        <div className="editable-image-container">
          <img
            ref={imageRef}
            src={imageToEdit?.original}
            alt="Editable"
            className="editable-image"
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom}) rotate(${rotation}deg)`,
            }}
            onMouseDown={startDrag}
            onMouseMove={dragImage}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          />
        </div>

        {/* Hidden canvas for saving */}
        <canvas ref={canvasRef} width={300} height={300} style={{ display: "none" }}></canvas>
      </div>

      {/* Controls */}
      <div className="controls">
        <label>Zoom:</label>
        <input
          type="range"
          min="0.25"
          max="4"
          step="0.01"
          value={zoom}
          onChange={handleZoomChange}
        />

        <label>Rotate:</label>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={rotation}
          onChange={handleRotationChange}
        />
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={onCancel} className="cancel-button">Cancel</button>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
    </div>
  );
};

export default Section;