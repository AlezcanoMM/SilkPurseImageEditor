import React from "react";
import '../css/PolaroidDetails.css';
import '../css/CommonStyles.css'

const Section =({ onContinue, setNumberImages, onBack })=>{

    const oneToFive = () => {
        setNumberImages(5);
        onContinue();
    };

    const sixToTen = () => {
        setNumberImages(10);
        onContinue();
    };

    const elevenToFifteen = () => {
        setNumberImages(15);
        onContinue();
    };

    const sixteenToTwenty = () => {
        setNumberImages(20);
        onContinue();
    };

    return(
        <div className="SectionDetails">
            <div>
                <h1> Number of Photos </h1>
            </div>
            
            <div className="DivColumn">
                <input type="button" value="1 to 5" onClick={oneToFive} className='InputButton'/>
                <input type="button" value="5 to 10" onClick={sixToTen} className='InputButton'/>
                <input type="button" value="10 to 15" onClick={elevenToFifteen} className='InputButton'/>
                <input type="button" value="15 to 20" onClick={sixteenToTwenty} className='InputButton'/>
            </div>

            <div className="buttonDiv">
                <div>
                <input
                    type="button"
                    value="Back"
                    onClick={() => onBack()}
                    className="InputButton"
                />
                </div>
            </div>
        </div>
    )
}

export default Section;