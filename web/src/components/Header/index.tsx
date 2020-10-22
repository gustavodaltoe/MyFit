import React from 'react';
import { FaUser } from 'react-icons/fa';

import './styles.scss';

import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/principal">
        <img srcSet={Logo} className="logo" alt="MyFit logo" />
      </Link>
      <Link to="/results">
        <FaUser className="icon" />
      </Link>
    </header>
  );
};

export default Header;
