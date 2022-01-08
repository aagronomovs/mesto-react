import React from 'react';
import Card from './Card';
import api from './utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
   
    const currentUser = React.useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([]);

    //Данные пользователя
  //  const [userName, setUserName] = React.useState("");
   // const [userDescription, setUserDescription] = React.useState("");
   // const [userAvatar, setUserAvatar] = React.useState("");

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

function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.getLike(card._id, !isLiked)
        .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
        console.log(err);
    });
}
   

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__info-wrap">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="button button_edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__text">{currentUser.about}</p>
                </div>

                <button className="button button_add" type="button" onClick={props.onAddPlace} aria-label="Add"></button>
            </section>

            <section className="cards">
                {cards.map(item => (
                    <Card
                        key={item._id}
                        name={item.name}
                        link={item.link}
                        likes={item.likes}
                        owner={item.owner}
                        card={{ name: item.name, link: item.link, likes: item.likes, _id: item._id }}
                        onCardClick={props.onCardClick}
                        onCardLike={handleCardLike}
                    />
                ))
                }
            </section>
        </main>
    );
}

export default Main;