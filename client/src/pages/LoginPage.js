import React, { useState } from 'react';
import '../styles/LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleLogin = () => {
    let isValid = true;
    setNameError('');
    setPhoneError('');
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length !== 3) {
      setNameError('Будь ласка вкажіть свої ПІБ повністю!');
      isValid = false;
    }
    if (!phoneNumber) {
      setPhoneError('Будь ласка вкажіть свій номер телефону!');
      isValid = false;
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setPhoneError('Будь ласка вкажіть дійсний номер телефону!');
        isValid = false;
      }
    }
    if (isValid) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userPhone', phoneNumber);
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Вхід у банківський аккаунт</h2>
        <div className="inputContainer">
          <label className="label">Ім'я повністю (ПІБ):</label>
          <input
            type="text"
            placeholder="Степан Гіга Петрович"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          {nameError && <label className="errorLabel">{nameError}</label>}
        </div>

        <div className="inputContainer">
          <label className="label">Номер телефону:</label>
          <input
            type="text"
            placeholder="0961234567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input"
          />
          {phoneError && <label className="errorLabel">{phoneError}</label>}
        </div>

        <button onClick={handleLogin} className="loginButton">
          Увійти
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
