import React from 'react';
import FoodDto from '../../dtos/FoodDto';

import './styles.scss';

interface IProps {
  food: FoodDto;
  amount?: number;
}

const FoodItem: React.FC<IProps> = ({ food, amount = 1 }) => {
  function calcMacroTotal(value: number): number {
    return Number((value * amount).toFixed(1));
  }

  return (
    <div className="food-item">
      <div>
        <strong>{food.name}</strong>
        <span className="description">
          {food.brand}, {food.portion * amount} {food.unitMeasure}
        </span>
      </div>
      <div>
        <span className="calories">{calcMacroTotal(food.calories)}</span>
        <div className="macros">
          <span>
            C:<em className="red">{calcMacroTotal(food.carbo)}</em>
          </span>
          <span>
            P:<em className="blue">{calcMacroTotal(food.protein)}</em>
          </span>
          <span>
            G:
            <em className="yellow">{calcMacroTotal(food.fat)}</em>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
