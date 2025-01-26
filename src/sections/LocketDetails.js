import React, { useState } from "react";
import '../css/LocketDetails.css';
import '../css/CommonStyles.css';

import buttonCircle from '../assets/images/Circle.png';
import buttonHeart from '../assets/images/Heart.png';
import buttonHexagon from '../assets/images/Hex.png';
import buttonRectangle from '../assets/images/Rectangle.png';
import buttonOval from '../assets/images/Oval.png';

import hexagon from '../assets/shapes/WhiteHexagon.png';
import circle from '../assets/shapes/WhiteCircle.png';
import oval from '../assets/shapes/WhiteOval.png';
import rectangle from '../assets/shapes/WhitePolaroid.png';
import heart from '../assets/shapes/WhiteHeart.png';

const Section = ({ setShape, onContinue, onBack }) => {
    const [selectedType, setSelectedType] = useState(null); // For ButtonType selection
    const [selectedShape, setSelectedShape] = useState(null); // For ButtonShape selection

    const handleShapeClick = (shape, index) => {
        setSelectedShape(index); // Highlight the selected shape button
        setShape(shape);
    };

    const handleTypeClick = (index) => {
        setSelectedType(index); // Highlight the selected type button
    };

    const handleClick = () => {
        if (selectedType === null || selectedShape === null) {
            alert("Please select both a type and a shape.");
        } else {
            onContinue();
        }
    };

    return (
        <div className="SectionDetails">
            <div className="subtitleDiv">
                <h1>Choose the type and shape of locket</h1>
            </div>
            
            <div className="ButtonRow">
                {["Polaroid", "Gold", "Silver", "Sterling"].map((type, index) => (
                    <input
                        key={type}
                        type="button"
                        value={type}
                        className={`InputButton ButtonType ${selectedType === index ? 'selected' : ''}`}
                        onClick={() => handleTypeClick(index)}
                    />
                ))}
            </div>

            <div className="ButtonRow">
                {[
                    { shape: circle, image: buttonCircle },
                    { shape: oval, image: buttonOval },
                    { shape: rectangle, image: buttonRectangle },
                    { shape: heart, image: buttonHeart },
                    { shape: hexagon, image: buttonHexagon },
                ].map((button, index) => (
                    <button
                        key={index}
                        onClick={() => handleShapeClick(button.shape, index)}
                        className={`InputButton ButtonShape ${selectedShape === index ? 'selected' : ''}`}
                        style={{
                            backgroundImage: `url(${button.image})`,
                            backgroundSize: "cover",
                            cursor: "pointer",
                        }}
                        aria-label={button.shape}
                    ></button>
                ))}
            </div>

            <div className="buttonDiv separator">
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