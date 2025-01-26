import './css/App.css';
import './css/CommonStyles.css'
import React, { useState } from 'react';

import OrderDetails from './sections/OrderDetails.js';
import LocketDetails from './sections/LocketDetails.js';
import PolaroidDetails from './sections/PolaroidDetails.js';
import AddImages from './sections/AddImages.js';
import EditImages from './sections/EditImages.js';
import EditImage from './sections/EditImage.js';
import ConfirmDetails from './sections/ConfirmDetails.js';
import ConfirmedOrder from './sections/ConfirmedOrder.js';

function App() {
  const [orderNum, setOrderNum] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [shape, setShape] = useState('/shapes/WhiteCircle.png');
  const [numberImages, setNumberImages] = useState(0);
  const [images, setImages] = useState([]);
  const [editedImages, setEditedImages] = useState([]);
  const [imageToEdit, setImageToEdit] = useState(null);

  const handleSaveImage = (editedImage) => {
    const updatedEditedImages = editedImages.map((img) =>
      img.original === editedImage.original ? { ...img, edited: editedImage.edited, hasBeenEdited: editedImage.hasBeenEdited } : img
    );
    setEditedImages(updatedEditedImages);
    setCurrentSection(4); // Go back to EditImages section
  };

  // Sections to display
  const sections = [
    <OrderDetails onContinue={() => setCurrentSection(1)} setOrderNum={setOrderNum} setName={setName} setEmail={setEmail} orderNum={orderNum} name={name} email={email} />,
    <LocketDetails setShape={setShape} onContinue={() => setCurrentSection(2)} onBack={() => setCurrentSection(0)}/>,
    <PolaroidDetails onContinue={() => setCurrentSection(3)} onBack={() => setCurrentSection(1)} setNumberImages={setNumberImages} />,
    <AddImages numberImages={numberImages} onContinue={() => setCurrentSection(4)} onBack={() => setCurrentSection(2)} setImages={setImages} setEditedImages={setEditedImages} images={images}/>,
    <EditImages setImageToEdit={setImageToEdit} images={images} setImages={setImages} editedImages={editedImages} setEditedImages={setEditedImages} onEditImage={() => setCurrentSection(5)} onBack={() => setCurrentSection(3)} onContinue={() => setCurrentSection(6)} />,
    <EditImage imageToEdit={imageToEdit} shape={shape} onSave={handleSaveImage} onCancel={() => setCurrentSection(4)} />,
    <ConfirmDetails orderNum={orderNum} name={name} email={email} editedImages={editedImages} onContinue={() => setCurrentSection(7)} onBack={() => setCurrentSection(4)}/>,
    <ConfirmedOrder onBack={() => setCurrentSection(6)}/>
  ];

  return (
    <div className="App">
      <div className="SilkPurseHeader">
        <img src="/images/SPTitle.png" alt="Silk Purse"/>
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