import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <body className="root">
  <header className="header">
    <img className="logo" src="./image/logo.svg" alt="Логотип" />
  </header>

  <main className="content">
    <section className="profile">
      <div className="profile__avatar-container">
        <img className="profile__avatar" src="./image/kusto.jpg" alt="Аватар профиля" />
      </div>
      <div className="profile__info">
        <div className="profile__info-wrap">
          <h1 className="profile__title"></h1>
          <button className="button button_edit" type="button"></button>
        </div>
        <p className="profile__text"></p>
      </div>

      <button className="button button_add" type="button" aria-label="Add"></button>
    </section>

    <section className="cards">

    </section>



  </main>
  <footer className="footer">
    <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
  </footer>

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

  <div className="popup popup_edit-profile">
    <div className="popup__container">
      <button className="popup__close popup__close_profile" type="button"></button>
      <form name="userform" className="popup__form popup__form_edit-profile" novalidate >
        <h2 className="popup__title">Редактировать профиль</h2>
        <input id="userform-name-input" type="text" className="popup__input popup__input_field_name" name="name"
          minlength="2" maxlength="40" required placeholder="Имя" value />
        <span id="userform-name-input-error" className="popup__error"></span>
        <input id="userform-job-input" type="text" className="popup__input popup__input_field_job" name="about"
          placeholder="О себе" minlength="2" maxlength="200" required value />
        <span id="userform-job-input-error" className="popup__error"></span>
        <button type="submit" className="button popup__submit popup__submit_profile popup__submit_disabled" name="submit"
          value="Сохранить">Сохранить</button>
      </form>
    </div>
  </div>

  <div className="popup popup_add-card">
    <div className="popup__container">
      <button className="popup__close popup__close_card" type="button"></button>
      <form name="card" className="popup__form  popup__form_add-card" novalidate>
        <h2 className="popup__title">Новое место</h2>
        <input id="card-name-input" type="text" className="popup__input popup__input_field_card-name" name="cardName"
          placeholder="Название" minlength="2" maxlength="30" required value />
        <span id="card-name-input-error" className="popup__error"></span>
        <input id="card-link-input" type="url" className="popup__input popup__input_field_link" name="cardLink"
          placeholder="Ссылка на картинку" required value /> 
        <span id="card-link-input-error" className="popup__error"></span>
        <button type="submit" className="button popup__submit popup__submit_add-card popup__submit_disabled" name="submit"
          value="Создать">Создать</button>
      </form>
    </div>
  </div>

  <div className="popup popup_zoom-image">
    <div className="popup__big">
      <button className="popup__close popup__close_image" type="button"></button>
      <figure className="popup__figure">
        <img className="popup__image-preview" alt="" />
        <figcaption className="popup__image-title"></figcaption>
      </figure>
    </div>
  </div>

  <div className="popup popup_delete-card">
    <div className="popup__container">
      <button className="popup__close popup__close_delete-card" type="button"></button>
      <form name="delete" className="popup__form popup__form_delete-card">
        <h2 className="popup__title">Вы уверены?</h2>
        <button type="submit" className="button popup__submit popup__submit_delete-card" name="submit" value="Да">Да</button>
      </form>
    </div>
  </div>

  <div class="popup popup_avatar">
    <div class="popup__container">
      <button className="popup__close popup__close_avatar" type="button"></button>
      <form name="avatar" className="popup__form popup__form_avatar" novalidate>
        <h2 className="popup__title">Обновить аватар</h2>
        <input id="avatar-link-input" type="url" className="popup__input popup__input_field_link" name="link"
          placeholder="Ссылка" required value />
        <span id="avatar-link-input-error" className="popup__error"></span>
        <button type="submit" className="button popup__submit popup__submit_avatar popup__submit_disabled" name="submit"
          value="Сохранить">Сохранить</button>
      </form>
    </div>
  </div>




</body>
    </div>
  );
}

export default App;
