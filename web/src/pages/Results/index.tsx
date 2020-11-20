/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FaFire, FaEgg, FaTint, FaBurn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Base from '../../components/Base';
import { useAuth } from '../../context/AuthContext';

import './styles.scss';

function Results() {
  const { logout, user } = useAuth();

  if (!user.info.profile || !user.necessities) {
    return <div>loading...</div>;
  }

  const {
    basalMetabolicRate,
    calories,
    carbs,
    proteins,
    fat,
  } = user.necessities;
  const { weight, height } = user.info.profile;

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
            <span>{basalMetabolicRate} kcal</span>
          </div>

          <div>
            <strong>
              <FaEgg className="fa" />
              Índice massa corporal:
            </strong>
            <span>{(weight / (height / 100) ** 2).toFixed(2)}</span>
          </div>

          <div>
            <strong>
              <FaTint className="fa" />
              Requisitos de água:
            </strong>
            <span>{35 * weight} ml</span>
          </div>

          <div>
            <strong>
              <FaBurn className="fa" />
              Requisitos calóricos diários:
            </strong>
            <span>{calories} kcal</span>
          </div>
        </div>

        <div className="macros">
          <div className="font-red">
            <span>Carboidratos</span>
            <strong>{carbs} g</strong>
            <span>{carbs * 4} kcal</span>
          </div>
          <div className="font-blue">
            <span>Proteína</span>
            <strong>{proteins} g</strong>
            <span>{proteins * 4} kcal</span>
          </div>
          <div className="font-yellow">
            <span>Gordura</span>
            <strong>66 g</strong>
            <span>{fat * 9} kcal</span>
          </div>
        </div>

        <div className="buttons-container">
          <Link className="btn-green" to="/principal">
            Continuar
          </Link>
          <button type="button" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </Base>
  );
}

export default Results;
