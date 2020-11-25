import React from 'react';
import FoodDto from '../../dtos/FoodDto';

import './styles.scss';

interface IProps {
  food: FoodDto;
  amount?: number;
}

const FoodItem: React.FC<IProps> = ({ food, amount = 1 }) => {
  return (
    <div className="food-item">
      <div>
        <strong>{food.name}</strong>
        <span className="description">
          {food.brand}, {food.portion * amount} {food.unitMeasure}
        </span>
      </div>
      <div>
        <span className="calories">{food.calories * amount}</span>
        <div className="macros">
          <span>
            C:<em className="red">{food.carbo * amount}</em>
          </span>
          <span>
            P:<em className="blue">{food.protein * amount}</em>
          </span>
          <span>
            G:
            <em className="yellow">{food.fat * amount}</em>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
