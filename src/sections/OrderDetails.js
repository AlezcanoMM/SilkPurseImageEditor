import React, { useState } from 'react';
import '../css/OrderDetails.css';
import '../css/CommonStyles.css'

import heart from '../assets/shapes/WhiteHeart.png';

import Purchases from '../assets/images/FirstPagePurchases.png';

const Section =({ onContinue, onEngraving, setOrderNum, setLocketCode, setMaxNumberImages, setShape, orderNum, locketCode })=>{

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (
            orderNum === null || orderNum.trim() === "" ||
            locketCode === null || locketCode.trim() === ""
        ) {
            alert("Please enter both the Order Number and Locket Code before continuing.");
            return;
        }

        setShowModal(true);
    };

    const handleConfirm = () => {
        setMaxNumberImages(20);
        setShape(heart);

        setShowModal(false);
        onEngraving();
    };

    const handleCancel = () => {
        setMaxNumberImages(20);
        setShape(heart);

        setShowModal(false);
        onContinue();
    };

    return(
        <div className="SectionDetails">

            <div className="subtitleDiv">
                <div className="subtitleIntro">
                    <p>To continue you will need to let us know your ORDER NUMBER and locket LOCKET CODE.</p>
                    <p>This will help us locate your order and ensure that we use the correct locket!</p>
                </div>

                <p className="subtitleGap">How To Find Your Order Number And Locket Code.</p>

                <div className="subtitleInstructions">
                    <p>Order Number: Profile Or Account &gt; Account &gt; Purchases</p>
                    <p>Locket Code: Can be found at the end of the product title on the product page.</p>
                </div>
            </div>

            <div>
                <img src={Purchases} alt="Purchase deatils"/>
            </div>

            <div className='DivRow'>
                <input
                    type="text"
                    value={orderNum}
                    onChange={(e) => setOrderNum(e.target.value)}
                    placeholder="Order Number"
                    className='InputField'
                />

                <input
                    type="text"
                    value={locketCode}
                    onChange={(e) => setLocketCode(e.target.value)}
                    placeholder="Locket Code"
                    className='InputField'
                />
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


            {/* Popup Modal */}
            {showModal && (
                <div className="ModalOverlay">
                    <div className="ModalContent">
                    <p>Have you paid for the outside of your locket to be engraved?</p>
                    <div className="ModalButtons">
                        <button onClick={handleCancel}>No</button>
                        <button onClick={handleConfirm}>Yes</button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Section;