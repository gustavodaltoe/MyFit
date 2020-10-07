import React from 'react';

import './styles.scss';
import {
  FaPlusCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';
import ProgressLinear from '../ProgressLinear';
import FoodList from '../FoodList';

const Daily = () => {
  return (
    <section id="daily">
      <header>
        <button type="button">
          <FaChevronLeft />
        </button>
        <h4>Hoje</h4>
        <button type="button">
          <FaChevronRight />
        </button>
      </header>

      <div className="resume">
        <div className="macros">
          <div className="red">
            <p>Carboidratos</p>
            <b>16/172 g</b>
          </div>
          <div className="blue">
            <p>Proteína</p>
            <b>16/172 g</b>
          </div>
          <div className="yellow">
            <p>Gordura</p>
            <b>10/66 g</b>
          </div>
        </div>
        <div className="progress blue">
          <ProgressLinear current={536} total={1970} />
        </div>
      </div>

      <header className="period">
        <button type="button">
          <FaPlusCircle />
        </button>
        <span>Café da manhã</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button">
          <FaPlusCircle />
        </button>
        <span>Almoço</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button">
          <FaPlusCircle />
        </button>
        <span>Janta</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button">
          <FaPlusCircle />
        </button>
        <span>Lanches</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>
    </section>
  );
};

export default Daily;
