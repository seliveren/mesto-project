import {popupErrors, popupItems, saveButtons} from "./constants.js";

export function renderLoading(isLoading) {
  saveButtons.forEach((button) => {
    if (isLoading) {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Сохранить";
    }
  })
}

export function removeError() {
  popupItems.forEach(item => {
    item.classList.remove('popup__item_type_error')
  })
  popupErrors.forEach(error => {
    error.classList.remove('popup__error_type_active')
  })
}

export function changeStyle(inputOne, inputTwo) {
  saveButtons.forEach((button) => {
    if (inputOne.value === '' || inputTwo.value === '' ) {
      button.classList.add('button_inactive');
    } else {
      button.classList.remove('button_inactive');
    }
  })
}