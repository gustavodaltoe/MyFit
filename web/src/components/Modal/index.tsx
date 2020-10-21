import React, { memo, useCallback, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import FoodItem from '../FoodItem';

import './styles.scss';

interface IProps {
  isOpen: boolean;
  title: string;
  handleClose(): void;
}

const Modal: React.FC<IProps> = memo((props) => {
  const handleCloseClick = useCallback(() => props.handleClose(), [props]);

  return (
    <section className={`modal ${props.isOpen ? 'active' : ''}`}>
      <div className="container">
        <button type="button" onClick={handleCloseClick}>
          <FaTimes />
        </button>
        <header>
          <h3>{props.title}</h3>
        </header>

        {props.children}
      </div>
    </section>
  );
});

export default Modal;
