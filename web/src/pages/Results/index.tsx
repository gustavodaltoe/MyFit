/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Base from '../../components/Base';

import './styles.scss';

function Results() {
  return (
    <Base>
      <fieldset>
        <legend>Resultados</legend>
        <br />
        <br />

        <div className="profile-results">
          <div>
            <strong>Taxa metábólica basal:</strong>
            <span>1791 kcal</span>
          </div>
          <br />

          <div>
            <strong>Índice massa corporal:</strong>
            <span>29.41</span>
          </div>
          <br />

          <div>
            <strong>Requisitos de água:</strong>
            <span>2750 ml</span>
          </div>
          <br />

          <div>
            <strong>Requisitos calóricos diários:</strong>
            <span>1970 kcal</span>
          </div>
          <br />
        </div>
        <br />
        <br />

        <div className="side-by-side">
          <div id="font-red">
            <span>Carboidratos</span>

            <strong>172 g</strong>

            <span>688 kcal</span>
          </div>
          <div id="font-blue">
            <span>Proteína</span>

            <strong>172 g</strong>

            <span>688 kcal</span>
          </div>
          <div id="font-yellow">
            <span>Gordura</span>

            <strong>66 g</strong>

            <span>594 kcal</span>
          </div>
        </div>
        <br />

        <button type="button" className="btn-green">
          Continuar
        </button>
      </fieldset>
    </Base>
  );
}

export default Results;
