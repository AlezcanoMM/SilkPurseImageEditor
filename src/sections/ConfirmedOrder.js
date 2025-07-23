import React from "react";
import '../css/ConfirmedOrder.css';
import '../css/CommonStyles.css'

import GiftWrap from '../assets/images/giftWrap.jpg';
import BirthStones from '../assets/images/neckalce.jpg';

const Section =({ onBack })=>{

    return(
        <div className="SectionDetails">
            <div>
                <h1> Thank You! </h1>
            </div>
            
            <div className="confirmation-message">
                <div className="line-group">
                    <span><b>Thanks for your photo submission!</b></span>
                </div>

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
                    <span>Visit our <i>Add-Ons</i> section to include:</span>
                </div>

                <div className="addonsGrid">
                    <div className="addonItem">
                        <h4>Gift Wrappings</h4>
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
            </div>
        </div>
    )
}

export default Section;