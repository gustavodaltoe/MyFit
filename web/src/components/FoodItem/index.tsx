import React from 'react';

import './styles.scss';

export default function FoodItem() {
  return (
    <div className="food-item">
      <div>
        <strong>Ovo mexido</strong>
        <span className="description">Ovo, 3 unidade(s)</span>
      </div>
      <div>
        <span className="calories">300</span>
        <div className="macros">
          <span>
            C:<em className="red">2.4</em>
          </span>
          <span>
            P:<em className="blue">20</em>
          </span>
          <span>
            G:
            <em className="yellow">19.5</em>
          </span>
        </div>
      </div>
    </div>
  );
}
