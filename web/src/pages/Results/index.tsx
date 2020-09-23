/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFire, FaEgg, FaTint, FaBurn } from 'react-icons/fa';
import Base from '../../components/Base';

import './styles.scss';

function Results() {
  return (
    <Base>
      <div id="results">
        <h1>Resultados</h1>
        <div className="profile-results">
          <div>
            <strong>
              <FaFire className="fa" />
              Taxa metábólica basal:
            </strong>
            <span>1791 kcal</span>
          </div>

          <div>
            <strong>
              <FaEgg className="fa" />
              Índice massa corporal:
            </strong>
            <span>29.41</span>
          </div>

          <div>
            <strong>
              <FaTint className="fa" />
              Requisitos de água:
            </strong>
            <span>2750 ml</span>
          </div>

          <div>
            <strong>
              <FaBurn className="fa" />
              Requisitos calóricos diários:
            </strong>
            <span>1970 kcal</span>
          </div>
        </div>

        <div className="macros">
          <div className="font-red">
            <span>Carboidratos</span>
            <strong>172 g</strong>
            <span>688 kcal</span>
          </div>
          <div className="font-blue">
            <span>Proteína</span>
            <strong>172 g</strong>
            <span>688 kcal</span>
          </div>
          <div className="font-yellow">
            <span>Gordura</span>
            <strong>66 g</strong>
            <span>594 kcal</span>
          </div>
        </div>

        <button type="button" className="btn-green">
          Continuar
        </button>
      </div>
    </Base>
  );
}

export default Results;
