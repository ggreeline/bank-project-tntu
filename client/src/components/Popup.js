import React from 'react';
import '../styles/Popup.css';

function Popup() {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Вас успішно додано в черугу!</h3>
        <p>Переглянути активні записи можна у відповідній вкладці зверху</p>
      </div>
    </div>
  );
}

export default Popup;
