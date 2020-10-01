import React from 'react';
import Daily from '../../components/Daily';
import Header from '../../components/Header';

import './styles.scss';

function Principal() {
  return (
    <main id="principal">
      <Header />
      <div className="container">
        <Daily />
      </div>
    </main>
  );
}

export default Principal;
