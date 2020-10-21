import React, { useState } from 'react';

import './styles.scss';
import { FaPlusCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProgressLinear from '../ProgressLinear';
import FoodList from '../FoodList';
import Modal from '../Modal';
import FoodItem from '../FoodItem';

const Daily = () => {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFoodAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleFoodModalClose = () => {
    setIsModalOpen(false);
  };

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let amount = parseInt(e.target.value, 10);

    if (amount < 1) {
      amount = 1;
    }
    setQuantity(amount);
  }

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
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Café da manhã</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Almoço</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Janta</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Lanches</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <Modal
        title="Adicionar Alimento"
        isOpen={isModalOpen}
        handleClose={handleFoodModalClose}
      >
        <section className="content">
          <div className="food-list">
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button
              type="button"
              className={`select-food ${1 === 1 ? 'selected' : ''}`}
            >
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
            <button type="button" className="select-food">
              <FoodItem />
            </button>
          </div>
        </section>
        <footer>
          <div>
            <input
              type="number"
              value={quantity}
              onChange={
                handleAmountChange /* (e) => setQuantity(e.target.value) */
              }
            />
            <span>Unidades</span>
          </div>
          <div>
            <button type="button" className="add">
              Adicionar
            </button>
            <button type="button" onClick={handleFoodModalClose}>
              Fechar
            </button>
          </div>
        </footer>
      </Modal>
    </section>
  );
};

export default Daily;
