import React from "react";
import '../css/ConfirmedOrder.css';
import '../css/CommonStyles.css'

const Section =({ onBack })=>{

    return(
        <div className="SectionDetails">
            <div>
                <h1> Order Confirmed! </h1>
            </div>
            
            <div className='subtitleDiv'>
                <span>Your edited images have been downloaded!</span>
                <span>Please send the downloaded file through etsy.</span>
                <span>:)</span>
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