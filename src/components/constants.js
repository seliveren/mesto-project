//поп-ап'ы
export const popupList = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_for-profile");
export const popupAdd = document.querySelector(".popup_type_for-place");
export const popupPhoto = document.querySelector(".popup_type_for-photo");
export const popupAvatar = document.querySelector(".popup_type_for-avatar");

//кнопки
export const buttonEdit = document.querySelector(".button_category_edit");
export const buttonAdd = document.querySelector(".button_category_add");
export const buttonSave = document.querySelector(".button_category_save");
export const saveButtons = document.querySelectorAll(".button_category_save");

//форма редактирования профиля
export const formProfileEdit = popupEdit.querySelector(".popup__form");
export const nameInput = document.querySelector(".popup__item_type_name");
export const jobInput = document.querySelector(".popup__item_type_about-info");
export const nameMain = document.querySelector(".profile__name");
export const userInfoMain = document.querySelector(".profile__about-info");
export const popupItems = document.querySelectorAll(".popup__item");
export const popupErrors = document.querySelectorAll(".popup__error");

//для создания новой карточки
export const places = document.querySelector(".places");
export const cardTemplate = document.querySelector("#card").content;

//форма добавления карточки
export const formAddCard = popupAdd.querySelector(".popup__form");
export const placeName = document.querySelector(".popup__item_type_place-name");
export const placeLink = document.querySelector(".popup__item_type_place-link");

//для открытия фотографии новой карточки
export const popupPhotoImg = document.querySelector(".popup__photo");
export const captionText = document.querySelector(".popup__caption");

//для изменения аватарки
export const avatar = document.querySelector(".profile__avatar");
export const avatarInput = document.querySelector(
  ".popup__item_type_avatar-link"
);
export const formAvatarEdit = popupAvatar.querySelector(".popup__form");
export const avatarOverlay = document.querySelector(".profile__avatar-overlay");
