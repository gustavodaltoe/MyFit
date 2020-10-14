import React from 'react';
import { FaTrash } from 'react-icons/fa';
import FoodItem from '../FoodItem';

import './styles.scss';

const FoodList = () => {
  return (
    <section className="food-list">
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
  );
};

export default FoodList;
