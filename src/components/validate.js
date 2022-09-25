//проверка валидности всех полей
function checkIfInvalid(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
};

//изменение состояния кнопки
function changeButtonStyle(inputs, button) {
  if(checkIfInvalid(inputs)) {
    button.classList.add('button_inactive');
  } else {
    button.classList.remove('button_inactive');
  }
};

//показывает ошибку невалидного поля
function displayError(form, input, message) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__item_type_error');
  error.textContent = message;
  error.classList.add('popup__error_type_active');
};

//скрывает ошибку невалидного поля
function concealError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__item_type_error');
  error.classList.remove('popup__error_active');
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
function checkWhetherToDisplayError(form, input) {
  if (!input.validity.valid) {
    displayError(form, input, input.validationMessage);
  } else {
    concealError(form, input);
  }
};

//проверка, показ/скрытие ошибки и изменение состояния кнопки в процессе "живой" валидации
function addEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__item'));
  const button = form.querySelector('.button_category_save');
  changeButtonStyle(inputs, button);
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkWhetherToDisplayCustomError(form, input);
      checkWhetherToDisplayError(form, input);
      changeButtonStyle(inputs, button);
    });
  });
};

//запуск валидации (полей) и изменения состояния (кнопки) элементов формы
export function switchOnValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    forms.forEach ((form) => {
      addEventListeners(form);
    });
  });
};



