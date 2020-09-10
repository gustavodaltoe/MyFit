import React from 'react';

import Logo from '../../assets/logo.svg';

import './styles.scss';

interface BaseProps {
  hideLogo?: boolean;
}

const Base: React.FC<BaseProps> = ({ hideLogo, children }) => {
  return (
    <main id="base" className="container">
      {!hideLogo && <img srcSet={Logo} className="logo" alt="MyFit logo" />}
      <section className="container">{children}</section>
    </main>
  );
};

export default Base;
