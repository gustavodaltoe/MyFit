import React from 'react';
import DailyFoodDto from '../../dtos/DailyFoodDto';
import FoodItem from '../FoodItem';
import FoodSideDeleteButton from '../FoodSideDeleteButton';

import './styles.scss';

interface IProps {
  dailyFoods: DailyFoodDto[];
  handleDelete(dailyFoodId: number): Promise<void>;
}

const FoodList: React.FC<IProps> = ({ dailyFoods, handleDelete }) => {
  return (
    <>
      <section className="food-list">
        {dailyFoods.map((dailyFood) => (
          <div key={dailyFood.id} className="food-container">
            <FoodItem food={dailyFood.food} amount={dailyFood.amount} />
            <FoodSideDeleteButton
              handleDelete={() => handleDelete(dailyFood.id)}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default FoodList;
