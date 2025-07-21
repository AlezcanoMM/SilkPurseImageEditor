import React, { useState, useEffect, useRef } from "react";
import "../css/EditImage.css";
import "../css/CommonStyles.css";

const Section = ({ imageToEdit, shape, onSave, onCancel }) => {
  const [zoom, setZoom] = useState(1); // Default zoom level
  const [zoomSlider, setZoomSlider] = useState(0); // range
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
    setZoomSlider(0);
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
    const sliderValue = parseFloat(e.target.value);
    setZoomSlider(sliderValue);

    if (sliderValue === 0) {
      setZoom(1);
    } else if (sliderValue > 0) {
      setZoom(sliderValue+1);
    } else {
      setZoom(1 / Math.abs(sliderValue-1));
    }
  };

  // Handle rotation change
  const handleRotationChange = (e) => setRotation(e.target.value);

  // Start dragging
  const startDrag = (e) => {
    e.preventDefault();
    setDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  // Drag image while holding down the mouse
  const dragImage = (e) => {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    setStartX(e.clientX);
    setStartY(e.clientY);

    setOffsetX(prev => prev + dx);
    setOffsetY(prev => prev + dy);
  };

  // Stop dragging
  const stopDrag = () => {
    setDragging(false);
  };

  //PHONE AND TOUCH EVENTS
  // Start dragging (touch)
  const startTouchDrag = (e) => {
    const touch = e.touches[0];
    setDragging(true);
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  // Drag image (touch)
  const touchDragImage = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    setStartX(touch.clientX);
    setStartY(touch.clientY);

    setOffsetX((prev) => prev + dx);
    setOffsetY((prev) => prev + dy);
  };

  // Stop dragging (touch)
  const stopTouchDrag = () => {
    setDragging(false);
  };

  
  const handleSave = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = imageRef.current;
    const maskImg = new Image();
    maskImg.src = shape;

    maskImg.onload = () => {
      const container = canvas.parentElement;
      const containerRect = container.getBoundingClientRect();

      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      const maskAspectRatio = maskImg.width / maskImg.height;
      const containerAspectRatio = containerWidth / containerHeight;

      let canvasWidth, canvasHeight;

      if (maskAspectRatio > containerAspectRatio) {
        canvasWidth = containerWidth;
        canvasHeight = containerWidth / maskAspectRatio;
      } else {
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * maskAspectRatio;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // --- Version A: With offwhite background ---

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill with offwhite
      ctx.fillStyle = "#f2f0e9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw transformed image
      ctx.save();
      ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
      ctx.restore();

      // Clip with mask (destination-in)
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";

      // Export version with offwhite
      const editedWithOffwhite = canvas.toDataURL("image/png");

      // --- Version B: Without offwhite background ---

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw transformed image only (no background)
      ctx.save();
      ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
      ctx.restore();

      // Clip with mask (destination-in)
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";

      // Export version without offwhite
      const editedWithoutOffwhite = canvas.toDataURL("image/png");

      onSave({
        original: imageToEdit.original,
        editedWithOffwhite,
        editedWithoutOffwhite,
        hasBeenEdited: true,
      });
    };

    maskImg.onerror = () => {
      console.error("Error loading the mask image:", shape);
    };
  };


  useEffect(() => {
    const imgElement = imageRef.current;

    if (!imgElement) return;

    const handleTouchStart = (e) => {
      e.preventDefault();
      startTouchDrag(e);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      touchDragImage(e);
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      stopTouchDrag();
    };

    // Attach listeners with passive: false
    imgElement.addEventListener("touchstart", handleTouchStart, { passive: false });
    imgElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    imgElement.addEventListener("touchend", handleTouchEnd, { passive: false });
    imgElement.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    // Cleanup
    return () => {
      imgElement.removeEventListener("touchstart", handleTouchStart);
      imgElement.removeEventListener("touchmove", handleTouchMove);
      imgElement.removeEventListener("touchend", handleTouchEnd);
      imgElement.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [dragging, startX, startY]);


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
          maskImage: `url("${shape}")`,
          WebkitMaskImage: `url("${shape}")`,
          backgroundImage: `url("${shape}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >

        <img
          src={shape}
          alt="Mask outline"
          className="mask-outline"
        />

        {/* Editable image */}
        <div
          className="editable-image-container"
          onMouseMove={dragImage}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <img
            ref={imageRef}
            src={imageToEdit?.original}
            alt="Editable"
            className="editable-image"
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom}) rotate(${rotation}deg)`,
            }}
            onMouseDown={startDrag}
          />
        </div>

        {/* Hidden canvas for saving */}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>

      <div style={{width: "34%"}}>
        <button onClick={resetState} className="reset-button-icon"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg> </button>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="control-group">
          <label htmlFor="zoom">Zoom:</label>
          <input
            id="zoom"
            type="range"
            min="-6"
            max="6"
            step="0.01"
            value={zoomSlider}
            onChange={handleZoomChange}
          />
        </div>

        <div className="control-group">
          <label htmlFor="rotation">Rotate:</label>
          <input
            id="rotation"
            type="range"
            min="-180"
            max="180"
            step="1"
            value={rotation}
            onChange={handleRotationChange}
          />
        </div>
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