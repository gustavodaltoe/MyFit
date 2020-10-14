import React from 'react';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import FoodItem from '../../components/FoodItem';
import FoodList from '../../components/FoodList';
import Header from '../../components/Header';

import './styles.scss';

function Foods() {
  return (
    <main id="foods">
      <Header />

      <section className="content">
        <header>
          <h4>Meus Alimentos</h4>
          <small>2 Alimento(s)</small>
        </header>
        <div className="food-container">
          <FoodItem />
          <button type="button">
            <FaTrash />
          </button>
        </div>
        <div className="food-container">
          <FoodItem />
          <button type="button">
            <FaTrash />
          </button>
        </div>
        <div className="food-container">
          <FoodItem />
          <button type="button">
            <FaTrash />
          </button>
        </div>
        <div className="food-container">
          <FoodItem />
          <button type="button">
            <FaTrash />
          </button>
        </div>
        <div className="food-container">
          <FoodItem />
          <button type="button">
            <FaTrash />
          </button>
        </div>
      </section>

      <button type="button" id="open-add-food">
        <FaPlusCircle size={60} />
      </button>
    </main>
  );
}

export default Foods;
