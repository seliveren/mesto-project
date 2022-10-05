import {
  nameMain, userInfoMain, popupEdit, nameInput, jobInput, avatar, formAvatarEdit, avatarInput,
  popupAvatar, avatarOverlay, formProfileEdit
} from "./constants.js";
import {closePopup} from "./modal.js"
import {profileData, changedProfile, changedAvatar} from "./api.js"
import {renderLoading} from "./utils";

function updateProfile(newInfo) {
  changedProfile(newInfo)
    .then(profile => {
      nameMain.textContent = profile.name
      userInfoMain.textContent = profile.about
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(res => {renderLoading(false, formProfileEdit)})
}

//функция сохранения информации в профиле
export function submitProfile(evt) {
  evt.preventDefault();

  renderLoading(true, formProfileEdit)

  const profileName  = nameInput;
  const profileAbout = jobInput;

  updateProfile({
    name: profileName.value,
    about: profileAbout.value
  });

  closePopup(popupEdit);
};

//отображение значений профиля в форме редактирования
export function displayProfileInfo() {
  profileData()
    .then((res) => {
        nameInput.value = res.name;
        jobInput.value = res.about;
    })
    .catch((err) => {
      console.log(err);
    });
};

function updateAvatar(newAvatar) {
  changedAvatar(newAvatar)
    .then(ava => {
      avatar.src = ava.avatar
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(res => {renderLoading(false, formAvatarEdit)})
}

//функция сохранения аватарки
export function submitAvatar(evt) {
  evt.preventDefault();

  renderLoading(true, formAvatarEdit)

  const avatarLink  = avatarInput;

  updateAvatar({
    avatar: avatarLink.value
  });

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

//отображение инфо о пользователе на страничке
profileData()
  .then((res) => {
    nameMain.textContent = res.name;
    userInfoMain.textContent = res.about;
    avatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

