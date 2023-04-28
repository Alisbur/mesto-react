import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {
//Создаём переменную контекста
  const currentUser = React.useContext(CurrentUserContext);
//Переменные состояний
  const [link, setLink] = React.useState('');
//Создаём реф
  const inputRef = React.useRef(null);

//Обнуляем инпут при закрытии попапа
  React.useEffect(() => {
    if (props.isOpen) 
      setLink('');
  }, [props.isOpen]); 

//ОБработчик изменения состояния переменной ссылки
  function handleLinkChange() {
    setLink(inputRef.current.value);
  }

//ОБработчик сабмита с сохранением ссылки на новый аватар с помощью функции, проброшенной через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link
    });
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