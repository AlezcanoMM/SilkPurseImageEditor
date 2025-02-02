import React from "react";
import '../css/ConfirmDetails.css';
import '../css/CommonStyles.css';

const Section = ({ editedImages, onContinue, orderNum, name, email, onBack }) => {

  const handleConfirm = () => {
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
          // You might want to sanitize name/email strings if necessary.
          const fileName = `${orderNum}_${name}_${email}.png`;

          // Prepare the POST request parameters including the secret token and custom filename.
          const formData = new URLSearchParams();
          formData.append("image", base64Data);
          formData.append("token", "LAKSHlkjashdflIAUHljfahliu78689AYOLIUh"); // Must match the token in your Apps Script.
          formData.append("filename", fileName);

          // Apps Script Web App URL.
          fetch("https://script.google.com/macros/s/AKfycbylbuesyi-4dezGMKYQLGQeD4E4fdnihiu2nNkIwnd3QNQPmg9IBTAxiQm52EaI74Th9Q/exec", {
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

      <div className="parentDiv">
        {/* Order Details Row */}
        <div className="rowDiv order-details">
          <h1>Order Details</h1>

          <div className="detail-row">
            <div className="detail-pair">
              <h4>Order Number</h4>
              <span>{orderNum}</span>
            </div>

            <div className="detail-pair">
              <h4>Name</h4>
              <span>{name}</span>
            </div>

            <div className="detail-pair">
              <h4>Email</h4>
              <span>{email}</span>
            </div>
          </div>
        </div>

        {/* Images Row */}
        <div className="rowDiv images">
          <div className="edited-images-container">
            {editedImages && editedImages.length > 0 ? (
              editedImages.map((image, index) => (
                <div key={index} className="edited-image-item">
                  <img src={image.edited} alt={`Edited ${index + 1}`} className="edited-image" />
                </div>
              ))
            ) : (
              <p>No edited images available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;