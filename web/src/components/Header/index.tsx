import React from 'react';
import { FaUser } from 'react-icons/fa';

import './styles.scss';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  hideLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideLogo }) => {
  return (
    <header className="app-header">
      {!hideLogo && <img srcSet={Logo} className="logo" alt="MyFit logo" />}
      <FaUser className="icon" />
    </header>
  );
};

export default Header;
