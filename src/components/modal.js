import {popupList} from "./utils.js";

//функция открытия поп-ап'ов
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
};

//функция закрытия поп-ап'ов
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
};

//закрытие поп-апов кнопкой esc
function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    popupList.forEach(el =>
      closePopup(el));
  }
};

//закрытие поп-апов по нажатию на оверлей
export function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    popupList.forEach(el =>
      closePopup(el));
  }
};

