import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from './utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
//import Card from './Card';
import AddPlacePopup from './AddPlacePopup';

function App() {
  // Стейт состояния попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = React.useState({ name: "", avatar: "", about: "", id: "" });
  const [cards, setCards] = React.useState([]);
  

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

  //Обновить данные пользователя
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


  //Обновить аватар
  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  //Получаем карточки с сервера
  React.useEffect(() => {
    api.getCards()
      .then(cards => {
          setCards(cards);
      })
      .catch(err => {
          console.log(err);
      })
}, [])

  //Ставим лайк/удаляем лайк
  function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      // Отправляем запрос в API и получаем обновлённые данные карточки
      isLiked 
      ? api.removeLike(card._id).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
          console.error(err);
      })
      : api.getLike(card._id).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
          console.error(err);
      });
  }
  
  //Удаляем карточку
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
         setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => {
      console.log(err);
    });
  }


  //Опубликовать новую карточку
  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
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
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        
      />
      <Footer />


      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}>
      </EditProfilePopup>

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        buttonTitle="Да"
        onClose={closeAllPopups}
      />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
