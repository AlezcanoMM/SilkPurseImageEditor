import React, { useState, useEffect } from 'react';
import '../css/OrderDetails.css';
import '../css/CommonStyles.css';

import Infographic from '../assets/images/05INFOGRAPHIC_ORDER.jpg';

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
  setIsTiny,
  setListingPhoto,
  setBleedBorderImage,
  setEngravingFontImage,
  setEngravingMotifImage,
  setCustomer,
  customer
}) => {
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showConnectionMsg, setShowConnectionMsg] = useState(false);

  const [showHelpPanel, setShowHelpPanel] = useState(false);

  useEffect(() => {
      let timeout;
      if (loading) {
        timeout = setTimeout(() => {
          setShowConnectionMsg(true);
        }, 6000);
      } else {
        setShowConnectionMsg(false); // reset when loading ends
      }
  
      return () => clearTimeout(timeout);
    }, [loading]);

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

  const preloadImageFromUrl = async (url, retries = 3, delay = 500) => {
    if (!url) return null;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, { mode: "cors" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        return URL.createObjectURL(blob);
      } catch (err) {
        console.warn(`Attempt ${attempt} failed to load image: ${url}`, err);
        if (attempt < retries) {
          // wait a bit before retrying
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.error("All attempts failed for image:", url);
          return null;
        }
      }
    }
  };
  
  const handleConfirm = async () => {
    setLoading(true);
    const normalizedCode = locketCode.trim().toUpperCase();

    try {
      const res = await fetch(`https://make-my-locket.onrender.com/get-shape?code=${normalizedCode}`);
      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Locket code not found. Please check the code and try again.");
        setLoading(false);
        return;
      }

      // Preload all images as object URLs
      const [shapeObjUrl, listingObjUrl, bleedBorderObjUrl, fontsObjUrl, motifObjUrl] = await Promise.all([
        preloadImageFromUrl(data.shapeUrl),
        preloadImageFromUrl(data.listingUrl),
        preloadImageFromUrl(data.bleedBorderUrl),
        preloadImageFromUrl(data.fontsUrl),
        preloadImageFromUrl(data.motifUrl),
      ]);

      setShape(shapeObjUrl);
      setListingPhoto(listingObjUrl);
      setBleedBorderImage(bleedBorderObjUrl);
      setEngravingFontImage(fontsObjUrl);
      setEngravingMotifImage(motifObjUrl);

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

      setLoading(false);

      if (engrave.toUpperCase() === 'E') {
        setShowModal(true);
      } else {
        onContinue();
      }
    } catch (err) {
      setLoading(false);
      alert("Error matching locket code. Please try again.");
    }
  };


  return (
    <div className="SectionDetails">
      <div className="subtitleDivOD">
        <p><b>PLEASE USE OUR PHOTO EDITOR TO UPLOAD AND SUBMIT IMAGES FOR YOUR PERSONALISED LOCKET</b></p>
        <p>If you´ve added engraving to your order, you will be able to give us your requirements here.</p>
        <p><b>Ordered more than one locket?</b> You can upload images for any other lockets on order after you have completed your first submission.</p>
      </div>

      <div className="formLayoutContainer">
        {/* Left: Infographic */}
        <div className="infographicWrapper">
          <img src={Infographic} alt="Infographic" className="infographicImage" />
        </div>

        {/* Right: Form Inputs */}
        <div className="inputFieldsWrapper">
          <div className="formSection">
            <h3 className="locketTitle odTooltipContainer"><b>FULL NAME: </b>

              <svg
                className="odTooltipIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M513.5-254.5Q528-269 528-290t-14.5-35.5Q499-340 478-340t-35.5 14.5Q428-311 428-290t14.5 35.5Q457-240 478-240t35.5-14.5ZM442-394h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>

              <span className="odTooltipText">
                The name used on your order<br/>
                so we can match your details.
              </span>
            </h3>
            <p className="orderDescription">
            </p>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="e.g. Alex Taylor"
              className="InputField InputFieldMobile"
              disabled={loading}
            />
          </div>

          <div className="formSection">
            <h3 className="locketTitle odTooltipContainer"><b>ORDER NUMBER: </b>

              <svg
                className="odTooltipIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M513.5-254.5Q528-269 528-290t-14.5-35.5Q499-340 478-340t-35.5 14.5Q428-311 428-290t14.5 35.5Q457-240 478-240t35.5-14.5ZM442-394h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>

              <span className="odTooltipText">
                A unique number for your order.<br/>
                We use it to find your purchase details.
              </span>
            </h3>
            <p className="orderDescription">
              You can find your order number in your confirmation email.
            </p>
            <input
              type="text"
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              placeholder="Enter Order Number"
              className="InputField InputFieldMobile"
              disabled={loading}
            />
          </div>

          <div className="formSection">
            <h3 className="locketTitle odTooltipContainer"><b>LOCKET CODE: </b>

              <svg
                className="odTooltipIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M513.5-254.5Q528-269 528-290t-14.5-35.5Q499-340 478-340t-35.5 14.5Q428-311 428-290t14.5 35.5Q457-240 478-240t35.5-14.5ZM442-394h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>

              <span className="odTooltipText">
              A code included in the product name.<br/>
              We use it to identify your locket.
              </span>
            </h3>
            <p className="orderDescription">
              The code of your locket can be found in the title of the product page.
            </p>
            <input
              type="text"
              value={locketCode}
              onChange={(e) => setLocketCode(e.target.value.trim().toUpperCase())}
              placeholder="Enter Locket Code"
              className="InputField InputFieldMobile"
              disabled={loading}
            />
          </div>

          <span 
            className="odInfographic"
            onClick={() => setShowHelpPanel(true)}
          >
            I need help finding my order details.
          </span>
        </div>
      </div>


      <div>
        <input
          type="button"
          value="Continue"
          onClick={handleClick}
          className='InputButton'
          disabled={loading}
        />
      </div>

      {/* <div className="footerContainer">
        <div className='websiteLink'>
          <a href="https://silkpursesowsear.com/pages/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
        </div>

        <div className='copyright'>
          Copyright © 2025 Silk Purse, Sow's Ear.
        </div> 
      </div> */}

      {showModal && (
        <div className="ModalOverlay">
            <div className="ModalContent odModalContent">
                <button className="ModalCloseButton" onClick={() => setShowModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
                <p>Have you paid for the outside of your locket to be engraved?</p>
                <p style={{ color: '#EB7676' }}>If engraving hasn’t been paid for, your locket will be sent <b>without engraving.</b></p>
                <div className="ModalButtons">
                    <button onClick={onContinue} className='InputButton'>No</button>
                    <button onClick={onEngraving} className='InputButton'>Yes</button>
                </div>
            </div>
        </div>
        )}

        {loading && (
          <div className="loadingOverlay">
            <div className="spinner"></div>
            <div className="loadingText">
              <p>Processing order...</p>
              {showConnectionMsg && (
                <div>
                  <p>Checking your order details..... Please do not exit during this stage</p>
                </div>
              )}
            </div>
          </div>
        )}

        {showHelpPanel && (
          <>
            <div 
              className="odHelpOverlay"
              onClick={() => setShowHelpPanel(false)}
            />

            <div className="odHelpPanel">
              <button 
                className="odHelpClose"
                onClick={() => setShowHelpPanel(false)}
              >
                ✕
              </button>

              <h2 className='odHelpTitle'>
                <span>I need help finding my order details</span>
              </h2>
              <hr />

              <div className="odHelpContent">

                <h3>How do I find my order number?</h3>
                <p>
                  Your order number is between 4 and 10 digits long.<br/>
                  Check your order confirmation email.<br/>
                  It’s usually labelled <b>“Order #”</b> near the top.
                </p>

                <h3>How do I find my locket code?</h3>
                <p>
                  In the product name on your order.<br/>
                  Included in your confirmation email.<br/>
                  (e.g. “Product Name, ABC-123”)
                </p>

                <h3>How do I find my confirmation email?</h3>
                <p>
                  Search your inbox for our name or “order confirmation”.<br/>
                  Check your spam or junk folder too.
                </p>

                <h3>Can’t find what you are looking for?</h3>
                <p>
                  Please email us at <u>hello@silkpursesowsear.com</u>
                </p>
                
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default Section;
