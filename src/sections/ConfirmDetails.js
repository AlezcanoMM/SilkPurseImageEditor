import React, { useState, useEffect } from "react";
import '../css/CommonStyles.css';
import '../css/ConfirmDetails.css';

const Section = ({
  orderNum,
  locketCode,
  engravingAllowed,
  notes,
  editedImages,
  locketName,
  shape,
  frontEngraving,
  frontFont,
  backEngraving,
  backFont,
  insideEngraving,
  insideFont,
  listingPhoto,
  onContinue,
  onBack,
  customer
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [highlightConfirm, setHighlightConfirm] = useState(false);
  const [showConnectionMsg, setShowConnectionMsg] = useState(false);

  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setShowConnectionMsg(true);
      }, 6000);
    } else {
      setShowConnectionMsg(false); // reset when loading ends
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleConfirmClick = () => {
    if (!isConfirmed) {
      setHighlightConfirm(true);
      setTimeout(() => setHighlightConfirm(false), 1500);
      return;
    }
    handleConfirm();
  };

  const handleAddAnotherClick = () => {
    if (!isConfirmed) {
      setHighlightConfirm(true);
      setTimeout(() => setHighlightConfirm(false), 1500);
      return;
    }
    handleConfirm(true);
  };

  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error("Failed to load image", src);
        resolve(null); // resolve with null to continue
      };
      img.src = src;
    });

  const handleConfirm = async (reloadOnSuccess = false) => {
    if (!shape) {
      alert("Shape image is missing.");
      return;
    }

    setLoading(true);

    const shapeImg = await loadImage(shape);
    if (!shapeImg) {
      alert("Failed to load shape image.");
      setLoading(false);
      return;
    }

    const paddingX = 23;
    const paddingY = 69;
    const imagesPerRow = 5;

    const imageWidth = shapeImg.naturalWidth;
    const imageHeight = shapeImg.naturalHeight;

    const rows = Math.ceil(editedImages.length / imagesPerRow);
    const totalWidth = (Math.min(editedImages.length, imagesPerRow) * imageWidth) +
                      ((Math.min(editedImages.length, imagesPerRow) - 1) * paddingX);
    const totalHeight = (rows * imageHeight) + ((rows - 1) * paddingY);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // load all edited images in parallel
    const loadedImgs = await Promise.all(
      editedImages.map(imgObj =>
        loadImage(imgObj.editedWithoutOffwhite || imgObj.editedWithOffwhite || imgObj.original)
      )
    );

    // draw each image in its position (skip nulls)
    loadedImgs.forEach((img, index) => {
      if (!img) return;
      const row = Math.floor(index / imagesPerRow);
      const col = index % imagesPerRow;
      const x = col * (imageWidth + paddingX);
      const y = row * (imageHeight + paddingY);
      ctx.drawImage(img, x, y, imageWidth, imageHeight);
    });

    // export
    const combinedImageDataUrl = canvas.toDataURL("image/png");
    const base64Data = combinedImageDataUrl.replace(/^data:image\/png;base64,/, "");
    const fileName = `${customer}_${orderNum}.png`;
    
    const formData = new URLSearchParams();
    formData.append("image", base64Data);
    formData.append("filename", fileName);
    formData.append("orderNum", orderNum);
    formData.append("locketName", locketName);
    formData.append("customer", customer);
    if (engravingAllowed) {
      formData.append("frontEngraving", frontEngraving);
      formData.append("frontFont", frontFont);
      formData.append("backEngraving", backEngraving);
      formData.append("backFont", backFont);
      formData.append("insideEngraving", insideEngraving);
      formData.append("insideFont", insideFont);
    }
    if (notes?.trim()) {
      formData.append("notes", notes.trim());
    }

    try {
      const res = await fetch("https://make-my-locket.onrender.com/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        reloadOnSuccess ? window.location.reload() : onContinue();
      }
    } catch (err) {
      setLoading(false);
      alert("Error during upload, please try again.");
      console.error("Error during upload:", err);
    }
  };

  return (
    <div className="SectionDetails">
      <h1>Confirm Details</h1>

      <div className="confirmation-header">
        {listingPhoto && (
          <img src={listingPhoto} alt={locketCode} className="listing-photo" />
        )}
        <div className="details-text">
          <div className="detail-item">
            <h4>Order Number</h4>
            <span>{orderNum}</span>
          </div>
          <div className="detail-item">
            <h4>Locket Code</h4>
            <span>{locketCode}</span>
          </div>

          {engravingAllowed && (
            <>
              {frontEngraving && (
                <div className="detail-item">
                  <h4>Front Engraving</h4>
                  <span>{frontEngraving}</span>
                  <h4>Font</h4>
                  <span>{frontFont}</span>
                </div>
              )}
              {backEngraving && (
                <div className="detail-item">
                  <h4>Back Engraving</h4>
                  <span>{backEngraving}</span>
                  <h4>Font</h4>
                  <span>{backFont}</span>
                </div>
              )}
              {insideEngraving && (
                <div className="detail-item">
                  <h4>Inside Engraving</h4>
                  <span>{insideEngraving}</span>
                  <h4>Font</h4>
                  <span>{insideFont}</span>
                </div>
              )}
            </>
          )}

          {notes?.trim() && (
            <div className="detail-item">
              <h4>Notes</h4>
              <span>{notes}</span>
            </div>
          )}
        </div>
      </div>

      <hr className="confirmation-separator" />

      <div className="edited-images-container">
        {editedImages.length > 0 ? (
          <div className="edited-grid">
            {editedImages.map((image, index) => (
              <div key={index} className="edited-image-item">
                <div className="edited-image-wrapper">
                  <div className="side-text">{image.side}</div>
                  <img
                    src={image.editedWithOffwhite}
                    alt={`Edited ${index + 1}`}
                    className="edited-image"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No edited images available</p>
        )}
      </div>

      <div className="button-section">
        <div className="back-button-wrapper">
          <button onClick={onBack} className="InputButton" disabled={loading}>
            Edit Order
          </button>
        </div>

        <div className={`confirmSubmission ${highlightConfirm ? "highlightConfirm" : ""}`}>
          <label>
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />{" "}
            I confirm that all my personalisation details are correct and you may proceed with my order.
          </label>
        </div>

        <div className="confirm-buttons-row">
          <button
            onClick={handleAddAnotherClick}
            className="InputButton"
            disabled={loading}
          >
            Add Another Locket
          </button>
          <button
            onClick={handleConfirmClick}
            className="InputButton"
            disabled={loading}
          >
            Confirm And Finish
          </button>
        </div>
      </div>

      {loading && (
        <div className="loadingOverlay">
          <div className="spinner"></div>
          <div className="loadingText">
            <p>Sending images...</p>
            {showConnectionMsg && (
              <div>
                <p>CONNECTING TO SERVER.....</p>
                <p>PLEASE DO NOT EXIT DURING THIS STAGE OR YOUR IMAGES MAY NOT BE SUBMITTED</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
