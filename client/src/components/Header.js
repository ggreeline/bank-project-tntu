import React from 'react';
import { Link } from 'react-router';

const Header = ({ setIsLoggedIn, label, href, hrefLabel }) => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    setIsLoggedIn(false);
  };
  return (
    <div className="header">
      <h2>{label}</h2>
      <div className="headerRight">
        <span>{localStorage.getItem('userName')}</span>
        <Link to={href} className="link">
          {hrefLabel}
        </Link>
        <button onClick={handleLogout} className="log-out-button">
          Вийти
        </button>
      </div>
    </div>
  );
};

export default Header;
