import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const [link, setLink] = React.useState('');
  const inputRef = React.useRef(null);

  function handleLinkChange() {
    setLink(inputRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link
    });
    setLink('');
  } 

  return (
    <PopupWithForm name='avatarPopup' title='Обновить аватар' submitBtnCaption="Сохранить" onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } children={
      <fieldset className="popup__fieldset">
        <input ref={inputRef} type="url" value={ link } onChange={ handleLinkChange } className="popup__input popup__input_type_link" placeholder="Введите ссылку" name="link" required />
        <span className="popup__input-error link-error"></span>
      </fieldset>
    } />
  );
}

export default EditAvatarPopup;