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
} from "./constants.js";
import {
  displayProfileInfo,
  submitAvatar,
  submitProfile,
  showIcon,
  hideIcon,
} from "./profile.js";
import { submitAddPlace } from "./card.js";
import { enableValidation } from "./validate.js";
import "../pages/index.css";
import "../index.html";

//открытие поп-ап с редактированием профиля
buttonEdit.addEventListener("click", function () {
  openPopup(popupEdit);
  displayProfileInfo();
});

//сохранение информации в профиле
formProfileEdit.addEventListener("submit", submitProfile);

//открытие поп-ап для добавления новой карточки
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd);
});

//сохранение новой карточки
formAddCard.addEventListener("submit", submitAddPlace);

//открытие поп-ап для изменения аватарки
avatarOverlay.addEventListener("click", function () {
  openPopup(popupAvatar);
});

//сохранение аватарки
formAvatarEdit.addEventListener("submit", submitAvatar);

//появление иконки на ховер мышью у аватарки
avatar.addEventListener("mouseover", showIcon);

//исчезновение иконки при снятии ховера мышью у аватарки
avatarOverlay.addEventListener("mouseout", hideIcon);

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
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("button_category_close")) {
      closePopup(popup);
    }
  });
});
