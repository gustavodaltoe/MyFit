import React from 'react';
import Food from '../../components/Food';
import Header from '../../components/Header';

import './styles.scss';

function Foods() {
  return (
    <main id="foods">
      <Header />
      <Food />
    </main>
  );
}

export default Foods;
