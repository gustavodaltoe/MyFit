import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import FoodList from '../FoodList';

import './styles.scss';

const Food = () => {
  return (
    <section id="food">
      <header>
        <button type="button">
          <FaPlusCircle />
        </button>
        <h4>Adicionar Alimento</h4>
        <span>2, Alimento(s)</span>
      </header>
      <FoodList />
    </section>
  );
};

export default Food;
