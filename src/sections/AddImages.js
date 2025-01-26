import React, { useState, useEffect } from "react";
import '../css/AddImages.css';
import '../css/CommonStyles.css';

const Section = ({ onContinue, setImages, numberImages, setEditedImages, onBack, images }) => {
  const [localImages, setLocalImages] = useState([]); // Local state to manage images within this component

  // Update localImages whenever images prop changes
  useEffect(() => {
    if (images && images.length > 0) {
      setLocalImages(images); // Sync with images prop if it has content
    } else {
      setLocalImages([]); // If images is empty or null, set localImages to an empty array
    }
  }, [images]); // Run this effect when images prop changes

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));

    if (validImages.length > 0) {
      if (localImages.length + validImages.length > numberImages) {
        alert(`You can only upload up to ${numberImages} images.`);
      } else {
        const newImages = validImages.map(file => {
          const imageURL = URL.createObjectURL(file);
          return { original: imageURL, edited: imageURL }; // Both original and edited versions
        });
        setLocalImages(prevImages => [...prevImages, ...newImages]);
        setImages(prevImages => [...prevImages, ...newImages]); // Update parent state
        setEditedImages(prevImages => [...prevImages, ...newImages]);
      }
    } else {
      alert('Please drop valid image files.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));

    if (validImages.length > 0) {
      if (localImages.length + validImages.length > numberImages) {
        alert(`You can only upload up to ${numberImages} images.`);
      } else {
        const newImages = validImages.map(file => {
          const imageURL = URL.createObjectURL(file);
          return { original: imageURL, edited: imageURL, hasBeenEdited: false }; // Both original and edited versions
        });
        setLocalImages(prevImages => [...prevImages, ...newImages]);
        setImages(prevImages => [...prevImages, ...newImages]); // Update parent state
        setEditedImages(prevImages => [...prevImages, ...newImages]);
      }
    } else {
      alert('Please select valid image files.');
    }
  };

  const handleClick = () => {
    if (localImages.length === 0 || localImages.length > numberImages) {
      alert('Please upload at least one image and a maximum of ' + numberImages);
    } else {
      onContinue();
    }
  };

  return (
    <div className="SectionDetails">
      <h1 className="ImportTitle">Import your photos</h1>

      <div
        className="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag & Drop your image(s) here</p>
        <p>OR</p>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          id="file-input"
          className="file-input"
        />
        {/* Custom button */}
        <label htmlFor="file-input" className="InputButtonFile">
          Import
        </label>
      </div>

      <div id="image-preview">
        {localImages.length > 0 ? (
          localImages.map((image, index) => (
            <img
              key={index}
              src={image.original} // Display the original image as a preview
              alt={`Preview ${index}`}
              className="image-preview"
            />
          ))
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