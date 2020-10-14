import React, { memo, useCallback, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import FoodList from '../FoodList';

import './styles.scss';

interface IProps {
  isOpen: boolean;
  handleClose(): void;
}

const Modal: React.FC<IProps> = memo((props: IProps) => {
  const [quantity, setQuantity] = useState(1);
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
          <FoodList />
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
            <button type="button">Adicionar</button>
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
