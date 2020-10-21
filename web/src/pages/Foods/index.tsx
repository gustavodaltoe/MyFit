import React, { useState } from 'react';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import FoodItem from '../../components/FoodItem';
import FoodList from '../../components/FoodList';
import Header from '../../components/Header';
import Modal from '../../components/Modal';

import './styles.scss';

function Foods() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFoodAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleFoodModalClose = () => {
    setIsModalOpen(false);
  };

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

      <button type="button" onClick={handleFoodAddButtonClick}>
        <FaPlusCircle size={60} />
      </button>

      <Modal
        title="Novo Alimento"
        isOpen={isModalOpen}
        handleClose={handleFoodModalClose}
      />
    </main>
  );
}

export default Foods;
