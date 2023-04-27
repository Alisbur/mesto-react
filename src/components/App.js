import React from 'react';
import { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
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

        <PopupWithForm name='avatarPopup' title='Обновить аватар' submitBtnCaption="Сохранить" isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } children={
          <fieldset className="popup__fieldset">
            <input type="url" className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
            <span className="popup__input-error link-error"></span>
          </fieldset>
        } />

        <PopupWithForm name='confirmPopup' title='Вы уверены?' submitBtnCaption="Да" onClose={ closeAllPopups } />

        <PopupWithForm name='cardPopup' title='Новое место' submitBtnCaption="Создать" isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } children={
          <>
            <fieldset className="popup__fieldset">
              <input type="text" className="popup__input popup__input_type_place" placeholder="Введите название места"
              name="name" required minLength="2" maxLength="30" />
              <span className="popup__input-error name-error"></span>
            </fieldset>
            <fieldset className="popup__fieldset">
              <input type="url" className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
              <span className="popup__input-error link-error"></span>
            </fieldset>
          </>
        } />

        <ImagePopup selectedCard={ selectedCard } onClose={ closeAllPopups } />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
