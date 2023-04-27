import React from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card);
  }  

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }  

  return (
    <article className="elements__item">
      <img src={ props.card.link } onClick={ handleClick } className="elements__item-image" alt={`Изображение ${props.card.name}`} />
      { isOwn && <button type="button" className="elements__del-button link-transparency" onClick={ handleCardDelete }></button> }
      <div className="elements__item-info">
        <h3 className="elements__item-title">{ props.card.name }</h3>
        <div className="elements__like-div">
          <button type="button" onClick={ handleLikeClick } className={`elements__like-button ${isLiked && "elements__like-button_active"}`} aria-label="Поставить лайк"></button>
          <p className="elements__likes">{ props.card.likes.length }</p>
        </div>
      </div>
    </article>
  );
}

export default Card;