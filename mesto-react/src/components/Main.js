import React from 'react';

function Main() {
    return (
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
    );
}

export default Main;