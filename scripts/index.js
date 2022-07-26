//объявление переменных 

//поп-ап'ы
const popupEdit = document.querySelector('.popup_type_for-profile');
const popupAdd = document.querySelector('.popup_type_for-place');
const popupPhoto = document.querySelector('.popup_type_for-photo'); 

//кнопки
const buttonEdit = document.querySelector('.button_category_edit');
const buttonAdd = document.querySelector('.button_category_add');
const buttonCloseProfileEdit = popupEdit.querySelector('.button_category_close');
const buttonCloseAddCard = popupAdd.querySelector('.button_category_close');
const buttonClosePhoto = popupPhoto.querySelector('.button_category_close');

//форма редактирования профиля
const formProfileEdit = popupEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_about-info'); 
const nameMain = document.querySelector('.profile__name');
const userInfoMain = document.querySelector('.profile__about-info');

//для создания новой карточки
const places = document.querySelector('.places');
const cardTemplate = document.querySelector('#card').content;

//форма добавления карточки 
const formAddCard = popupAdd.querySelector('.popup__form');
const placeName = document.querySelector('.popup__item_type_place-name');
const placeLink = document.querySelector('.popup__item_type_place-link');

//для открытия фотографии новой карточки 
const popupPhotoImg = document.querySelector('.popup__photo'); 
const caption = document.querySelectorAll('.places__name'); 
const captionText = document.querySelector('.popup__caption'); 




//объявление функций 

//функция открытия поп-ап'ов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

//функция закрытия поп-ап'ов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

//функция сохранения информации в профиле
function submitProfile(evt) {
  evt.preventDefault();
  nameMain.textContent = nameInput.value;
  userInfoMain.textContent = jobInput.value;
  closePopup(popupEdit);
};

//функция для постановки лайков 
function addLike(evt) {
  evt.target.classList.toggle('button_category_like-active');
};

//функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__place').remove();
};

//функция для открытия карточки
function openCard(evt) {
  openPopup(popupPhoto);
  popupPhotoImg.src = evt.target.src;
  captionText.textContent = evt.target.closest('.places__place').textContent;
  popupPhotoImg.alt = evt.target.alt;
};

//добавление карточки (возвращение готовой карточки)
function addPlace(placeNameValue, placeLinkValue, placeAltValue) {
  const cardElement = cardTemplate.querySelector('.places__place').cloneNode(true);
  const cardPlaceImage = cardElement.querySelector('.places__image');

  cardPlaceImage.src = placeLinkValue;
  cardElement.querySelector('.places__name').textContent = placeNameValue;
  cardPlaceImage.alt = placeAltValue;
  
  //ставить лайки на новой карточке
  cardElement.querySelector('.button_category_like').addEventListener('click', addLike);
  
  //удалить новую карточку 
  cardElement.querySelector('.button_category_delete').addEventListener('click', deleteCard);
  
  //открытие фотографии новой карточки 
  cardPlaceImage.addEventListener('click', openCard); 

  return cardElement;
};

//функция вставки карточки
function insertCard(element) {
  places.prepend(element);
}

//функция сохранения добавления новой карточки 
function submitAddPlace(evt) {
  evt.preventDefault();

  const cardNew = addPlace(placeName.value, placeLink.value, placeName.value);
  insertCard(cardNew);

  formAddCard.reset();

  closePopup(popupAdd);
};

//изначальные карточки на странице
initialCards.forEach(element => {
  const baseCards = addPlace(element.name, element.link, element.alt);
  insertCard(baseCards);
});

//отображение значений профиля в форме редактирования
function displayProfileInfo() {
  nameInput.value = nameMain.textContent;
  jobInput.value = userInfoMain.textContent;
};

  


//объявление слушателей событий

//открытие поп-ап с редактированием профиля
buttonEdit.addEventListener('click', function() {
  openPopup(popupEdit);
  displayProfileInfo();
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
});

//закрытие поп-ап для добавления новой карточки 
buttonCloseAddCard.addEventListener('click', function() {
  closePopup(popupAdd);
});

//сохранение новой карточки 
formAddCard.addEventListener('submit', submitAddPlace);