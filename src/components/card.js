import {
  popupPhoto, popupPhotoImg, captionText, cardTemplate, places, placeName, placeLink, formAddCard,
  popupAdd
} from "./utils.js";
import {openPopup, closePopup} from "./modal.js";
import {initialCards} from "./cards.js";

//функция для постановки лайков
function addLike(evt) {
  evt.target.classList.toggle('button_category_like-active');
}

//функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__place').remove();
}

//функция для открытия карточки
function openCard(evt) {
  openPopup(popupPhoto);
  popupPhotoImg.src = evt.target.src;
  captionText.textContent = evt.target.closest('.places__place').textContent;
  popupPhotoImg.alt = evt.target.alt;
}

//добавление карточки (возвращение готовой карточки)
function addPlace(placeNameValue, placeLinkValue, placeAltValue) {
  const cardElement = cardTemplate.querySelector('.places__place').cloneNode(true);
  const cardPlaceImage = cardElement.querySelector('.places__image');

  cardPlaceImage.src = placeLinkValue;
  cardElement.querySelector('.places__name').textContent = placeNameValue;
  cardPlaceImage.alt = placeAltValue;

  //ставить лайки на новой карточке
  cardElement.querySelector('.button_category_like').addEventListener('click', addLike);

  //удалить новую карточку
  cardElement.querySelector('.button_category_delete').addEventListener('click', deleteCard);

  //открытие фотографии новой карточки
  cardPlaceImage.addEventListener('click', openCard);

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

  closePopup(popupAdd);
}

//изначальные карточки на странице
initialCards.forEach(element => {
  const baseCards = addPlace(element.name, element.link, element.alt);
  insertCard(baseCards);
});