import React, { useState, useEffect } from "react";
import '../css/Engravings.css';
import '../css/CommonStyles.css';

const Section = ({
  onContinue,
  onBack,
  engravingSides,
  maxEngraving,
  frontEngraving,
  setFrontEngraving,
  frontFont,
  setFrontFont,
  backEngraving,
  setBackEngraving,
  backFont,
  setBackFont,
  insideEngraving,
  setInsideEngraving,
  insideFont,
  setInsideFont,
  engravingFontImage,
  engravingMotifImage
}) => {
  const [selectedOption, setSelectedOption] = useState(
    engravingSides === "FB" ? "front" : engravingSides === "I" ? "inside" : engravingSides
  );

  useEffect(() => {
    if (engravingSides === "FB") {
      setSelectedOption("front");
    }
  }, [engravingSides]);

  const [popupImage, setPopupImage] = useState(null);
  const handleImageClick = (src) => setPopupImage(src);
  const closePopup = () => setPopupImage(null);

  const handleClick = () => {
    onContinue({
      frontEngraving,
      frontFont,
      backEngraving,
      backFont,
      insideEngraving,
      insideFont
    });
  };

  // Parse engraving limit like "25W" or "3L"
  const getEngravingLimitMessage = () => {
    if (!maxEngraving || typeof maxEngraving !== "string") return "";
    const match = maxEngraving.match(/^(\d+)([LW])$/i);
    if (!match) return "";
    const [_, count, type] = match;
    const label = type.toUpperCase() === "W" ? "word" : "letter";
    const plural = parseInt(count) > 1 ? "s" : "";
    return `Please note your locket can only fit ${count} ${label}${plural}.`;
  };

  const renderEngravingSection = (title, engraving, setEngraving, font, setFont) => (
    <div className="EngravingSection" key={title}>
      <h2 className="EngravingTitle">{title} ENGRAVING</h2>
      <div className="EngravingRow">
        <div className="EngravingColumn">
          <label>ENGRAVING – Text Or Motif</label>
          <textarea
            rows="3"
            value={engraving}
            onChange={(e) => setEngraving(e.target.value)}
            placeholder="Enter your engraving message"
          />
          <p className="engravingLimitNote">{getEngravingLimitMessage()}</p>
        </div>

        <div className="EngravingColumn">
          <label>Font Choice – If Applicable</label>
          <input
            type="number"
            value={font}
            onChange={(e) => setFont(e.target.value)}
            placeholder="Font number"
            min="1"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="SectionDetails">
      <div style={{ textAlign: 'center'}}>
        <h2><b>SUBMIT YOUR ENGRAVING</b></h2>
        <h3>Please select from the following options:</h3>
      </div>

      {engravingSides === "FB" && (
        <div className="engravingSideWrapper">
          <div className="engravingSideSelector">
            <h3>Engraving side:</h3>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="engravingSideDropdown"
            >
              <option value="front">Front</option>
              <option value="back">Back</option>
              <option value="both">Both sides</option>
            </select>
          </div>

          {selectedOption === "both" && (
            <a
              href="https://www.etsy.com/uk/listing/1272460950/engraving-add-on-extra-engraving-custom"
              target="_blank"
              rel="noopener noreferrer"
              className="engravingWarning"
            >
              YOU MUST HAVE PURCHASED ENGRAVING FOR BOTH SIDES OF YOUR LOCKET. IF YOU HAVE NOT PAID TWO SETS OF ENGRAVING AND WOULD LIKE IT, PLEASE CLICK THIS MESSAGE AND YOU WILL BE DIRECTED TO AN ETSY ADD-ON PURCHASE FOR THIS SERVICE.
              <br />
              <br />
              PLEASE NOTE THAT ANY ENGRAVING REQUESTS THAT HAVE NOT BEEN PAID FOR WILL BE DISREGARDED, AND YOUR LOCKET WILL BE MADE WITHOUT IT. 
            </a>
          )}
        </div>
      )}

      {(engravingSides === "F" ||
        engravingSides === "I" ||
        (engravingSides === "FB" && (selectedOption === "front" || selectedOption === "both"))) &&
        renderEngravingSection("FRONT", frontEngraving, setFrontEngraving, frontFont, setFrontFont)}

      {(engravingSides === "B" ||
        (engravingSides === "FB" && (selectedOption === "back" || selectedOption === "both"))) &&
        renderEngravingSection("BACK", backEngraving, setBackEngraving, backFont, setBackFont)}

      {engravingSides === "I" &&
        renderEngravingSection("INSIDE", insideEngraving, setInsideEngraving, insideFont, setInsideFont)}

      <div className="engravingImagesContainer">
        <div className="engravingImageColumn">
          <p className="engravingImageTitle">Motifs</p>
          <div className="engravingImageWrapper">
            <img
              src={engravingMotifImage}
              alt="Motif Options"
              className="engravingImage"
              onClick={() => handleImageClick(engravingMotifImage)}
            />
          </div>
        </div>

        <div className="engravingImageColumn">
          <p className="engravingImageTitle">Fonts</p>
          <div className="engravingImageWrapper">
            <img
              src={engravingFontImage}
              alt="Font Options"
              className="engravingImage"
              onClick={() => handleImageClick(engravingFontImage)}
            />
          </div>
        </div>

        <div className="engravingImageMessage">
          Click image to enlarge
        </div>
      </div>


      {popupImage && (
        <div className="popupOverlay" onClick={closePopup}>
          <div className="popupImageWrapper" onClick={(e) => e.stopPropagation()}>
            <button className="popupCloseButton" onClick={closePopup} aria-label="Close popup">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
            <img src={popupImage} alt="Zoomed view" className="popupImage" />
          </div>
        </div>
      )}

      <div className="buttonDiv">
        <input type="button" value="Back" onClick={onBack} className="InputButton" />
        <input type="button" value="Confirm" onClick={handleClick} className="InputButton" />
      </div>
    </div>
  );
};

export default Section;
