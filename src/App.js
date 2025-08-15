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

import SPTitle from './assets/images/SilkPurseLogo3.png';

function App() {
  const [orderNum, setOrderNum] = useState(null);
  const [locketCode, setLocketCode] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [shape, setShape] = useState(null);
  const [listingPhoto, setListingPhoto] = useState(null);
  const [engravingFontImage, setEngravingFontImage] = useState(null);
  const [engravingMotifImage, setEngravingMotifImage] = useState(null);
  const [maxNumberImages, setMaxNumberImages] = useState(0);
  const [locketName, setLocketName] = useState("");
  const [engravingAllowed, setEngravingAllowed] = useState(false);
  const [maxEngraving, setMaxEngraving] = useState(0);
  const [engravingSides, setEngravingSides] = useState("");
  const [isTiny, setIsTiny] = useState(false);
  
  const [frontEngraving, setFrontEngraving] = useState("");
  const [frontFont, setFrontFont] = useState("");
  const [backEngraving, setBackEngraving] = useState("");
  const [backFont, setBackFont] = useState("");
  const [insideEngraving, setInsideEngraving] = useState("");
  const [insideFont, setInsideFont] = useState("");

  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [editedImages, setEditedImages] = useState([]);
  const [imageToEdit, setImageToEdit] = useState(null);

  const handleSaveImage = (editedImage) => {
    const updatedEditedImages = editedImages.map((img) =>
      img.original === editedImage.original ? { ...img, editedWithOffwhite: editedImage.editedWithOffwhite, editedWithoutOffwhite: editedImage.editedWithoutOffwhite, hasBeenEdited: editedImage.hasBeenEdited } : img
    );
    setEditedImages(updatedEditedImages);
    setCurrentSection(3); // Go back to EditImages section
  };

  // Sections to display
  const sections = [
    <OrderDetails
      onContinue={() => setCurrentSection(2)}
      onEngraving={() => setCurrentSection(1)}
      setOrderNum={setOrderNum}
      setLocketCode={setLocketCode}
      setMaxNumberImages={setMaxNumberImages}
      setShape={setShape}
      setListingPhoto={setListingPhoto}
      setLocketName={setLocketName}
      setEngravingAllowed={setEngravingAllowed}
      setMaxEngraving={setMaxEngraving}
      setEngravingSides={setEngravingSides}
      setIsTiny={setIsTiny}
      setEngravingFontImage={setEngravingFontImage}
      setEngravingMotifImage={setEngravingMotifImage}
      orderNum={orderNum}
      locketCode={locketCode}
      engravingFontImage={engravingFontImage}
      engravingMotifImage={engravingMotifImage}
    />,
    <Engravings
      onContinue={() => setCurrentSection(2)}
      onBack={() => setCurrentSection(0)}
      maxEngraving={maxEngraving}
      engravingSides={engravingSides}
      frontEngraving={frontEngraving}
      setFrontEngraving={setFrontEngraving}
      frontFont={frontFont}
      setFrontFont={setFrontFont}
      backEngraving={backEngraving}
      setBackEngraving={setBackEngraving}
      backFont={backFont}
      setBackFont={setBackFont}
      insideEngraving={insideEngraving}
      setInsideEngraving={setInsideEngraving}
      insideFont={insideFont}
      setInsideFont={setInsideFont}
      engravingFontImage={engravingFontImage}
      engravingMotifImage={engravingMotifImage}
    />,
    <AddImages
      maxNumberImages={maxNumberImages}
      onContinue={() => setCurrentSection(3)}
      onBack={() => {
        if (engravingAllowed) {
          setCurrentSection(1);
        } else {
          setCurrentSection(0);
        }
      }}
      setImages={setImages}
      setEditedImages={setEditedImages}
      images={images}
      isTiny={isTiny}
    />,
    <EditImages
      setImageToEdit={setImageToEdit}
      images={images}
      setImages={setImages}
      editedImages={editedImages}
      setEditedImages={setEditedImages}
      notes={notes}
      setNotes={setNotes}
      onEditImage={() => setCurrentSection(4)}
      onBack={() => setCurrentSection(2)}
      onContinue={() => setCurrentSection(5)}
    />,
    <EditImage
      imageToEdit={imageToEdit}
      shape={shape}
      onSave={handleSaveImage}
      onCancel={() => setCurrentSection(3)}
    />,
    <ConfirmDetails
      orderNum={orderNum}
      locketCode={locketCode}
      engravingAllowed={engravingAllowed}
      notes={notes}
      editedImages={editedImages}
      locketName={locketName}
      shape={shape}
      frontEngraving={frontEngraving}
      frontFont={frontFont}
      backEngraving={backEngraving}
      backFont={backFont}
      insideEngraving={insideEngraving}
      insideFont={insideFont}
      listingPhoto={listingPhoto}
      onContinue={() => setCurrentSection(6)}
      onBack={() => setCurrentSection(3)}
    />,
    <ConfirmedOrder
      onBack={() => setCurrentSection(5)}
    />
  ];


  return (
    <div className="App">
      <div className="SilkPurseHeader">
        <img src={SPTitle} alt="Silk Purse"/>
        {/* <h2>Locket Maker</h2> */}
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