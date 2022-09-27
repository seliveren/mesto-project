//проверка валидности всех полей
function checkIfInvalid(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
};

//изменение состояния кнопки
function changeButtonStyle(inputs, button, settings) {
  if(checkIfInvalid(inputs)) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
};

//показывает ошибку невалидного поля
function displayError(form, input, message, settings) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.textContent = message;
  error.classList.add(settings.errorClass);
};

//скрывает ошибку невалидного поля
function concealError(form, input, settings) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.classList.remove(settings.errorClass);
  error.textContent = '';
};

//проверка соответствия паттерну и навешивание или скрытие кастомной ошибки
function checkWhetherToDisplayCustomError(form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error);
  } else {
    input.setCustomValidity("");
  }
};

//проверка валидности и навешивание или скрытие ошибки
function checkWhetherToDisplayError(form, input, settings) {
  if (!input.validity.valid) {
    displayError(form, input, input.validationMessage, settings);
  } else {
    concealError(form, input, settings);
  }
};

//проверка, показ/скрытие ошибки и изменение состояния кнопки в процессе "живой" валидации
function addEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  changeButtonStyle(inputs, button, settings);

  form.addEventListener('reset', () => {
    setTimeout(() => {
      changeButtonStyle(inputs, button, settings);
    }, 0);
  });

  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkWhetherToDisplayCustomError(form, input);
      checkWhetherToDisplayError(form, input, settings);
      changeButtonStyle(inputs, button, settings);
    });
  });
};

//запуск валидации (полей) и изменения состояния (кнопки) элементов формы
export function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    forms.forEach ((form) => {
      addEventListeners(form, settings);
    });
  });
};





