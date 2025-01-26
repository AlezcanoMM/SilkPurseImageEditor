import React, { useState } from "react";
import '../css/LocketDetails.css';
import '../css/CommonStyles.css';

const Section = ({ setShape, onContinue, onBack }) => {
    const [selectedType, setSelectedType] = useState(null); // For ButtonType selection
    const [selectedShape, setSelectedShape] = useState(null); // For ButtonShape selection

    const buttonCircle = '/images/Circle.png';
    const buttonHeart = '/images/Heart.png';
    const buttonHexagon = '/images/Hex.png';
    const buttonRectangle = '/images/Rectangle.png';
    const buttonOval = '/images/Oval.png';

    const hexagon = '/shapes/WhiteHexagon.png';
    const circle = '/shapes/WhiteCircle.png';
    const oval = '/shapes/WhiteOval.png';
    const rectangle = '/shapes/WhitePolaroid.png';
    const heart = '/shapes/WhiteHeart.png';

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