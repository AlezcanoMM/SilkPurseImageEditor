import React, { useState } from "react";

import '../css/Engravings.css';
import '../css/CommonStyles.css';

import b101 from '../assets/images/fonts/101.png';
import b22 from '../assets/images/fonts/22.png';
import b66 from '../assets/images/fonts/66.png';
import b89 from '../assets/images/fonts/89.png';
import b212 from '../assets/images/fonts/212.png';

import Font101 from '../assets/images/fonts/Font101.png';
import Font22 from '../assets/images/fonts/Font22.png';
import Font66 from '../assets/images/fonts/Font66.png';
import Font89 from '../assets/images/fonts/Font89.png';
import Font212 from '../assets/images/fonts/Font212.png';

import Motifs from '../assets/images/MotifEngraving.png';

const Section = ({ onContinue, onBack, setEngravingSide, setSelectedFont, setEngravingMessage, engravingSide, selectedFont, engravingMessage }) => {

    const fontImages = {
        "101": Font101,
        "22": Font22,
        "66": Font66,
        "89": Font89,
        "212": Font212
    };
    const fontButtonImages = {
        "101": b101,
        "22": b22,
        "66": b66,
        "89": b89,
        "212": b212
    };
    const fontOptions = ["101", "22", "66", "89", "212"];

    const [isMotifPopupOpen, setIsMotifPopupOpen] = useState(false);

    const handleClick = () => {
        onContinue();
    };

    return (
        <div className="SectionDetails">
            <div>
                <h1> Engravings </h1>
            </div>

            <div className="engravingSideWrapper">
                <div className="engravingSideSelector">
                    <h3>Engraving side:</h3>
                    <select
                    id="engravingSideDropdown"
                    value={engravingSide}
                    onChange={(e) => setEngravingSide(e.target.value)}
                    className="engravingSideDropdown"
                    >
                    <option value="front">Front</option>
                    <option value="back">Back</option>
                    <option value="bothSides">BothSides</option>
                    </select>
                </div>

                {engravingSide === "bothSides" && (
                <a
                    href="https://www.etsy.com/uk/listing/1272460950/engraving-add-on-extra-engraving-custom?ga_search_query=both&ref=shop_items_search_1&frs=1&crt=1&sts=1&logging_key=4a2e2cb781f47b00b8974c89204017dd15c1310b%3A1272460950"
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

            <div className="fontStyle">
                <h3>Font Style:</h3>
                <div className="DivRow">
                    {fontOptions.map((font) => (
                        <button
                            key={font}
                            className={selectedFont === font ? 'selectedFont' : ''}
                            onClick={() => setSelectedFont(font)}
                        >
                            <img
                                src={fontButtonImages[font]}
                                alt={`Font ${font}`}
                                className="fontButtonImage"
                            />
                        </button>
                    ))}
                </div>

                <div className="fontImage">
                    <img
                        src={fontImages[selectedFont]}
                        alt={`Font ${selectedFont}`}
                        className="fontPreview"
                    />
                </div>
            </div>

            <div>
                <label>Font engraving message:</label>
                <input
                    type="text"
                    id="frontEngraving"
                    value={engravingMessage}
                    onChange={(e) => setEngravingMessage(e.target.value)}
                    placeholder=""
                />
            </div>

            <p>Please enter the text or motif you would like to be engraved in the box below.
            Please note your locket has space for *ONE* Word OR Motif</p>

            <div
                className="motifs"
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setIsMotifPopupOpen(true)}
            >
                Click here to view motifs
            </div>

            {isMotifPopupOpen && (
                <div className="motifPopupOverlay" onClick={() => setIsMotifPopupOpen(false)}>
                    <div className="motifPopupContent" onClick={e => e.stopPropagation()}>
                        <button className="motifPopupClose" onClick={() => setIsMotifPopupOpen(false)}>X</button>
                        <img src={Motifs} alt="Motif Engraving" className="motifImage" />
                    </div>
                </div>
            )}

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