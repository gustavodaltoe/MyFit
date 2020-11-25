import React, { memo, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';

import './styles.scss';

interface IProps {
  title: string;
  handleClose(): void;
}

const Modal: React.FC<IProps> = memo((props) => {
  const handleCloseClick = useCallback(() => props.handleClose(), [props]);

  return (
    <section className="modal">
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
