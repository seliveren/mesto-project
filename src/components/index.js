import {openPopup, closePopup, closePopupOverlay} from "./modal.js";
import {buttonEdit, popupEdit, popupPhoto, popupAdd, popupAvatar, buttonCloseProfileEdit, formProfileEdit, buttonClosePhoto,
  buttonAdd, buttonCloseAddCard, formAddCard, avatarOverlay, buttonCloseAvatar, formAvatarEdit, avatar} from "./utils.js";
import {displayProfileInfo, submitAvatar, submitProfile, showIcon, hideIcon} from "./profile.js";
import {submitAddPlace} from "./card.js";
import {switchOnValidation} from "./validate.js";
import '../pages/index.css';

//открытие поп-ап с редактированием профиля
buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
  displayProfileInfo();
  switchOnValidation();
});

//закрытие поп-ап с редактированием профиля
buttonCloseProfileEdit.addEventListener('click', function() {
  closePopup(popupEdit);
});

//сохранение информации в профиле 
formProfileEdit.addEventListener('submit', submitProfile);

//закрытие поп-ап с фотографией в карточке 
buttonClosePhoto.addEventListener('click', function() {
  closePopup(popupPhoto);
});

//открытие поп-ап для добавления новой карточки 
buttonAdd.addEventListener('click', function() {
  openPopup(popupAdd);
  switchOnValidation();
});

//закрытие поп-ап для добавления новой карточки 
buttonCloseAddCard.addEventListener('click', function() {
  closePopup(popupAdd);
});

//сохранение новой карточки 
formAddCard.addEventListener('submit', submitAddPlace);

//открытие поп-ап для изменения аватарки
avatarOverlay.addEventListener('click', function() {
  openPopup(popupAvatar);
  switchOnValidation();
});

//закрытие поп-ап для изменения аватарки
buttonCloseAvatar.addEventListener('click', function() {
  closePopup(popupAvatar);
});

//сохранение аватарки
formAvatarEdit.addEventListener('submit', submitAvatar);

//закрытие поп-апа по нажатию на оверлей
document.addEventListener('click', closePopupOverlay);

//появление иконки на ховер мышью у аватарки
avatar.addEventListener('mouseover', showIcon);

//исчезновение иконки при снятии ховера мышью у аватарки
avatarOverlay.addEventListener('mouseout', hideIcon);





