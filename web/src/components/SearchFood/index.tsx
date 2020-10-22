import React, { FormEvent, useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import FoodItem from '../FoodItem';
import Input from '../Input';

import './styles.scss';

interface IProps {
  handleBackClick(): void;
}

const SearchFood: React.FC<IProps> = ({ handleBackClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    console.log('enviei');
  };

  return (
    <>
      <section id="search-food">
        <form onSubmit={handleSubmit}>
          <Input name="search" />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <div className={`results ${isLoading ? 'loading' : ''}`}>
          {isLoading ? (
            <FaSpinner size={60} className="icon-spin" />
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>

      <footer className="search-food-footer">
        <button type="button" className="btn-back" onClick={handleBackClick}>
          Voltar
        </button>
        <button type="button" className="btn-green">
          Adicionar
        </button>
      </footer>
    </>
  );
};

export default SearchFood;
