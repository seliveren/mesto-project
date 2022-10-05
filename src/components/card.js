import {
  popupPhoto,
  popupPhotoImg,
  captionText,
  cardTemplate,
  places
} from "./constants.js";
import { openPopup } from "./modal.js";
import {addLikes, deleteLikes, removeCard, currentUserId} from "./index.js"

//функция для постановки лайков
function toggleLike(evt) {
  evt.target.classList.toggle("button_category_like-active");
}

//функция для открытия карточки
function openCard(placeLinkValue, placeNameValue, placeAltValue) {
  openPopup(popupPhoto);
  popupPhotoImg.src = placeLinkValue;
  captionText.textContent = placeNameValue;
  popupPhotoImg.alt = placeAltValue;
}

//добавление карточки (возвращение готовой карточки)
export function addPlace(
  placeNameValue,
  placeLinkValue,
  placeAltValue,
  id,
  ownerId,
  placeLikes,
  placeLikesLength,
) {
  const cardElement = cardTemplate
    .querySelector(".places__place")
    .cloneNode(true);
  const cardPlaceImage = cardElement.querySelector(".places__image");

  cardPlaceImage.src = placeLinkValue;
  cardElement.querySelector(".places__name").textContent = placeNameValue;
  cardPlaceImage.alt = placeAltValue;
  cardElement.querySelector(".like-counter").textContent = placeLikesLength;
  cardElement.setAttribute("data-id", `${id}`);

  if (placeLikesLength >= 0) {
    //при релоаде сохранение стиля лайка
    for (let i = 0; i < placeLikesLength; i++) {
      if (placeLikes[i]._id === currentUserId) {
        cardElement
          .querySelector(".button_category_like")
          .classList.add("button_category_like-active");
      }
    }
  }

  //добавление корзины только у моей карточки
  if (ownerId !== currentUserId) {
    cardElement
      .querySelector(".button_category_delete")
      .remove();
  }

  //добавление возможности удаления у моей карточки
  if (ownerId === currentUserId) {
    cardElement
      .querySelector(".button_category_delete")
      .addEventListener("click", function (e) {
      let id = e.target.closest(".places__place").dataset.id;
      removeCard(id);
      e.target.closest(".places__place").remove();
    });
  }

  //ставить лайки на карточке
  cardElement
    .querySelector(".button_category_like")
    .addEventListener("click", function (e) {
      const id = e.target.closest(".places__place").dataset.id;

      if (
        !cardElement
          .querySelector(".button_category_like")
          .classList.contains("button_category_like-active")
      ) {
        addLikes(id);
        cardElement
          .querySelector(".button_category_like")
          .classList.add("button_category_like-active");
        cardElement.querySelector(".like-counter").textContent =
          placeLikesLength + 1;
      } else {
        deleteLikes(id);
        cardElement
          .querySelector(".button_category_like")
          .classList.remove("button_category_like-active");
        cardElement.querySelector(".like-counter").textContent =
          placeLikesLength;
      }
    });

  //открытие фотографии новой карточки
  cardPlaceImage.addEventListener("click", () =>
    openCard(placeLinkValue, placeNameValue, placeAltValue)
  );

  return cardElement;
}

//функция вставки карточки
export function insertCard(element) {
  places.append(element);
}


