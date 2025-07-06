import React, { useState } from "react";
import '../css/CommonStyles.css';
import '../css/ConfirmDetails.css';

const Section = ({
  editedImages,
  onContinue,
  orderNum,
  locketCode,
  engravingMessage,
  selectedFont,
  onBack,
  engravingAllowed,
  locketName,
  shape,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [loading, setLoading] = useState(false); // <-- new loading state

  const handleConfirm = () => {
    if (!isConfirmed) {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1000);
      return;
    }

    if (!shape) {
      alert("Shape image is missing.");
      return;
    }

    setLoading(true); // show loading overlay

    const shapeImg = new Image();
    shapeImg.src = shape;
    shapeImg.crossOrigin = "anonymous";

    shapeImg.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const padding = 10;
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
            formData.append("token", "LAKSHlkjashdflIAUHljfahliu78689AYOLIUh");
            formData.append("filename", fileName);
            formData.append("orderNum", orderNum);
            formData.append("locketName", locketName);
            formData.append("engravingMessage", engravingMessage);
            formData.append("selectedFont", selectedFont);

            fetch("https://script.google.com/macros/s/AKfycby1Oeahh_7wfx8hADUCgh7S_wI49r7tLt4tjAhB2qOoEwwcKtrD2awY-rcXbXc-7drNdg/exec", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formData.toString(),
            })
              .then((res) => res.json())
              .then((data) => {
                setLoading(false); // hide loading overlay
                if (data.success) {
                  console.log("Image uploaded successfully!");
                  console.log("File URL:", data.fileUrl);
                  onContinue(); // proceed on success
                } else {
                  alert("Upload failed, please try again.");
                }
              })
              .catch((err) => {
                setLoading(false); // hide loading overlay
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
      <div>
        <h1>Confirm Details</h1>
      </div>

      <div className="parentDiv">
        {/* Order Details Row */}
        <div className="rowDiv order-details">
          <div>
            <h4>Order Number</h4>
            <span>{orderNum}</span>
          </div>

          {engravingMessage.trim() !== "" && (
            <div className="EngravingRow">
              <div>
                <h4>Engraving</h4>
                <span>{engravingMessage}</span>
              </div>
              <div>
                <h4>Font</h4>
                <span>{selectedFont}</span>
              </div>
            </div>
          )}
        </div>

        <div className="edited-images-container">
          {editedImages && editedImages.length > 0 ? (
            editedImages.map((image, index) => (
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
            ))
          ) : (
            <p>No edited images available</p>
          )}
        </div>
      </div>

      <div className={`confirmSubmission ${highlight ? "highlight" : ""}`}>
        <label>
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />{" "}
          I can confirm that I am happy with my submission and you can now proceed
          with my order.
        </label>
      </div>

      <div className="buttonDiv">
        <div>
          <input
            type="button"
            value="Back"
            onClick={() => onBack()}
            className="InputButton"
            disabled={loading}
          />
        </div>
        <div>
          <input
            type="button"
            value="Confirm"
            onClick={handleConfirm}
            className="InputButton"
            disabled={loading}
          />
        </div>
      </div>

      {loading && (
        <div className="loadingOverlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Section;
