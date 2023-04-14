import React from 'react';
import { useState, useEffect } from 'react';
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

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
    <div className="page">

      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm name='profilePopup' title='Редактировать профиль' submitBtnCaption="Сохранить" isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } children={
        <>
          <fieldset className="popup__fieldset">
            <input type="text" className="popup__input popup__input_type_name" placeholder="Введите имя" name="name" required minLength="2" maxLength="40" />
            <span className="popup__input-error name-error"></span>
          </fieldset>
          <fieldset className="popup__fieldset">
            <input type="text" className="popup__input popup__input_type_prof" placeholder="Введите профессию" name="prof" required minLength="2" maxLength="200" />
            <span className="popup__input-error prof-error"></span>
          </fieldset>
        </>
      } />

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

    </div>
  );
}

export default App;
