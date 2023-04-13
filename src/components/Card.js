function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <article className="elements__item">
      <img src={ props.card.link } onClick={handleClick} className="elements__item-image" alt="" />
      <button type="button" className="elements__del-button link-transparency"></button>
      <div className="elements__item-info">
        <h3 className="elements__item-title">{ props.card.name }</h3>
        <div className="elements__like-div">
          <button type="button" className="elements__like-button" aria-label="Поставить лайк"></button>
          <p className="elements__likes">{ props.card.likes.length }</p>
        </div>
      </div>
    </article>
  );
}

export default Card;