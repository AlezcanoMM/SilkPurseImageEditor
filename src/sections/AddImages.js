import React, { useState, useEffect } from "react";
import '../css/AddImages.css';
import '../css/CommonStyles.css';

import CroppingAdvice from '../assets/images/photoAdvice/Cropping.png';
import LightingAdvice from '../assets/images/photoAdvice/Lighting.png';
import BnWAdvice from '../assets/images/photoAdvice/BnW.png';
import SizeAdvice from '../assets/images/photoAdvice/Size.png';


const Section = ({ onContinue, setImages, numberImages, setEditedImages, onBack, images }) => {
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
      if (localImages.length + validImages.length > numberImages) {
        alert(`You can only upload up to ${numberImages} images.`);
      } else {
        const newImages = validImages.map(file => {
          const imageURL = URL.createObjectURL(file);
          return { original: imageURL, edited: imageURL };
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
      if (localImages.length + validImages.length > numberImages) {
        alert(`You can only upload up to ${numberImages} images.`);
      } else {
        const newImages = validImages.map(file => {
          const imageURL = URL.createObjectURL(file);
          return { original: imageURL, edited: imageURL, hasBeenEdited: false, side: "left" };
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
    if (localImages.length === 0 || localImages.length > numberImages) {
      alert(`Please upload at least one image and a maximum of ${numberImages}`);
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

  return (
    <div className="SectionDetails">

      <div className="photoAdviceContainer">
        <p>Learn how to choose the right photos with our advice to create a beautiful locket necklace.</p>
        <button className="photoAdviceButton" onClick={() => setShowAdviceModal(true)}>
          How to choose the right photos?
        </button>
      </div>

      {showAdviceModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="closeModalButton" onClick={() => setShowAdviceModal(false)}>X</button>
            <div className="adviceGrid">
              {/* Left column */}
              <div className="adviceColumn">
                <div className="adviceBlock">
                  <h3>Cropping</h3>
                  <div className="imagePlaceholder"><img src={CroppingAdvice} alt="Cropping"/></div>
                  <p>Some background is helpful. It might be difficult to work with a photo which is cropped very closely</p>
                </div>
                <div className="adviceBlock">
                  <h3>Lighting</h3>
                  <div className="imagePlaceholder"><img src={LightingAdvice} alt="Lighting"/></div>
                  <p>Very pale or overexposed images won't work very well. Neither will very dark images.</p>
                </div>
              </div>

              {/* Right column */}
              <div className="adviceColumn">
                <div className="adviceBlock">
                  <h3>Size</h3>
                  <div className="imagePlaceholder"><img src={SizeAdvice} alt="Size"/></div>
                  <p>Think of the size of the locket (for tiny lockets we'd recommend no more than 2 faces close together).</p>
                </div>
                <div className="adviceBlock">
                  <h3>Black & White</h3>
                  <div className="imagePlaceholder"><img src={BnWAdvice} alt="Black and White"/></div>
                  <p>We wouldn't recommend black and white photos for our tiny SILVER locket, but for most other lockets they should work well!.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="ImportTitle">Add Images:</h1>

      <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
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
        <label htmlFor="file-input" className="InputButtonFile">
          Import
        </label>
      </div>

      <div id="image-preview">
        {localImages.length > 0 ? (
          localImages.map((image, index) => (
            <img key={index} src={image.original} alt={`Preview ${index}`} className="image-preview" />
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
          <input type="button" value="Confirm" onClick={handleClick} className="InputButton" />
        </div>
      </div>

      {showConfirmModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <p>Have you selected all your photos?</p>
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
