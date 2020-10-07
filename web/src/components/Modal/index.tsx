import React, { memo, useCallback } from 'react';

import { FaTimes } from 'react-icons/fa';
import FoodList from '../FoodList';

import './styles.scss';

interface IProps {
  isOpen: boolean;
  handleClose(): void;
}

const Modal: React.FC<IProps> = memo((props: IProps) => {
  const handleCloseClick = useCallback(() => props.handleClose(), [props]);
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
            <input type="number" value={0} />
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
