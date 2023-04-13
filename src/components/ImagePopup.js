function ImagePopup(props) {

  return (
    <div className={`popup popup_high-opacity image-popup popup_transition ${props.selectedCard ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <img src={props.selectedCard ? props.selectedCard.link : '#'} className="popup__image" alt={props.selectedCard ? props.selectedCard.name : '#'} />
        <button type="button" onClick={ props.onClose } className="popup__exit-button link-transparency" name="closeBtn"
          aria-label="Закрыть окно"></button>
        <h3 className="popup__image-subtitle">{props.selectedCard ? props.selectedCard.name : '#'}</h3>
      </div>
    </div>

  );
}

export default ImagePopup;