import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import Base from '../../components/Base';

import './styles.scss';

function Confirmation() {
  return (
    <Base>
      <div id="confirmation">
        <h1>Aguardando confirmação de cadastro por email.</h1>
        <button type="submit" className="btn-white">
          <FaSyncAlt />
          Tentar novamente
        </button>
      </div>
    </Base>
  );
}

export default Confirmation;
