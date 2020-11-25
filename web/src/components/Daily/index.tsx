import React, { useCallback, useEffect, useState } from 'react';

import './styles.scss';
import { FaPlusCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  subDays,
} from 'date-fns';
import ProgressLinear from '../ProgressLinear';
import FoodList from '../FoodList';
import Modal from '../Modal';
import FoodItem from '../FoodItem';
import { useAuth } from '../../context/AuthContext';
import FoodDto from '../../dtos/FoodDto';
import foodService from '../../services/foodService';
import DailyFoodDto from '../../dtos/DailyFoodDto';
import dailyFoodService from '../../services/dailyFoodService';

const Daily = () => {
  const { user } = useAuth();
  const [userFoodList, setUserFoodList] = useState<FoodDto[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodDto | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [dailyFoods, setDailyFoods] = useState<DailyFoodDto[]>([]);
  const [breakfast, setBreakfast] = useState<DailyFoodDto[]>([]);
  const [lunch, setLunch] = useState<DailyFoodDto[]>([]);
  const [dinner, setDinner] = useState<DailyFoodDto[]>([]);
  const [snacks, setSnacks] = useState<DailyFoodDto[]>([]);
  const [date, setDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const dailyFoodsFromDate = await dailyFoodService.list(date);
        setDailyFoods(dailyFoodsFromDate);
      } catch (err) {
        toast.error('Falha ao tentar buscas os alimentos');
      }
    })();
  }, [date]);

  useEffect(() => {
    function filterPeriod(arr: DailyFoodDto[], period: string) {
      return arr.filter((dailyFood) => dailyFood.lunchPeriod === period);
    }

    setBreakfast(filterPeriod(dailyFoods, 'breakfast'));
    setLunch(filterPeriod(dailyFoods, 'lunch'));
    setDinner(filterPeriod(dailyFoods, 'dinner'));
    setSnacks(filterPeriod(dailyFoods, 'snacks'));
  }, [dailyFoods]);

  useEffect(() => {
    (async () => {
      try {
        setUserFoodList(await foodService.list());
      } catch (err) {
        toast.error('Falha ao tentar buscas os alimentos');
      }
    })();
  }, []);

  const handleFoodModalClose = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
    setQuantity(1);
  };

  const addSelectedFoodToDailyFoods = useCallback(async () => {
    if (!selectedFood || !selectedFood.id || !selectedPeriod) return;

    try {
      const dailyFood = await dailyFoodService.create({
        date,
        amount: quantity,
        foodId: selectedFood.id,
        lunchPeriod: selectedPeriod,
      });

      setDailyFoods([...dailyFoods, dailyFood]);
      handleFoodModalClose();
    } catch (err) {
      toast.error('Falha ao tentar adicionar alimento');
    }
  }, [dailyFoods, date, quantity, selectedFood, selectedPeriod]);

  if (!user.necessities) {
    return <Redirect to="/profile/create" />;
  }

  const { calories, carbs, fat, proteins } = user.necessities;

  const handleFoodAddButtonClick = (period: string) => {
    setIsModalOpen(true);
    setSelectedPeriod(period);
  };

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let amount = parseInt(e.target.value, 10);

    if (amount < 1) {
      amount = 1;
    }
    setQuantity(amount);
  }

  async function handleDelete(dailyFoodId: number) {
    try {
      await dailyFoodService.deleteDailyFood(dailyFoodId);
      setDailyFoods(
        dailyFoods.filter((dailyFood) => dailyFood.id !== dailyFoodId),
      );
    } catch (err) {
      toast.error(err.message);
    }
  }

  function goToNextDate() {
    setDate(addDays(date, 1));
  }

  function goToPreviousDate() {
    setDate(subDays(date, 1));
  }

  function getDayText(): string {
    if (isToday(date)) {
      return 'Hoje';
    }
    if (isYesterday(date)) {
      return 'Ontem';
    }
    if (isTomorrow(date)) {
      return 'Amanhã';
    }
    return format(date, 'dd/MM');
  }

  function calcTotalCalories(dailyFoodList: DailyFoodDto[]) {
    return dailyFoodList.reduce((total, dailyFood) => {
      return total + dailyFood.food.calories * dailyFood.amount;
    }, 0);
  }
  function calcTotalCarbo(dailyFoodList: DailyFoodDto[]) {
    return dailyFoodList.reduce((total, dailyFood) => {
      return total + dailyFood.food.carbo * dailyFood.amount;
    }, 0);
  }
  function calcTotalProtein(dailyFoodList: DailyFoodDto[]) {
    return dailyFoodList.reduce((total, dailyFood) => {
      return total + dailyFood.food.protein * dailyFood.amount;
    }, 0);
  }
  function calcTotalFat(dailyFoodList: DailyFoodDto[]) {
    return dailyFoodList.reduce((total, dailyFood) => {
      return total + dailyFood.food.fat * dailyFood.amount;
    }, 0);
  }

  return (
    <section id="daily">
      <header>
        <button type="button" onClick={goToPreviousDate}>
          <FaChevronLeft />
        </button>
        <h4>{getDayText()}</h4>
        <button type="button" onClick={goToNextDate}>
          <FaChevronRight />
        </button>
      </header>

      <div className="resume">
        <div className="macros">
          <div className="red">
            <p>Carboidratos</p>
            <b>
              {calcTotalCarbo(dailyFoods)}/{carbs} g
            </b>
          </div>
          <div className="blue">
            <p>Proteína</p>
            <b>
              {calcTotalProtein(dailyFoods)}/{proteins} g
            </b>
          </div>
          <div className="yellow">
            <p>Gordura</p>
            <b>
              {calcTotalFat(dailyFoods)}/{fat} g
            </b>
          </div>
        </div>
        <div className="progress blue">
          <ProgressLinear
            current={calcTotalCalories(dailyFoods)}
            total={calories}
          />
        </div>
      </div>

      <header className="period">
        <button
          type="button"
          onClick={() => handleFoodAddButtonClick('breakfast')}
        >
          <FaPlusCircle />
        </button>
        <span>Café da manhã</span>
        <b>
          {calcTotalCalories(breakfast)}
          kcal
        </b>
      </header>
      <div className="entry">
        <FoodList dailyFoods={breakfast} handleDelete={handleDelete} />
      </div>

      <header className="period">
        <button type="button" onClick={() => handleFoodAddButtonClick('lunch')}>
          <FaPlusCircle />
        </button>
        <span>Almoço</span>
        <b>
          {calcTotalCalories(lunch)}
          kcal
        </b>
      </header>
      <div className="entry">
        <FoodList dailyFoods={lunch} handleDelete={handleDelete} />
      </div>

      <header className="period">
        <button
          type="button"
          onClick={() => handleFoodAddButtonClick('dinner')}
        >
          <FaPlusCircle />
        </button>
        <span>Janta</span>
        <b>
          {calcTotalCalories(dinner)}
          kcal
        </b>
      </header>
      <div className="entry">
        <FoodList dailyFoods={dinner} handleDelete={handleDelete} />
      </div>

      <header className="period">
        <button
          type="button"
          onClick={() => handleFoodAddButtonClick('snacks')}
        >
          <FaPlusCircle />
        </button>
        <span>Lanches</span>
        <b>
          {calcTotalCalories(snacks)}
          kcal
        </b>
      </header>
      <div className="entry">
        <FoodList dailyFoods={snacks} handleDelete={handleDelete} />
      </div>

      {isModalOpen && (
        <Modal title="Adicionar Alimento" handleClose={handleFoodModalClose}>
          <Link to="/foods">
            <FaPlusCircle className="icon" />
          </Link>
          <section className="content">
            <div className="food-list">
              {userFoodList.map((food) => (
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
              <button
                type="button"
                className="add"
                disabled={!selectedFood}
                onClick={addSelectedFoodToDailyFoods}
              >
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
