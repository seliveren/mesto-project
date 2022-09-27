import {
  nameMain, userInfoMain, popupEdit, nameInput, jobInput, avatar, formAvatarEdit, avatarInput,
  popupAvatar, avatarOverlay
} from "./constants.js";
import {closePopup} from "./modal.js"

//функция сохранения информации в профиле
export function submitProfile(evt) {
  evt.preventDefault();
  nameMain.textContent = nameInput.value;
  userInfoMain.textContent = jobInput.value;
  closePopup(popupEdit);
};

//отображение значений профиля в форме редактирования
export function displayProfileInfo() {
  if(nameInput.value === '') {
    nameInput.value = nameMain.textContent;
  };

  if(jobInput.value === '') {
    jobInput.value = userInfoMain.textContent;
  };
};

//функция сохранения аватарки
export function submitAvatar(evt) {
  evt.preventDefault();
  avatar.src = avatarInput.value;
  formAvatarEdit.reset();
  closePopup(popupAvatar);
};

//появление иконки у аватарки
export function showIcon() {
  avatarOverlay.classList.add('profile__avatar-overlay_displayed');
};

//исчезновение иконки у аватарки
export function hideIcon() {
  avatarOverlay.classList.remove('profile__avatar-overlay_displayed');
};
