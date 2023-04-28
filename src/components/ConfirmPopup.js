import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmPopup(props) {
//Обработчик сабмита. Вызывает обработчик, расположенный в App и переданный через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  } 

  return (

    <PopupWithForm name='confirmPopup' title='Вы уверены?' submitBtnCaption="Да" onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } />

  );
}

export default ConfirmPopup;