import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from './utils/Api';
import EditProfilePopup from './EditProfilePopup';
//import Card from './Card';

function App() {
  // Стейт состояния попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = React.useState({ name: "", avatar: "", about: "", id: "" });
  

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

    //Получаем данные пользователя
    React.useEffect(() => {
      api.getUserInfo()
          .then(data => {
              setCurrentUser(data)
         })
          .catch(err => {
              console.log(err)
          })
  }, [])


  const handleUpdateUser = (data) => {
    api.updateUserInfo(data)
        .then((res) => {
           setCurrentUser(res);
           closeAllPopups();
        })
        .catch(err => {
          console.log(err)
        })
  }
  


 
  return (

    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        
      />
      <Footer />


      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}>
      </EditProfilePopup>

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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
