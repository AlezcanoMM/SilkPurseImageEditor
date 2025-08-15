import React, { useState, useEffect } from "react";
import '../css/AddImages.css';
import '../css/CommonStyles.css';

import AdviceImage from '../assets/images/Infographic_Tips.jpg';

const Section = ({ onContinue, setImages, maxNumberImages, setEditedImages, onBack, images, isTiny }) => {
  const [localImages, setLocalImages] = useState([]);
  const [showAdviceModal, setShowAdviceModal] = useState(false); // Modal visibility

  useEffect(() => {
    if (images && images.length > 0) {
      setLocalImages(images);
    } else {
      setLocalImages([]);
    }
  }, [images]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));

    if (validImages.length > 0) {
      if (localImages.length + validImages.length > maxNumberImages) {
        alert(`You can only upload up to ${maxNumberImages} images.`);
      } else {
        const newImages = validImages.map(file => {
          const imageURL = URL.createObjectURL(file);
          return {
            original: imageURL,
            editedWithOffwhite: null,
            editedWithoutOffwhite: null,
            hasBeenEdited: false
          };
        });
        setLocalImages(prev => [...prev, ...newImages]);
        setImages(prev => [...prev, ...newImages]);
        setEditedImages(prev => [...prev, ...newImages]);
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
      if (localImages.length + validImages.length > maxNumberImages) {
        alert(`You can only upload up to ${maxNumberImages} images.`);
      } else {
        const newImages = validImages.map(file => {
          const imageURL = URL.createObjectURL(file);
          return {
            original: imageURL,
            editedWithOffwhite: null,
            editedWithoutOffwhite: null,
            hasBeenEdited: false
          };
        });
        setLocalImages(prev => [...prev, ...newImages]);
        setImages(prev => [...prev, ...newImages]);
        setEditedImages(prev => [...prev, ...newImages]);
      }
    } else {
      alert('Please select valid image files.');
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClick = () => {
    if (localImages.length === 0 || localImages.length > maxNumberImages) {
      alert(`Please upload at least one image and a maximum of ${maxNumberImages}`);
    } else {
      setShowConfirmModal(true); // Show modal instead of continuing immediately
    }
  };

  const handleConfirmYes = () => {
    setShowConfirmModal(false);
    onContinue(); // Proceed
  };

  const handleConfirmNo = () => {
    setShowConfirmModal(false); // Just close the modal
  };

  const handleDelete = (index) => {
    const updatedLocal = localImages.filter((_, i) => i !== index);
    const updatedGlobal = images.filter((_, i) => i !== index);

    setLocalImages(updatedLocal);
    setImages(updatedGlobal);
    setEditedImages(updatedGlobal);
  };

  return (
    <div className="SectionDetails">

      <div className="photoAdviceContainer">
        <h1>SUBMIT YOUR PHOTOS</h1>

        <button className="InputButton" onClick={() => setShowAdviceModal(true)}>
          Tips for Choosing the Perfect Picture!
        </button>

        <p style={{ color: '#EB7676', textTransform: 'uppercase', paddingTop: '5%' }}>Please take time to read out tips before proceeding.</p>
      </div>

      {showAdviceModal && (
        <div className="singleImageOverlay" onClick={() => setShowAdviceModal(false)}>
          <div className="modalImageWrapper" onClick={(e) => e.stopPropagation()}>
            <button
              className="popupCloseButton"
              onClick={() => setShowAdviceModal(false)}
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
            </button>
            <img
              src={AdviceImage}
              alt="Advice on how to use the image editor"
              className="singleImageModal"
            />
          </div>
        </div>
      )}

      <h1 className="ImportTitle">Add Images:</h1>

      <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="drop-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#5e5e5e"
          >
            <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
          </svg>
        </div>
        <p>Drag & Drop your image(s) here</p>
        <p>OR</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          id="file-input"
          className="file-input"
        />
        <label htmlFor="file-input" className="InputButtonFile InputButton">
          Import
        </label>
      </div>

      {isTiny && (
        <p style={{ color: '#EB7676' }}>
          WARNING! Your locket is tiny, make sure your images do not have more than one person.
        </p>
      )}

      <p>
        This locket can fit a maximum of {maxNumberImages} photos.
      </p>

      <div id="image-preview">
        {localImages.length > 0 ? (
          localImages.map((image, index) => (
            <div key={index} className="image-preview-item">
              <img src={image.original} alt={`Preview ${index}`} className="image-preview" />
                <button
                  className="delete-button1"
                  onClick={() => handleDelete(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e67272ff"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                </button>
            </div>
          ))
        ) : (
          <p>No images selected</p>
        )}
      </div>

      <div className="buttonDiv">
        <div>
          <input type="button" value="Back" onClick={() => onBack()} className="InputButton" />
        </div>
        <div>
          <input type="button" value="Edit photos" onClick={handleClick} className="InputButton" />
        </div>
      </div>

      {showConfirmModal && (
        <div className="modalOverlay2">
          <div className="modalContent2">
            <p>Have you uploaded all of your photos?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              <button className="InputButton" onClick={handleConfirmNo}>No</button>
              <button className="InputButton" onClick={handleConfirmYes}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
