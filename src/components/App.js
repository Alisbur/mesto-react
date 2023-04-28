import React from 'react';
import { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({ name:'', about:'', avatar:'' });
  const [cards, setCards] = useState([]);
 
  React.useEffect(function () {
    api.getProfileData()
      .then((data)=>{
        setCurrentUser(data);
      })
      .catch((err) => {
        alert(`Не удалось загрузить данные профиля! Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(function () {
    api.getInitialCards()
      .then((data)=>{
        setCards(data)})
      .catch((err) => {
        alert(`Не удалось загрузить данные карточек! Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscPress);
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEscPress(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleUpdateUser(newProfileData) {
    api.modifyProfileData(newProfileData)
      .then((data)=>{
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новые данные профиля! Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(newLink) {
    api.setUserAvatar(newLink)
      .then((data)=>{
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новый аватар! Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newPlaceData) {
    api.addNewCard(newPlaceData)
      .then((data)=>{
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новое место! Ошибка: ${err}`);    
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup isOpen={ isEditProfilePopupOpen } onUpdateUser={ handleUpdateUser } onClose={ closeAllPopups } />

        <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onUpdateAvatar={ handleUpdateAvatar } onClose={ closeAllPopups } /> 

        <PopupWithForm name='confirmPopup' title='Вы уверены?' submitBtnCaption="Да" onClose={ closeAllPopups } />

        <AddPlacePopup isOpen={ isAddPlacePopupOpen } onAddPlace={ handleAddPlaceSubmit } onClose={ closeAllPopups } /> 

        <ImagePopup selectedCard={ selectedCard } onClose={ closeAllPopups } />
        
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
