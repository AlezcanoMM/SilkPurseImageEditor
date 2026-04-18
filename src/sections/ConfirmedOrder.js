import React, { useState } from "react";
import '../css/ConfirmedOrder.css';
import '../css/CommonStyles.css'

import GiftWrap from '../assets/images/giftWrap.jpg';
import BirthStones from '../assets/images/neckalce.jpg';

const Section =({ onBack })=>{

    const [showModal, setShowModal] = useState(true);

    return(
        <div className="SectionDetails">
            <div>
                <h1> THANKS FOR SUBMITTING YOUR PHOTOS! </h1>
            </div>
            
            <div className="confirmation-message">
                <div className="line-group">
                    <span>We've received your images and will begin crafting your personalised locket this week.</span>
                </div>

                <div className="line-group">
                    <span>Your photos look great, but if we run into any issues with layout or image quality, we’ll contact you via Etsy Messages.</span>
                    <span>If you don’t hear from us, your order is all set and will be posted as soon as it’s ready.</span>
                </div>

                <div className="line-group">
                    <span>If you have any questions, feel free to message us on Etsy.</span>
                </div>
            </div>

            <div className='confirmation-message'>
                <h3>Want to add something extra?</h3>
                <div className="line-group">
                    <span>Visit our Etsy Shop to Add:</span>
                </div>

                <div className="addonsGrid">
                    <div className="addonItem">
                        <h4>Gift Wrap</h4>
                        <a
                        href="https://www.etsy.com/uk/listing/750160511/gift-wrap-giftwrap-wrapping-personalised?ga_search_query=gift%2Bwrap&ref=shop_items_search_1&frs=1&crt=1&sts=1&logging_key=af3a89979e728360f912b587e4655f4799d0b63a%3A750160511"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <img src={GiftWrap} alt="Gift wrap" className="addonImage" />
                        </a>
                    </div>
                    <div className="addonItem">
                        <h4>Birth Stones</h4>
                        <a
                        href="https://www.etsy.com/uk/listing/1756886319/birth-stone-pendant-rainbow-family-charm?ga_search_query=stone&ref=shop_items_search_2&frs=1&crt=1&sts=1&logging_key=db77f35ede17896b7a093e2379b11e57d5044015%3A1756886319"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <img src={BirthStones} alt="Birth stones" className="addonImage" />
                        </a>
                    </div>
                </div>

                <div className="line-group">
                    <span>Please note: Add-ons must be purchased immediately after submitting your photos.</span>
                    <span>We may not be able to link late add-on purchases to your order.</span>
                </div>

                <div>
                    <br></br>
                    <h2> You may close this page now. </h2>
                </div>
            </div>

            {showModal && (
                <div className="coModalOverlay ModalOverlay">
                    <div className="ModalContent coModalContent">
                        <button className="ModalCloseButton" onClick={() => setShowModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                        </button>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="15%" 
                            width="15%"
                            viewBox="0 -960 960 960"
                            fill="#78A75A">
                            <path d="m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/>
                        </svg>
                        <p>Thank so much for your order!</p>
                        <p>Next time, shop directly with us at</p>
                        <p><a href="https://www.silkpursesowsear.com" target="_blank" rel="noopener noreferrer" className="SilkpurseLink">www.silkpursesowsear.com</a></p>
                        <p>for our very best prices and full range of designs.</p>
                        <p>Discount Code: <b>WELCOME10</b></p>
                    </div>
                </div>
                )}
        </div>
    )
}

export default Section;