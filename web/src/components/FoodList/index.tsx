import React from 'react';
import FoodItem from '../FoodItem';
import FoodSideDeleteButton from '../FoodSideDeleteButton';

import './styles.scss';

const FoodList = () => {
  function handleDelete() {
    // setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <section className="food-list">
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
    </>
  );
};

export default FoodList;
