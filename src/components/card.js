import {
  popupPhoto, popupPhotoImg, captionText, cardTemplate, places, placeName, placeLink, formAddCard,
  popupAdd
} from "./constants.js";
import {openPopup, closePopup} from "./modal.js";
import {initialCards} from "./cards.js";

//функция для постановки лайков
function toggleLike(evt) {
  evt.target.classList.toggle('button_category_like-active');
}

//функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__place').remove();
}

//функция для открытия карточки
function openCard(placeLinkValue, placeNameValue, placeAltValue) {
  openPopup(popupPhoto);
  popupPhotoImg.src = placeLinkValue;
  captionText.textContent = placeNameValue;
  popupPhotoImg.alt = placeAltValue;
}

//добавление карточки (возвращение готовой карточки)
function addPlace(placeNameValue, placeLinkValue, placeAltValue) {
  const cardElement = cardTemplate.querySelector('.places__place').cloneNode(true);
  const cardPlaceImage = cardElement.querySelector('.places__image');

  cardPlaceImage.src = placeLinkValue;
  cardElement.querySelector('.places__name').textContent = placeNameValue;
  cardPlaceImage.alt = placeAltValue;

  //ставить лайки на новой карточке
  cardElement.querySelector('.button_category_like').addEventListener('click', toggleLike);

  //удалить новую карточку
  cardElement.querySelector('.button_category_delete').addEventListener('click', deleteCard);

  //открытие фотографии новой карточки
  cardPlaceImage.addEventListener('click', () => openCard(placeLinkValue, placeNameValue, placeAltValue));

  return cardElement;
}

//функция вставки карточки
function insertCard(element) {
  places.prepend(element);
}

//функция сохранения добавления новой карточки
export function submitAddPlace(evt) {
  evt.preventDefault();
  const cardNew = addPlace(placeName.value, placeLink.value, placeName.value);
  insertCard(cardNew);
  formAddCard.reset();
  evt.submitter.disabled = true;
  closePopup(popupAdd);
}

//изначальные карточки на странице
initialCards.forEach(element => {
  const baseCards = addPlace(element.name, element.link, element.alt);
  insertCard(baseCards);
});