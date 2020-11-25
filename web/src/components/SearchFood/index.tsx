import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import FoodDto from '../../dtos/FoodDto';
import foodService from '../../services/foodService';
import FoodItem from '../FoodItem';
import Input from '../Input';

import './styles.scss';

interface IProps {
  handleBackClick(): void;
}

interface Inputs {
  search: string;
}

const SearchFood: React.FC<IProps> = ({ handleBackClick }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [foods, setFoods] = useState<FoodDto[]>([]);
  const [search, setSearch] = useState<string>();
  const [selectedFood, setSelectedFood] = useState<FoodDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const foodSearch = await foodService.search(search);
        setFoods(foodSearch);
      } catch (err) {
        console.error(err);
        toast.error('Falha ao buscar alimentos.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [search]);

  function onSubmit(inputs: Inputs) {
    setSearch(inputs.search);
  }

  async function addFood(): Promise<void> {
    try {
      if (!selectedFood || !selectedFood.id) {
        return;
      }

      await foodService.addFoodToUser(selectedFood.id);
      toast.dark('Alimento adicionado na sua lista.');

      history.push('/principal');
    } catch (err) {
      console.error(err);
      toast.error('Falha ao tentar adicionar o alimento.');
    }
  }

  return (
    <>
      <section id="search-food">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="search" ref={register()} />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <div className={`results ${isLoading ? 'loading' : ''}`}>
          {isLoading ? (
            <FaSpinner size={60} className="icon-spin" />
          ) : (
            <>
              {foods.map((food) => (
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
            </>
          )}
        </div>
      </section>

      <footer className="search-food-footer">
        <button type="button" className="btn-back" onClick={handleBackClick}>
          Voltar
        </button>
        <button
          type="button"
          className="btn-green"
          onClick={addFood}
          disabled={!selectedFood}
        >
          Adicionar
        </button>
      </footer>
    </>
  );
};

export default SearchFood;
