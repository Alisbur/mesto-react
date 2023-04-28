import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm name='profilePopup' title='Редактировать профиль' submitBtnCaption="Сохранить" onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } children={
      <>
        <fieldset className="popup__fieldset">
          <input type="text" value={ name } onChange={ handleNameChange } className="popup__input popup__input_type_name" placeholder="Введите имя" name="name" required minLength="2" maxLength="40" />
          <span className="popup__input-error name-error"></span>
        </fieldset>
        <fieldset className="popup__fieldset">
          <input type="text" value={ description } onChange={ handleDescriptionChange } className="popup__input popup__input_type_prof" placeholder="Введите профессию" name="prof" required minLength="2" maxLength="200" />
          <span className="popup__input-error prof-error"></span>
        </fieldset>
      </>
    } />
  );
}

export default EditProfilePopup;