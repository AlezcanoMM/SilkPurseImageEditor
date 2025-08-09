import React, { useState } from 'react';
import '../css/OrderDetails.css';
import '../css/CommonStyles.css';

import Infographic from '../assets/images/INFOGRAPHIC_ORDER_example.jpg';

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

  const handleConfirm = async () => {
    const normalizedCode = locketCode.trim().toUpperCase();

    try {
      const res = await fetch(`/get-shape?code=${normalizedCode}`);
      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Shape not found in Google Drive.");
        return;
      }

      const importedImage = data.downloadUrl;
      setShape(importedImage);

      const [code, name, numImages, engrave, engravingSides, maxEngravings, isTiny] =
        data.fileName.replace(/\.(png|jpg|jpeg)$/i, '').split('_');

      setLocketName(name);
      setMaxNumberImages(parseInt(numImages, 10));
      setEngravingAllowed(engrave.toUpperCase() === 'E');
      if (engrave.toUpperCase() === 'E') {
        setEngravingSides(engravingSides);
        setMaxEngraving(maxEngravings);
      }
      setIsTiny(isTiny && isTiny.toUpperCase() === 'T');

      if (engrave.toUpperCase() === 'E') {
        setShowModal(true);
      } else {
        onContinue();
      }
    } catch (err) {
      console.error("Error fetching shape image:", err);
      alert("Error fetching shape image. Please try again.");
    }
  };

  return (
    <div className="SectionDetails">
      <div className="subtitleDiv">
        <div className="subtitleIntro">
          <p><b>Please use our photo editor to upload and submit images for your personalised photo locket.</b></p>
          <p>If you’ve added engraving to your order, you’ll also be able to enter your message.</p>
          <p><b>Ordered more than one locket?</b> You can upload images for each one at the end of the process.</p>
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
            <h3 className="orderTitle" style={{ color: '#F69679' }}><b>ORDER NUMBER:</b></h3>
            <p className="orderDescription">
              To find your <b>ORDER NUMBER</b> go to Profile &gt; Your Purchases on Etsy.
              You can also find your order number in your confirmation email!
            </p>
            <input
              type="text"
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              placeholder="Enter Order Number"
              className="InputField InputFieldMobile"
            />
          </div>

          <div className="formSection">
            <h3 className="locketTitle" style={{ color: '#82CA9C' }}><b>LOCKET CODE:</b></h3>
            <p className="orderDescription">
              Your <b>LOCKET CODE</b> can be found in the title on the Etsy product page.
            </p>
            <input
              type="text"
              value={locketCode}
              onChange={(e) => setLocketCode(e.target.value.trim().toUpperCase())}
              placeholder="Enter Locket Code"
              className="InputField InputFieldMobile"
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
                <p style={{ color: '#EB7676', fontSize: '12px' }}>If engraving hasn’t been paid for, your locket will be sent <b>without engraving.</b></p>
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
