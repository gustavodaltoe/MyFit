import React from 'react';
import Base from '../../components/Base';

import './styles.scss';

function Confirmation() {
  return (
    <Base>
      <div id="confirmation">
        <h1>Aguardando confirmação de cadastro por email.</h1>
        <button type="submit" className="btn-white">
          Tentar novamente
        </button>
      </div>
    </Base>
  );
}

export default Confirmation;
