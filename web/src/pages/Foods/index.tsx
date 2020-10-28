import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import FoodItem from '../../components/FoodItem';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import NewFoodModalContent from '../../components/NewFoodModalContent';
import SearchFood from '../../components/SearchFood';
import FoodSideDeleteButton from '../../components/FoodSideDeleteButton';

import './styles.scss';

function Foods() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const modalTitles = ['Selecione', 'Cadastrar Novo', 'Pesquisar Alimento'];

  const handleFoodAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleFoodModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {};

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
          <FoodSideDeleteButton handleDelete={handleDelete} />
        </div>
        <div className="food-container">
          <FoodItem />
          <FoodSideDeleteButton handleDelete={handleDelete} />
        </div>
        <div className="food-container">
          <FoodItem />
          <FoodSideDeleteButton handleDelete={handleDelete} />
        </div>
        <div className="food-container">
          <FoodItem />
          <FoodSideDeleteButton handleDelete={handleDelete} />
        </div>
        <div className="food-container">
          <FoodItem />
          <FoodSideDeleteButton handleDelete={handleDelete} />
        </div>
      </section>

      <button type="button" onClick={handleFoodAddButtonClick}>
        <FaPlusCircle size={60} />
      </button>

      <Modal
        title={modalTitles[modalIndex]}
        isOpen={isModalOpen}
        handleClose={handleFoodModalClose}
      >
        {modalIndex === 0 && (
          <section className="content">
            <button type="button" onClick={() => setModalIndex(1)}>
              <span>Cadastrar novo</span>
            </button>
            <button type="button" onClick={() => setModalIndex(2)}>
              <span>Pesquisar alimentos</span>
            </button>
          </section>
        )}
        {modalIndex === 1 && (
          <NewFoodModalContent
            handleBackClick={() => {
              setModalIndex(0);
            }}
          />
        )}
        {modalIndex === 2 && (
          <SearchFood
            handleBackClick={() => {
              setModalIndex(0);
            }}
          />
        )}
      </Modal>
    </main>
  );
}

export default Foods;
