import React, { useState } from 'react';
import { FaExclamationCircle, FaTrash } from 'react-icons/fa';

import './styles.scss';

interface IProps {
  handleDelete(): void;
}

const FoodSideDeleteButton: React.FC<IProps> = ({ handleDelete }) => {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <>
      {isLocked ? (
        <button
          className="delete"
          type="button"
          onClick={() => setIsLocked(false)}
        >
          <FaTrash />
        </button>
      ) : (
        <button
          className="delete confirmation"
          type="button"
          onClick={handleDelete}
        >
          <FaExclamationCircle />
        </button>
      )}
    </>
  );
};

export default FoodSideDeleteButton;
