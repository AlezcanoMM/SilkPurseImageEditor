import React from "react";
import "../css/EditImages.css";
import "../css/CommonStyles.css";

const Section = ({ setImageToEdit, images, setImages, editedImages, setEditedImages, onContinue, onEditImage, onBack }) => {
  const handleDelete = (index) => {
    // Remove the image from both `images` and `editedImages` arrays
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedEditedImages = editedImages.filter((_, i) => i !== index);

    setImages(updatedImages);
    setEditedImages(updatedEditedImages); // Update edited images
  };

  const handleEdit = (index) => {
    // Pass the original image for editing
    const originalImage = images[index];
    setImageToEdit(originalImage); // Store the selected original image in the parent state
    onEditImage(); // Navigate to the edit section
  };

  const handleClick = () => {
    const allImagesEdited = editedImages.every((image) => image.hasBeenEdited === true);

    if (!allImagesEdited) {
      alert("Edit every image first");
      return;
    }

    onContinue();
  };

  return (
    <div className="SectionDetails">
      <h1 className="EditImagesTitle">Edit your photos</h1>

      <div className="image-preview-container">
        {editedImages.length > 0 ? (
          <div className="image-preview-row">
            {editedImages.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  src={image.edited || image.original} // Show the edited version or fallback to the original
                  alt={`Preview ${index}`}
                  className="image-preview"
                />

                <button onClick={() => handleEdit(index)} className="edit-button">
                  Edit
                </button>

                <button onClick={() => handleDelete(index)} className="delete-button">
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No images selected</p>
        )}
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
            onClick={handleClick}
            className="InputButton"
          />
        </div>
      </div>
    </div>
  );
};

export default Section;