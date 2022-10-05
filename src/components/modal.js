import { popupList } from "./constants.js";

//функция открытия поп-ап'ов
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupWithEsc);
}

//функция закрытия поп-ап'ов
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupWithEsc);
}

//закрытие поп-апов кнопкой esc
function closePopupWithEsc(evt) {
  if (evt.key === "Escape") {
    popupList.forEach( (popup) => {
      if (popup.classList.contains("popup_opened")) {
        closePopup(popup);
      }
    });
  }
}
