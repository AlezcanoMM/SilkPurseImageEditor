import React, { useState } from 'react';
import '../css/OrderDetails.css';
import '../css/CommonStyles.css';

import shapes from '../assets/shapes.json';
import Infographic from '../assets/images/INFOGRAPHIC_ORDER.png';

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
  setEngravingSides,
  setMaxEngraving,
  setIsTiny
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (!orderNum?.trim() || !locketCode?.trim()) {
      alert("Please enter both the Order Number and Locket Code before continuing.");
      return;
    }

    if(orderNum.trim().length !== 10){
      alert("Order number must be 10 digits long.");
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
      const [code, name, numImages, engrave, engravingSides, maxEngravings, isTiny] = matchingKey
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
      if (engrave === 'E' || engrave === 'e') {
        setEngravingSides(engravingSides);
        setMaxEngraving(maxEngravings);
      }
      setIsTiny(isTiny === 'T' || isTiny === 't');

      // Debug logs
      console.log("All shape image keys:", Object.keys(shapeImages));
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
          <p>Please use our photo editor to upload and submit your images for the personalised photo locket.</p>
          <p>If you’ve paid for engraving, you’ll also be able to add your message.</p>
          <p>Ordered more than one locket? You can add images for each at the end of the process.</p>
        </div>
      </div>

      <div className="formLayoutContainer">
        {/* Left: Infographic */}
        <div className="infographicWrapper">
          <img src={Infographic} alt="Infographic" className="infographicImage" />
        </div>

        {/* Right: Form Inputs */}
        <div className="inputFieldsWrapper">
          <div className="formSection">
            <h3 className="orderTitle" style={{ color: '#F69679' }}>ORDER NUMBER:</h3>
            <p className="orderDescription">
              To find your ORDER NUMBER go to Profile &gt; Your Purchases on Etsy.
              You can also find your order number in your confirmation email!
            </p>
            <input
              type="text"
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              placeholder="Order Number"
              className="InputField"
            />
          </div>

          <div className="formSection">
            <h3 className="locketTitle" style={{ color: '#82CA9C' }}>LOCKET CODE:</h3>
            <p className="orderDescription">
              Your LOCKET CODE can be found in the title on the Etsy product page.
            </p>
            <input
              type="text"
              value={locketCode}
              onChange={(e) => setLocketCode(e.target.value.trim().toUpperCase())}
              placeholder="Locket Code"
              className="InputField"
            />
          </div>
        </div>
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
                <p>Have you paid for the outside of your locket to be engraved?</p>
                <p style={{ color: '#EB7676', fontSize: '12px' }}>We’ll verify your purchase to ensure everything is in order.</p>
                <div className="ModalButtons">
                    <button onClick={onContinue} className='InputButton'>No</button>
                    <button onClick={onEngraving} className='InputButton'>Yes</button>
                </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default Section;
