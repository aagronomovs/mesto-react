import React from 'react';

function Main(props) {



    return (
        <main className="content">
          <section className="profile">
              <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                 <img className="profile__avatar" src={props.userAvatar} alt="Аватар профиля" />
              </div>
          <div className="profile__info">
              <div className="profile__info-wrap">
                <h1 className="profile__title">{props.userName}</h1>
                <button className="button button_edit" type="button" onClick={props.onEditProfile}></button>
               </div>
               <p className="profile__text">{props.userDescription}</p>
          </div>

              <button className="button button_add" type="button" onClick={props.onAddPlace} aria-label="Add"></button>
          </section>

          <section className="cards">

          </section>
        </main>
    );
}

export default Main;