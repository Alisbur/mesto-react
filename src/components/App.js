import React from 'react';
import { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }
 
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="App">
      <div className="page">

      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        
        onAddPlace={handleAddPlaceClick}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        
        onEditAvatar={handleEditAvatarClick}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}

        onClose={closeAllPopups}

        onCardClick={handleCardClick}
        selectedCard={selectedCard}
      />
      <Footer />

      </div>
    </div>
  );
}

export default App;
