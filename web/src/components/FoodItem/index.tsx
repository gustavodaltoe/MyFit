import React from 'react';
import FoodDto from '../../dtos/FoodDto';

import './styles.scss';

interface IProps {
  food: FoodDto;
}

const FoodItem: React.FC<IProps> = ({ food }) => {
  return (
    <div className="food-item">
      <div>
        <strong>{food.name}</strong>
        <span className="description">
          {food.brand}, {food.portion} {food.unitMeasure}
        </span>
      </div>
      <div>
        <span className="calories">{food.calories}</span>
        <div className="macros">
          <span>
            C:<em className="red">{food.carbo}</em>
          </span>
          <span>
            P:<em className="blue">{food.protein}</em>
          </span>
          <span>
            G:
            <em className="yellow">{food.fat}</em>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
