import './css/App.css';
import './css/CommonStyles.css';
import React, { useState } from 'react';

import OrderDetails from './sections/OrderDetails.js';
import AddImages from './sections/AddImages.js';
import EditImages from './sections/EditImages.js';
import EditImage from './sections/EditImage.js';
import ConfirmDetails from './sections/ConfirmDetails.js';
import ConfirmedOrder from './sections/ConfirmedOrder.js';
import Engravings from './sections/Engravings.js';

import SPTitle from './assets/images/SilkPurseLogo.png';

function App() {
  const [orderNum, setOrderNum] = useState(null);
  const [locketCode, setLocketCode] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [shape, setShape] = useState(null);
  const [numberImages, setNumberImages] = useState(0);
  const [selectedFont, setSelectedFont] = useState("101");
  const [engravingMessage, setEngravingMessage] = useState("");
  const [images, setImages] = useState([]);
  const [editedImages, setEditedImages] = useState([]);
  const [imageToEdit, setImageToEdit] = useState(null);

  const handleSaveImage = (editedImage) => {
    const updatedEditedImages = editedImages.map((img) =>
      img.original === editedImage.original ? { ...img, edited: editedImage.edited, hasBeenEdited: editedImage.hasBeenEdited } : img
    );
    setEditedImages(updatedEditedImages);
    setCurrentSection(3); // Go back to EditImages section
  };

  // Sections to display
  const sections = [
    <OrderDetails onContinue={() => setCurrentSection(2)} onEngraving={() => setCurrentSection(1)} setOrderNum={setOrderNum} setLocketCode={setLocketCode} setNumberImages={setNumberImages} setShape={setShape} orderNum={orderNum} locketCode={locketCode} />,
    <Engravings onContinue={() => setCurrentSection(2)} onBack={() => setCurrentSection(0)} selectedFont={selectedFont} engravingMessage={engravingMessage} setSelectedFont={setSelectedFont} setEngravingMessage={setEngravingMessage}/>,
    <AddImages numberImages={numberImages} onContinue={() => setCurrentSection(3)} onBack={() => setCurrentSection(0)} setImages={setImages} setEditedImages={setEditedImages} images={images}/>,
    <EditImages setImageToEdit={setImageToEdit} images={images} setImages={setImages} editedImages={editedImages} setEditedImages={setEditedImages} onEditImage={() => setCurrentSection(4)} onBack={() => setCurrentSection(2)} onContinue={() => setCurrentSection(5)} />,
    <EditImage imageToEdit={imageToEdit} shape={shape} onSave={handleSaveImage} onCancel={() => setCurrentSection(3)} />,
    <ConfirmDetails orderNum={orderNum} locketCode={locketCode} engravingMessage={engravingMessage} selectedFont={selectedFont} editedImages={editedImages} onContinue={() => setCurrentSection(6)} onBack={() => setCurrentSection(3)}/>,
    <ConfirmedOrder onBack={() => setCurrentSection(5)}/>
  ];

  return (
    <div className="App">
      <div className="SilkPurseHeader">
        <img src={SPTitle} alt="Silk Purse"/>
        <h2>Locket Maker</h2>
      </div>

      <div className="Sections">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`Section ${index === currentSection ? 'active' : ''}`}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;