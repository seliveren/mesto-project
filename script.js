//общая функция открытия и закрытия поп-ап'ов
function openPopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
};


//открытие и закрытие поп-ап с редактированием профиля
const editButton = document.querySelector('.button_category_edit');
const closeButton = document.querySelectorAll('.button_category_close');
const popupEdit = document.querySelectorAll('.popup')[0];

editButton.addEventListener('click', function() {
  openPopup(popupEdit)});

closeButton[0].addEventListener('click', function() {
  openPopup(popupEdit)});

const formProfile = document.querySelectorAll('.popup__form')[0];
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_about-info'); 

function submitProfile (evt) {
  evt.preventDefault();

  const nameMain = document.querySelector('.profile__name');
  const aboutUserMain = document.querySelector('.profile__about-info');

  nameMain.textContent = nameInput.value;
  aboutUserMain.textContent = jobInput.value;

  openPopup(popupEdit);
};

formProfile.addEventListener('submit', submitProfile);


//изначальные карточки на странице
const places = document.querySelector('.places');
const cardTemplate = document.querySelector('#card').content;
const cardElement = cardTemplate.querySelector('.places__place').cloneNode(true);

const initialCards = [
  {
    name: 'Дворцовая площадь',
    link: 'https://images.unsplash.com/photo-1554844344-c34ea04258c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80',
    alt: 'Вид на здание Дворцовой площади',
    class: 'popup-image'

  },
  {
    name: 'Памятник Маршалу Жукову',
    link: 'https://images.unsplash.com/photo-1544519106-05aa00b68bbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    alt: 'Вид из деревьев на памятник',
    class: 'popup-image'
  },
  {
    name: 'Озеро Телецкое',
    link: 'https://images.unsplash.com/photo-1589122758779-0df750e72d2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1356&q=80',
    alt: 'Девушка стоит на берегу и смотрит вдаль на озеро',
    class: 'popup-image'
  },
  {
    name: 'Петергоф',
    link: 'https://images.unsplash.com/photo-1610197361600-33a3a5073cad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'Вид на фонтан в Петергофе',
    class: 'popup-image'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1612257460705-e0d24b7a4808?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    alt: 'Медведь идет у реки',
    class: 'popup-image'
  },
  {
    name: 'Остров Ольхон',
    link: 'https://images.unsplash.com/photo-1548130516-2ca6aaeb84b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'Вид на скалистый берег острова',
    class: 'popup-image'
  }
  ];

initialCards.forEach(function (element) {
  const initialCardElement = cardTemplate.cloneNode(true);
  
  initialCardElement.querySelector('.places__image').src = element.link; 
  initialCardElement.querySelector('.places__image').alt = element.alt;
  initialCardElement.querySelector('.places__name').textContent = element.name;
    
  places.append(initialCardElement);
});


//добавление карточки 
function addPlace(placeNameValue, placeLinkValue) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.places__place').cloneNode(true);
  
  cardElement.querySelector('.places__image').src = placeLinkValue;
  cardElement.querySelector('.places__name').textContent = placeNameValue;
  
  //ставить лайки на новой карточке
  cardElement.querySelector('.button_category_like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('button_category_like-active');
  });
  
  //удалить новую карточку 
  cardElement.querySelector('.button_category_delete').addEventListener('click', function (evt) {
    evt.target.closest('.places__place');
    cardElement.remove();
  });
  
  places.prepend(cardElement);
  
  //открытие фотографии новой карточки 
  cardElement.querySelector('.places__image').addEventListener('click', function () {
    openPopup(popupPhoto);
    popupPhotoImg.src = placeLinkValue;
    captionText.textContent = placeNameValue;
  });
  
  closeButton[2].onclick = function() {
    openPopup(popupPhoto);
  };
};


// закрытие и открытие поп-ап для добавления новой карточки 
const addButton = document.querySelector('.button_category_add');
const popupAdd = document.querySelectorAll('.popup')[1];

addButton.addEventListener('click', function() {
  openPopup(popupAdd)});

closeButton[1].addEventListener('click', function() {
  openPopup(popupAdd)});

const formAddPlace = document.querySelectorAll('.popup__form')[1];

function submitAddPlace (evt) {
  evt.preventDefault();

  const placeName = document.querySelector('.popup__item_type_place-name');
  const placeLink = document.querySelector('.popup__item_type_place-link');

  addPlace(placeName.value, placeLink.value);

  placeName.value = '';
  placeLink.value = '';

  openPopup(popupAdd);
}

formAddPlace.addEventListener('submit', submitAddPlace);


//удаление карточек, которые уже есть на странице 
const deleteButtons = document.querySelectorAll('.button_category_delete');

for(let i = 0; i < deleteButtons.length; i++) {
deleteButtons[i].addEventListener('click', function () {
  const placesItem = deleteButtons[i].closest('.places__place');
  placesItem.remove();
});
};


//ставить и убрать лайки на карточках, которые уже есть на странице 
const likeButtons = document.querySelectorAll('.button_category_like');

for(let i = 0; i < likeButtons.length; i++)
  likeButtons[i].addEventListener('click', function () {
  likeButtons[i].classList.toggle('button_category_like-active')
});


//открыть фотографии с карточек, которые уже есть на странице  
const popupPhoto = document.querySelectorAll('.popup')[2];
const img = document.querySelectorAll('.places__image');
const popupPhotoImg = document.querySelector('.popup__photo');
const caption = document.querySelectorAll('.places__name');
const captionText = document.querySelector('.popup__caption');
 
for(let i = 0; i < img.length; i++)
img[i].addEventListener('click', function (evt) {
  openPopup(popupPhoto);
  popupPhotoImg.src = evt.target.src;
  captionText.textContent = caption[i].textContent;
});

closeButton[2].onclick = function() {
  openPopup(popupPhoto);
};