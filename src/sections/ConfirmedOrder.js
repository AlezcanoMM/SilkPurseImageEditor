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
                    <span>Thank you for sending us pictures for your Personalised Locket.</span>
                </div>

                <div className="line-group">
                    <span>We can confirm that we have received them, and we will begin working on your locket this week.</span>
                    <span>Your images will almost certainly be suitable, but if there should be any unforeseen issues</span>
                    <span>with the layout / picture quality we will be in touch via Etsy Messages to let you know.</span>
                </div>

                <div className="line-group">
                    <span>If you don't hear from us again, you can assume that your order has been made and posted.</span>
                </div>

                <div className="line-group">
                    <span>Please do get in touch via Etsy Messages if you have any questions in the meantime.</span>
                </div>
            </div>

            <div className='confirmation-message'>
                <h3>ADD ONS</h3>
                <div className="line-group">
                    <span>To Add either of the following to your order please visit the add-on section of our Etsy store.</span>
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
                    <span>Please not any add-ons MUST be purchased as soon as your photos submission is complete.</span>
                    <span>If you purchase any later we may not be able to link the add-on to your locket order.</span>
                </div>
            </div>

            <div>
                <button
                    onClick={() => window.location.reload()}
                    className="addOrder"
                >
                    Add another order
                </button>
            </div>
        </div>
    )
}

export default Section;