import React from 'react';
import Base from '../../components/Base';

import './styles.scss';

function Confirmation() {
  return (
    <Base>
      <fieldset>
        <legend>Aguardando confirmação de cadastro por email.</legend>
        <button type="submit" className="btn-white">
          Tentar novamente
        </button>
      </fieldset>
    </Base>
  );
}

export default Confirmation;
