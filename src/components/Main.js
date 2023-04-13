import React from 'react';
import { useState, useEffect } from 'react';
import editButtonPic from '../images/edit-button.svg';
import addButtonPic from '../images/add-button-cross.svg';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Card from './Card.js';
import api from '../utils/Api.js';

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);


  React.useEffect(function () {
    api.getProfileData()
      .then((data)=>{
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__pers-data">
          <button type="button" onClick={ props.onEditAvatar } style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar-button" aria-label="Изменить аватар">
          </button>
          <div className="profile__details">
            <div className="profile__name-field">
              <h1 className="profile__name">{ userName }</h1>
              <button type="button" onClick={ props.onEditProfile } className="profile__edit-button link-transparency" aria-label="Редактировать данные">
                <img src={ editButtonPic } className="profile__edit-button-image" alt="Кнопка 'Изменить данные'" />
              </button>
            </div>
            <p className="profile__profession">{ userDescription }</p>
          </div>
        </div>
        <button type="button" onClick={ props.onAddPlace } className="profile__add-button link-transparency" aria-label="Добавить изображение">
          <img src={ addButtonPic } className="profile__add-button-image" alt="Кнопка 'Добавить'" />
        </button>
      </section>

      <section className="elements" aria-label="Галерея фотографий">
        {cards.map((el, i)=><Card key={el._id} card={el} onCardClick={props.onCardClick} />)}
      </section>

      <PopupWithForm name='profilePopup' title='Редактировать профиль' SubmitBtnCaption="Сохранить" isOpen={props.isEditProfilePopupOpen} onClose={props.onClose} children={
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

      <PopupWithForm name='avatarPopup' title='Обновить аватар' SubmitBtnCaption="Сохранить" isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose} children={
        <fieldset className="popup__fieldset">
          <input type="url" className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
          <span className="popup__input-error link-error"></span>
        </fieldset>
      } />

      <PopupWithForm name='confirmPopup' title='Вы уверены?' SubmitBtnCaption="Да"/>


      <PopupWithForm name='cardPopup' title='Новое место' SubmitBtnCaption="Создать" isOpen={props.isAddPlacePopupOpen} onClose={props.onClose} children={
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

      <ImagePopup selectedCard={ props.selectedCard } onClose={ props.onClose } />
    </main>
  );
}

export default Main;