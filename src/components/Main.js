import React from 'react';
import Card from './Card';
import api from './utils/Api';

function Main(props) {
    const [cards, setCards] = React.useState([]);

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
    React.useEffect(() => {
        api.getCards()
            .then(cards => {
                setCards(cards);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt={userName} />
                </div>
                <div className="profile__info">
                    <div className="profile__info-wrap">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="button button_edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__text">{userDescription}</p>
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
                        card={{ name: item.name, link: item.link }}
                        onCardClick={props.onCardClick}
                    />
                ))
                }
            </section>
        </main>
    );
}

export default Main;