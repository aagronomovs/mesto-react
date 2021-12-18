import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from './utils/Api';
//import Card from './Card';

function App() {
  // Стейт состояния попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  // const [cards, setCards] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });

  // Подключаем обработчики
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  //Закрываем попапы
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  //Данные пользователя
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");



  //Получаем данные пользователя
  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //Получаем карточки с сервера
  // React.useEffect(() => {
  //  api.getCards()
  //  .then(data => {
  //    console.log(data);
  //   setCards(data);
  //})
  //.catch(err => {
  //  console.log(err);
  //})
  //}, [])

  return (

    <div className="root">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        userAvatar={userAvatar}
        userDescription={userDescription}
        userName={userName}
        onCardClick={handleCardClick}

      />
      <Footer />


      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>

        <input id="userform-name-input" type="text" className="popup__input popup__input_field_name" name="name"
          minLength="2" maxLength="40" required placeholder="Имя" />
        <span id="userform-name-input-error" className="popup__error"></span>
        <input id="userform-job-input" type="text" className="popup__input popup__input_field_job" name="about"
          placeholder="О себе" minLength="2" maxLength="200" required />
        <span id="userform-job-input-error" className="popup__error"></span>

      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} >

        <input id="card-name-input" type="text" className="popup__input popup__input_field_card-name" name="cardName"
          placeholder="Название" minLength="2" maxLength="30" required />
        <span id="card-name-input-error" className="popup__error"></span>
        <input id="card-link-input" type="url" className="popup__input popup__input_field_link" name="cardLink"
          placeholder="Ссылка на картинку" required />
        <span id="card-link-input-error" className="popup__error"></span>

      </PopupWithForm>


      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        buttonTitle="Да"
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>

        <input id="avatar-link-input" type="url" className="popup__input popup__input_field_link" name="link"
          placeholder="Ссылка" required />
        <span id="avatar-link-input-error" className="popup__error"></span>

      </PopupWithForm>

    </div>
  );
}

export default App;
