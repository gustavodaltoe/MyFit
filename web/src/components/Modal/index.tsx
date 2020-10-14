import React, { memo, useCallback, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import FoodItem from '../FoodItem';

import './styles.scss';

interface IProps {
  isOpen: boolean;
  handleClose(): void;
}

const Modal: React.FC<IProps> = memo((props: IProps) => {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState<number | null>(null);
  const handleCloseClick = useCallback(() => props.handleClose(), [props]);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let amount = parseInt(e.target.value, 10);

    if (amount < 1) {
      amount = 1;
    }
    setQuantity(amount);
  }

  return (
    <section className={`modal ${props.isOpen ? 'active' : ''}`}>
      <div className="container">
        <button type="button" onClick={handleCloseClick}>
          <FaTimes />
        </button>
        <header>
          <h3>Adicionar alimento</h3>
        </header>
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
            <button type="button" onClick={handleCloseClick}>
              Fechar
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
});

export default Modal;
