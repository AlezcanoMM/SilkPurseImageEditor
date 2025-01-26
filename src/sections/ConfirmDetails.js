import React from "react";
import '../css/ConfirmDetails.css';
import '../css/CommonStyles.css';

const Section = ({ editedImages, onContinue, orderNum, name, email, onBack }) => {
  const handleConfirm = () => {
    // Create a new canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate the size of the canvas (for simplicity, let's say we're doing a horizontal row of images)
    const padding = 10; // Padding between images
    const imageWidth = 300; // Width of each image
    const imageHeight = 300; // Height of each image
    const totalWidth = editedImages.length * imageWidth + (editedImages.length - 1) * padding;
    const totalHeight = imageHeight; // Just one row of images

    // Set canvas size
    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // Draw each image on the canvas
    editedImages.forEach((image, index) => {
      const img = new Image();
      img.src = image.edited || image.original; // Use edited version or original image

      img.onload = () => {
        const x = index * (imageWidth + padding); // X position for each image
        const y = 0; // Y position (we're keeping all images in one row)

        // Draw the image onto the canvas
        ctx.drawImage(img, x, y, imageWidth, imageHeight);

        // If it's the last image, we trigger the download once all images are loaded
        if (index === editedImages.length - 1) {
          // Convert canvas to a downloadable data URL (PNG format)
          const combinedImageURL = canvas.toDataURL("image/png");

          // Create a link element to trigger the download
          const link = document.createElement("a");
          link.href = combinedImageURL;
          link.download = "silk_purse_edits.png"; // Name of the file to download
          link.click();
        }
      };
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