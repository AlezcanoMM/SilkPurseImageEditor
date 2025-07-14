import React, { useState, useEffect } from "react";
import '../css/CommonStyles.css';
import '../css/ConfirmDetails.css';

import listingPhotos from '../assets/listingPhotos';

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
  onContinue,
  onBack
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const listingPhoto = locketCode ? listingPhotos[locketCode] : null;

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

  const handleConfirm  = (reloadOnSuccess = false) => {
    if (!shape) {
      alert("Shape image is missing.");
      return;
    }

    setLoading(true);
    const shapeImg = new Image();
    shapeImg.src = shape;
    shapeImg.crossOrigin = "anonymous";

    shapeImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const padding = 43; 
      const imageWidth = shapeImg.naturalWidth;
      const imageHeight = shapeImg.naturalHeight;
      const totalWidth = editedImages.length * imageWidth + (editedImages.length - 1) * padding;
      const totalHeight = imageHeight;

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      let loadedImages = 0;

      editedImages.forEach((image, index) => {
        const img = new Image();
        img.src = image.edited || image.original;
        img.crossOrigin = "anonymous";

        img.onload = () => {
          const x = index * (imageWidth + padding);
          ctx.drawImage(img, x, 0, imageWidth, imageHeight);
          loadedImages++;

          if (loadedImages === editedImages.length) {
            const combinedImageDataUrl = canvas.toDataURL("image/png");
            const base64Data = combinedImageDataUrl.replace(/^data:image\/png;base64,/, "");

            const fileName = `${orderNum}_${locketCode}.png`;

            const formData = new URLSearchParams();
            formData.append("image", base64Data);
            formData.append("filename", fileName);
            formData.append("orderNum", orderNum);
            formData.append("locketName", locketName);

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

            fetch("https://silkpurseimageeditor.onrender.com/submit-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formData.toString(),
            })
              .then((res) => res.json())
              .then((data) => {
                setLoading(false);
                if (data.success) {
                  if (reloadOnSuccess) {
                    window.location.reload();
                  } else {
                    onContinue();
                  }
                } else {
                  alert("Upload failed, please try again.");
                }
              })
              .catch((err) => {
                setLoading(false);
                alert("Error during upload, please try again.");
                console.error("Error during upload:", err);
              });
          }
        };

        img.onerror = (err) => {
          setLoading(false);
          alert("Image load error, please try again.");
          console.error("Image load error:", err);
        };
      });
    };

    shapeImg.onerror = () => {
      alert("Failed to load shape image.");
    };
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
                    src={image.edited}
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
            I can confirm that I am happy with my submission and you can now
            proceed with my order.
          </label>
        </div>

        <div className="confirm-buttons-row">
          <button
            onClick={handleAddAnotherClick}
            className="InputButton"
            disabled={loading}
          >
            Place New Order
          </button>
          <button
            onClick={handleConfirmClick}
            className="InputButton"
            disabled={loading}
          >
            Confirm
          </button>
        </div>
      </div>

      {loading && (
        <div className="loadingOverlay">
          <div className="spinner"></div>
          <div className="loadingText">
            <p>Sending images...</p>
            {showConnectionMsg && (
              <p>Connecting to server... this can take up to a minute</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
