import '../css/OrderDetails.css';
import '../css/CommonStyles.css'

const Section =({ onContinue, setOrderNum, setName, setEmail, orderNum, name, email })=>{

    const handleClick = () => {
        onContinue();
    };

    return(
        <div className="SectionDetails">

            <div className='subtitleDiv'>
                <span>This is a free tool to help you resize and send us your images for your locket!</span>
                <span>Follow these steps to find the correct photos for your Locket.</span>
            </div>

            <div>
                <h1>Order details</h1>
            </div>

            <div className='DivColumn'>
                <input
                    type="text"
                    value={orderNum}
                    onChange={(e) => setOrderNum(e.target.value)}
                    placeholder="Order Number"
                    className='InputField'
                />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className='InputField'
                />

                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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

            <div className='websiteLink'>
                <a href="https://silkpursesowsear.com/" target="_blank" rel="noopener noreferrer">Visit our website & social media</a>
            </div>

            <div className='copyright'>
                Copyright © 2025 Silk Purse, Sow's Ear.
            </div>

        </div>
    )
}

export default Section;