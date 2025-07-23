import React, { useState, useEffect } from "react";
import '../css/Engravings.css';
import '../css/CommonStyles.css';

import motifs from '../assets/images/MotifEngraving.png';
import fonts from '../assets/images/FontsEngravings.png';

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
  setInsideFont
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
      <h2 className="EngravingTitle">{title} engraving</h2>
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
      <div>
        <h2>Please select from the following options:</h2>
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
              YOU MUST HAVE PURCHASED THE ENGRAVE BOTH SIDES ADD-ON
              <br />
              IF YOU WOULD LIKE YOUR ORDER TO BE ENGRAVED ON BOTH SIDES.
              <br />
              IF YOU HAVE NOT PLEASE DO SO BY PURCHASING THE ADD-ON HERE.
            </a>
          )}
        </div>
      )}

      {(engravingSides === "F" ||
        engravingSides === "I" ||
        (engravingSides === "FB" && (selectedOption === "front" || selectedOption === "both"))) &&
        renderEngravingSection("Front", frontEngraving, setFrontEngraving, frontFont, setFrontFont)}

      {(engravingSides === "B" ||
        (engravingSides === "FB" && (selectedOption === "back" || selectedOption === "both"))) &&
        renderEngravingSection("Back", backEngraving, setBackEngraving, backFont, setBackFont)}

      {engravingSides === "I" &&
        renderEngravingSection("Inside", insideEngraving, setInsideEngraving, insideFont, setInsideFont)}

      <div className="engravingImagesContainer">
        <div className="engravingImageColumn">
          <p className="engravingImageTitle">Motifs</p>
          <div className="engravingImageWrapper">
            <img
              src={motifs}
              alt="Motif Options"
              className="engravingImage"
              onClick={() => handleImageClick(motifs)}
            />
          </div>
        </div>

        <div className="engravingImageColumn">
          <p className="engravingImageTitle">Fonts</p>
          <div className="engravingImageWrapper">
            <img
              src={fonts}
              alt="Font Options"
              className="engravingImage"
              onClick={() => handleImageClick(fonts)}
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
