import React, { useEffect, useState } from 'react';

import './styles.scss';
import { FaPlusCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProgressLinear from '../ProgressLinear';
import FoodList from '../FoodList';
import Modal from '../Modal';
import FoodItem from '../FoodItem';
import { useAuth } from '../../context/AuthContext';
import FoodDto from '../../dtos/FoodDto';
import foodService from '../../services/foodService';

const Daily = () => {
  const { user } = useAuth();
  const [foodList, setFoodList] = useState<FoodDto[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodDto | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const userFoodList = await foodService.list();
        setFoodList(userFoodList);
      } catch (err) {
        toast.error('Falha ao tentar buscas os alimentos');
      }
    })();
  }, []);

  if (!user.necessities) {
    return <Redirect to="/profile/create" />;
  }

  const { calories, carbs, fat, proteins } = user.necessities;

  const handleFoodAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleFoodModalClose = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
    setQuantity(1);
  };

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let amount = parseInt(e.target.value, 10);

    if (amount < 1) {
      amount = 1;
    }
    setQuantity(amount);
  }

  return (
    <section id="daily">
      <header>
        <button type="button">
          <FaChevronLeft />
        </button>
        <h4>Hoje</h4>
        <button type="button">
          <FaChevronRight />
        </button>
      </header>

      <div className="resume">
        <div className="macros">
          <div className="red">
            <p>Carboidratos</p>
            <b>16/{carbs} g</b>
          </div>
          <div className="blue">
            <p>Proteína</p>
            <b>16/{proteins} g</b>
          </div>
          <div className="yellow">
            <p>Gordura</p>
            <b>10/{fat} g</b>
          </div>
        </div>
        <div className="progress blue">
          <ProgressLinear current={536} total={calories} />
        </div>
      </div>

      <header className="period">
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Café da manhã</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Almoço</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Janta</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      <header className="period">
        <button type="button" onClick={handleFoodAddButtonClick}>
          <FaPlusCircle />
        </button>
        <span>Lanches</span>
        <b>536kcal</b>
      </header>
      <div className="entry">
        <FoodList />
      </div>

      {isModalOpen && (
        <Modal title="Adicionar Alimento" handleClose={handleFoodModalClose}>
          <Link to="/foods">
            <FaPlusCircle className="icon" />
          </Link>
          <section className="content">
            <div className="food-list">
              {foodList.map((food) => (
                <button
                  key={food.id}
                  type="button"
                  className={`select-food ${
                    selectedFood && food.id === selectedFood.id
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => {
                    if (selectedFood && selectedFood.id === food.id) {
                      return setSelectedFood(null);
                    }
                    return setSelectedFood(food);
                  }}
                >
                  <FoodItem food={food} />
                </button>
              ))}
            </div>
          </section>
          <footer>
            <div>
              <input
                type="number"
                value={quantity}
                onChange={handleAmountChange}
              />
              <span>Unidades</span>
            </div>
            <div>
              <button type="button" className="add" disabled={!selectedFood}>
                Adicionar
              </button>
              <button type="button" onClick={handleFoodModalClose}>
                Fechar
              </button>
            </div>
          </footer>
        </Modal>
      )}
    </section>
  );
};

export default Daily;
