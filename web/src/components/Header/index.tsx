import React from 'react';
import { FaUser } from 'react-icons/fa';

import './styles.scss';

import Logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <header className="app-header">
      <img srcSet={Logo} className="logo" alt="MyFit logo" />
      <FaUser className="icon" />
    </header>
  );
};

export default Header;
