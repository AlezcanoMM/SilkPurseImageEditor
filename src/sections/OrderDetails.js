import React, { useState } from 'react';
import '../css/OrderDetails.css';
import '../css/CommonStyles.css';

import shapes from '../assets/shapes.json';
import Purchases from '../assets/images/FirstPagePurchases.png';

// Import all shape images using Webpack
const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const cleanedKey = key.replace('./', '');
    images[`/assets/shapes/${cleanedKey}`] = r(key);
  });
  return images;
};

const shapeImages = importAll(require.context('../assets/shapes', false, /\.(png|jpe?g)$/));


const Section = ({
  onContinue,
  onEngraving,
  setOrderNum,
  setLocketCode,
  setMaxNumberImages,
  setShape,
  orderNum,
  locketCode,
  setLocketName,
  setEngravingAllowed,
  shape
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (!orderNum?.trim() || !locketCode?.trim()) {
      alert("Please enter both the Order Number and Locket Code before continuing.");
      return;
    }

    handleConfirm();
  };

  const handleConfirm = () => {
    const normalizedCode = locketCode.trim().toUpperCase();

    const matchingKey = Object.keys(shapes).find(key => {
      const codePart = key.split('_')[0].toUpperCase();
      return codePart === normalizedCode;
    });

    if (!matchingKey) {
      alert("We couldn't find a matching shape for this locket code.");
      return;
    }

    try {
      const [code, name, numImages, engrave] = matchingKey
        .replace('.png', '')
        .replace('.jpg', '')
        .split('_');

      const imagePath = shapes[matchingKey]; // e.g. "/assets/shapes/LKGP-117_Moon Bracelet_2_E.png"
      const importedImage = shapeImages[imagePath];

      if (!importedImage) {
        console.error("Could not find image in shapeImages for:", imagePath);
        alert("Image file not found. Please check your locket code and try again.");
        return;
      }

      setShape(importedImage);
      setLocketName(name);
      setMaxNumberImages(parseInt(numImages, 10));
      setEngravingAllowed(engrave === 'E' || engrave === 'e');

      // Debug logs
      //console.log("All shape image keys:", Object.keys(shapeImages));
      console.log("Matched Key:", matchingKey);
      console.log("Parsed Name:", name);
      console.log("Num Images:", numImages);
      console.log("Engraving Allowed:", engrave === 'E');
      console.log("Shape URL:", importedImage);

      if(engrave === 'E' || engrave === 'e') {
        setShowModal(true);
      } else {
        onContinue();
      }
    } catch (err) {
      console.error("Error processing shape image:", err);
      alert("There was a problem processing your locket. Please try again.");
    }
  };

  return (
    <div className="SectionDetails">
      <div className="subtitleDiv">
        <div className="subtitleIntro">
          <p>To continue you will need to let us know your ORDER NUMBER and locket LOCKET CODE.</p>
          <p>This will help us locate your order and ensure that we use the correct locket!</p>
        </div>

        <p className="subtitleGap">How To Find Your Order Number And Locket Code.</p>

        <div className="subtitleInstructions">
          <p>Order Number: Profile Or Account &gt; Account &gt; Purchases</p>
          <p>Locket Code: Can be found at the end of the product title on the product page.</p>
        </div>
      </div>

      <div>
        <img src={Purchases} alt="Purchase details"/>
      </div>

      <div className='DivRow'>
        <input
          type="text"
          value={orderNum}
          onChange={(e) => setOrderNum(e.target.value)}
          placeholder="Order Number"
          className='InputField'
        />

        <input
          type="text"
          value={locketCode}
          onChange={(e) => setLocketCode(e.target.value)}
          placeholder="Locket Code"
          className='InputField'
        />
      </div>

      <div>
        <input
          type="button"
          value="Continue"
          onClick={handleClick}
          className='InputButton'
        />
      </div>

      <div className="footerContainer">
        <div className='websiteLink'>
          <a href="https://silkpursesowsear.com/" target="_blank" rel="noopener noreferrer">Visit our website & social media</a>
        </div>

        <div className='copyright'>
          Copyright © 2025 Silk Purse, Sow's Ear.
        </div>
      </div>

      {showModal && (
        <div className="ModalOverlay">
            <div className="ModalContent">
                <button className="ModalCloseButton" onClick={() => setShowModal(false)}>
                    &times;
                </button>
                <p>Have you paid for the outside of your locket to be engraved?</p>
                <div className="ModalButtons">
                    <button onClick={onContinue}>No</button>
                    <button onClick={onEngraving}>Yes</button>
                </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default Section;
