import { openPopup, closePopup } from "./modal.js";
import {
  buttonEdit,
  popupEdit,
  popupAdd,
  popupAvatar,
  formProfileEdit,
  buttonAdd,
  formAddCard,
  avatarOverlay,
  formAvatarEdit,
  avatar,
  popupList,
  nameMain,
  userInfoMain,
  nameInput,
  jobInput,
  avatarInput,
  placeName,
  placeLink,
} from "./constants.js";
import { appendCard, prependCard, addPlace } from "./card.js";
import { renderLoading } from "./utils.js";
import { enableValidation } from "./validate.js";
import "../pages/index.css";
import {
  createCard,
  deleteCard,
  deleteLike,
  getInitialCards,
  getUserInfo,
  putLike,
  updateAvatar,
  updateUserInfo,
} from "./api.js";

//открытие поп-ап с редактированием профиля
buttonEdit.addEventListener("click", function () {
  formProfileEdit.reset();
  openPopup(popupEdit);
  displayProfileInfo();
});

//сохранение информации в профиле
formProfileEdit.addEventListener("submit", submitProfile);

//открытие поп-ап для добавления новой карточки
buttonAdd.addEventListener("click", function () {
  formAddCard.reset();
  openPopup(popupAdd);
});

//сохранение новой карточки
formAddCard.addEventListener("submit", submitAddPlace);

//открытие поп-ап для изменения аватарки
avatarOverlay.addEventListener("click", function () {
  openPopup(popupAvatar);
  formAvatarEdit.reset();
});

//сохранение аватарки
formAvatarEdit.addEventListener("submit", submitAvatar);

//появление иконки на ховер мышью у аватарки
avatar.addEventListener("mouseover", showIcon);

//исчезновение иконки при снятии ховера мышью у аватарки
avatarOverlay.addEventListener("mouseout", hideIcon);

//валидация
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".button_category_save",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__error_type_active",
});

//закрытие поп-апов нажатием на крестик и оверлей
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("button_category_close")
    ) {
      closePopup(popup);
    }
  });
});

//обновление профиля
function updateProfile(newInfo) {
  updateUserInfo(newInfo)
    .then((profile) => {
      nameMain.textContent = profile.name;
      userInfoMain.textContent = profile.about;
    })
    .then((res) => closePopup(popupEdit))
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false);
    });
}

//функция сохранения информации в профиле
function submitProfile(evt) {
  evt.preventDefault();

  renderLoading(true);

  const profileName = nameInput;
  const profileAbout = jobInput;

  updateProfile({
    name: profileName.value,
    about: profileAbout.value,
  });
}

//отображение значений профиля в форме редактирования
function displayProfileInfo() {
  nameInput.value = nameMain.textContent;
  jobInput.value = userInfoMain.textContent;
}

//обновление аватарки
function renewAvatar(newAvatar) {
  updateAvatar(newAvatar)
    .then((ava) => {
      setUserAvatar(ava);
    })
    .then((res) => formAvatarEdit.reset())
    .then((res) => {
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false);
    });
}

//функция сохранения аватарки
function submitAvatar(evt) {
  evt.preventDefault();

  renderLoading(true);

  const avatarLink = avatarInput;

  renewAvatar({
    avatar: avatarLink.value,
  });
}

//появление иконки у аватарки
function showIcon() {
  avatarOverlay.classList.add("profile__avatar-overlay_displayed");
}

//исчезновение иконки у аватарки
function hideIcon() {
  avatarOverlay.classList.remove("profile__avatar-overlay_displayed");
}

//установка значений пользователя
function setUserInfo(res) {
  nameMain.textContent = res.name;
  userInfoMain.textContent = res.about;
}

//установка аватарки
function setUserAvatar(res) {
  avatar.src = res.avatar;
}

//отображение инфо о пользователе на страничке и получение id текущего пользователя
let currentUserId;
getUserInfo()
  .then((res) => {
    setUserInfo(res);
    setUserAvatar(res);
    currentUserId = res._id;
    //изначальные карточки на странице (вложенность)
    getInitialCards()
      .then((res) => {
        renderInitialCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

//создание новой карточки на сервере
export function makeCard(newCard) {
  createCard(newCard)
    .then((card) => {
      const newCard = addPlace(
        card.name,
        card.link,
        card.alt,
        card._id,
        card.owner._id,
        card.likes,
        card.likes.length,
        removeCard,
        addLikes,
        deleteLikes,
        currentUserId
      );
      prependCard(newCard);
    })
    .then((res) => formAddCard.reset())
    .then((res) => {
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false);
    });
}

//функция сохранения добавления новой карточки
function submitAddPlace(evt) {
  evt.preventDefault();

  renderLoading(true);

  const photoName = placeName;
  const photoLink = placeLink;

  makeCard({
    name: photoName.value,
    link: photoLink.value,
  });
}

//функция рендеринга карточек на странице
function renderInitialCards(res) {
  res.forEach((el) => {
    const card = addPlace(
      el.name,
      el.link,
      el.alt,
      el._id,
      el.owner._id,
      el.likes,
      el.likes.length,
      removeCard,
      addLikes,
      deleteLikes,
      currentUserId
    );
    appendCard(card);
  });
}

//функция удаления карточки
function removeCard(id) {
  deleteCard(id).catch((err) => {
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
  deleteLike(id).catch((err) => {
    console.log(err);
  });
}
