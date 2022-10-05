import {
  popupPhoto,
  popupPhotoImg,
  captionText,
  cardTemplate,
  places,
  placeName,
  placeLink,
  formAddCard,
  popupAdd,
} from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
import {
  getInitialCards,
  postedCard,
  putLike,
  deletedLike,
  deletedCard,
} from "./api.js";
import { renderLoading } from "./utils.js";

//изначальные карточки на странице
getInitialCards()
  .then((res) => {
    res.forEach((el) => {
      const card = addPlace(
        el.name,
        el.link,
        el.alt,
        el._id,
        el.owner._id,
        el.likes,
        el.likes.length
      );
      insertCard(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//функция для постановки лайков
function toggleLike(evt) {
  evt.target.classList.toggle("button_category_like-active");
}

//функция удаления карточки
function deleteCard(id) {
  deletedCard(id).catch((err) => {
    console.log(err);
  });
}

//функция постановки лайка
function addLikes(id) {
  putLike(id).catch((err) => {
    console.log(err);
  });
}

//функция удаления лайка
function deleteLikes(id) {
  deletedLike(id).catch((err) => {
    console.log(err);
  });
}

//функция для открытия карточки
function openCard(placeLinkValue, placeNameValue, placeAltValue) {
  openPopup(popupPhoto);
  popupPhotoImg.src = placeLinkValue;
  captionText.textContent = placeNameValue;
  popupPhotoImg.alt = placeAltValue;
}

//создание каркаса кнопки удаления
function createDeleteMarkup() {
  return `
     <button class="button button_category_delete"></button>
  `;
}

//вставка html элемента
function insertMarkup(space, element) {
  space.insertAdjacentHTML("afterbegin", element);
}

//добавление карточки (возвращение готовой карточки)
function addPlace(
  placeNameValue,
  placeLinkValue,
  placeAltValue,
  id,
  ownerId,
  placeLikes,
  placeLikesLength
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

  const hasMyId = placeLikes.some(function (like) {
    return like._id === "3c95ff7236bc20de41907267";
  });

  //при релоаде сохранение стиля лайка
  if (hasMyId) {
    cardElement
      .querySelector(".button_category_like")
      .classList.add("button_category_like-active");
  }

  //добавление корзины только у моей карточки
  if (ownerId === "3c95ff7236bc20de41907267") {
    insertMarkup(cardElement, createDeleteMarkup());
    cardElement
      .querySelector(".button_category_delete")
      .addEventListener("click", function (e) {
        let id = e.target.closest(".places__place").dataset.id;
        deleteCard(id);
        e.target.closest(".places__place").remove();
      });
  }

  //ставить лайки на карточке
  cardElement
    .querySelector(".button_category_like")
    .addEventListener("click", function (e) {
      let id = e.target.closest(".places__place").dataset.id;

      if (
        !cardElement
          .querySelector(".button_category_like")
          .classList.contains("button_category_like-active") &&
        !hasMyId
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

//создание новой карточки на сервере
function createCard(newCard) {
  postedCard(newCard)
    .then((card) => {
      insertCard(addPlace(card.name, card.link));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false, formAddCard);
    });
}

//функция вставки карточки
function insertCard(element) {
  places.append(element);
}

//функция сохранения добавления новой карточки
export function submitAddPlace(evt) {
  evt.preventDefault();

  renderLoading(true, formAddCard);

  const photoName = placeName;
  const photoLink = placeLink;

  createCard({
    name: photoName.value,
    link: photoLink.value,
  });

  formAddCard.reset();
  closePopup(popupAdd);
}
