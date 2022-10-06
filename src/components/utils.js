import { saveButtons } from "./constants.js";

export function renderLoading(isLoading) {
  saveButtons.forEach((button) => {
    if (isLoading) {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Сохранить";
    }
  });
}
