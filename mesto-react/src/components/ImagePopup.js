import React from 'react';

function ImagePopup() {
    return (
        <div className="popup popup_zoom-image">
           <div className="popup__big">
               <button className="popup__close popup__close_image" type="button"></button>
                 <figure className="popup__figure">
                   <img className="popup__image-preview" alt="" />
                   <figcaption className="popup__image-title"></figcaption>
                 </figure>
            </div>
        </div>
    )
}

export default ImagePopup;