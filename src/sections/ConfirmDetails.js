import React, { useState } from "react";
import '../css/CommonStyles.css';
import '../css/ConfirmDetails.css';

const Section = ({ editedImages, onContinue, orderNum, locketCode, engravingMessage, selectedFont, onBack }) => {

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const handleConfirm = () => {

    if (!isConfirmed) {
      setHighlight(true);
      // Remove highlight after animation duration (e.g. 1s)
      setTimeout(() => setHighlight(false), 1000);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const padding = 10;
    const imageWidth = 300;
    const imageHeight = 300;
    const totalWidth = editedImages.length * imageWidth + (editedImages.length - 1) * padding;
    const totalHeight = imageHeight;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    let loadedImages = 0;

    editedImages.forEach((image, index) => {
      const img = new Image();
      img.src = image.edited || image.original;
      img.crossOrigin = "anonymous"; // Ensure CORS is enabled if necessary.

      img.onload = () => {
        const x = index * (imageWidth + padding);
        ctx.drawImage(img, x, 0, imageWidth, imageHeight);
        loadedImages++;

        if (loadedImages === editedImages.length) {
          // Convert the canvas to a data URL.
          const combinedImageDataUrl = canvas.toDataURL("image/png");
          // Remove the data URL prefix so that only the base64 data remains.
          const base64Data = combinedImageDataUrl.replace(/^data:image\/png;base64,/, "");

          // Construct a custom file name.
          const fileName = `${orderNum}_${locketCode}.png`;

          // Prepare the POST request parameters including the secret token and custom filename.
          const formData = new URLSearchParams();
          formData.append("image", base64Data);
          formData.append("token", "LAKSHlkjashdflIAUHljfahliu78689AYOLIUh"); // Must match the token in your Apps Script.
          formData.append("filename", fileName);
          // Include order details for your Google Sheet
          formData.append("orderNum", orderNum);
          formData.append("locketCode", locketCode);

          // Apps Script Web App URL.
          fetch("https://script.google.com/macros/s/AKfycbxGamRR0yXd3CFQVQwYQ7uulR4GLh4WRyJn6YKoFTz2SvBLit9CAW05lNXLjJS1xN0npQ/exec", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                console.log("Image uploaded successfully!");
                console.log("File URL:", data.fileUrl);
              } else {
                console.error("Upload failed:", data.error);
              }
            })
            .catch((err) => console.error("Error during upload:", err));
        }
      };

      img.onerror = (err) => console.error("Image load error:", err);
    });

    onContinue();
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
                  <img src={image.edited} alt={`Edited ${index + 1}`} className="edited-image" />
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
          I can confirm that I am happy with my submission and you can now proceed with my order.
        </label>
      </div>

      <div className="buttonDiv">
        <div>
          <input
            type="button"
            value="Back"
            onClick={() => onBack()}
            className="InputButton"
          />
        </div>
        <div>
          <input
            type="button"
            value="Confirm"
            onClick={handleConfirm}
            className="InputButton"
          />
        </div>
      </div>
    </div>
  );
};

export default Section;