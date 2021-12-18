import React from 'react';

function Card(props) {

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    return (

        <article className="item">
            <img className="item__photo" alt={props.name} src={props.link} onClick={handleCardClick} />
            <button className="button button_delete" type="button"></button>
            <div className="item__wrapper">
                <h2 className="item__title">{props.name}</h2>
                <div className="item__like-box">
                    <button className="button button_like" type="button"></button>
                    <p className="item__like-counter">{props.likes.length}</p>
                </div>
            </div>
        </article>

    )
}

export default Card;