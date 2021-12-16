import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from './utils/Api';

function App() {
  // Стейт состояния попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen]= React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

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

  //Закрываем попапы
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
   // isEditProfilePopupOpen(false);
   // isAddPlacePopupOpen(false);
    //isEditAvatarPopupOpen(false);
  }

  //Данные пользователя
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();

 
  
  //Получаем данные пользователя
  React.useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setUserName(data.name)
      setUserDescription(data.about)
      setUserAvatar(data.avatar)
     //userName = profile.name
     //userDescription = profile.about
     //userAvatar = profile.avatar
     // console.log(getUserInfo);
    })
    .catch(err => {
      console.log(err)
    })
  })

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
      />
      <Footer />

  <template id="template" className="card-template card-template_type_default">
    <article className="item">
      <img className="item__photo" alt="" />
      <button className="button button_delete" type="button"></button>
      <div className="item__wrapper">
        <h2 className="item__title"></h2>
        <div className="item__like-box">
          <button className="button button_like" type="button"></button>
          <p className="item__like-counter"></p>
        </div>
      </div>
    </article>
  </template>

  < PopupWithForm 
  name="edit-profile"
  title="Редактировать профиль"
  buttonTitle="Сохранить"
  isOpen={isEditProfilePopupOpen}
  onClose={closeAllPopups}
  children={
  <>
        <input id="userform-name-input" type="text" className="popup__input popup__input_field_name" name="name"
          minLength="2" maxLength="40" required placeholder="Имя" value />
        <span id="userform-name-input-error" className="popup__error"></span>
        <input id="userform-job-input" type="text" className="popup__input popup__input_field_job" name="about"
          placeholder="О себе" minLength="2" maxLength="200" required value />
        <span id="userform-job-input-error" className="popup__error"></span>
        </> }
        
  />
  
  <PopupWithForm 
    name="add-card"
    title="Новое место"
    buttonTitle="Создать"
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups} 
    children={ 
      <>  
       <input id="card-name-input" type="text" className="popup__input popup__input_field_card-name" name="cardName"
          placeholder="Название" minLength="2" maxLength="30" required value />
        <span id="card-name-input-error" className="popup__error"></span>
        <input id="card-link-input" type="url" className="popup__input popup__input_field_link" name="cardLink"
          placeholder="Ссылка на картинку" required value /> 
        <span id="card-link-input-error" className="popup__error"></span> 
     </> }
 />      
  

  <ImagePopup onClose={closeAllPopups} />

  <PopupWithForm>
    name="delete-card"
    title="Вы уверены?"
    buttonTitle="Да"
    onClose={closeAllPopups}
  </PopupWithForm>

  <PopupWithForm
    name="avatar"
    title="Обновить аватар"
    buttonTitle="Сохранить"
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    children={
  <>
        <input id="avatar-link-input" type="url" className="popup__input popup__input_field_link" name="link"
          placeholder="Ссылка" required value />
        <span id="avatar-link-input-error" className="popup__error"></span>
        </>
    }
  />        

</div>
);
}

export default App;
