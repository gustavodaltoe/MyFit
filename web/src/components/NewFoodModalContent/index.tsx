import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import FoodDto from '../../dtos/FoodDto';
import foodService from '../../services/foodService';
import Input from '../Input';

import './styles.scss';

interface IProps {
  handleBackClick(): void;
}

const NewFoodModalContent: React.FC<IProps> = ({ handleBackClick }) => {
  const history = useHistory();

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(),
        brand: yup.string().required(),
        carbo: yup.number().min(0).required(),
        protein: yup.number().min(0).required(),
        fat: yup.number().min(0).required(),
        calories: yup.number().positive().required(),
        portion: yup.number().positive().required(),
        unitMeasure: yup.string().required(),
      }),
    [],
  );
  const resolver = yupResolver<FoodDto>(validationSchema);
  const { register, handleSubmit, errors } = useForm<FoodDto>({ resolver });

  const onSubmit = useCallback(
    async (data: FoodDto) => {
      try {
        await foodService.createFood(data);
        toast.dark('Alimento adicionado na sua lista.');
        history.push('/principal');
      } catch (err) {
        toast.error(err.message);
      }
    },
    [history],
  );

  return (
    <>
      <section className="content new-food-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <div className="input-group">
              <Input
                name="name"
                label="Nome"
                ref={register({ required: true })}
                className={errors.name ? 'error' : ''}
              />
              <Input
                name="brand"
                label="Marca"
                ref={register({ required: true })}
                className={errors.brand ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <Input
                name="portion"
                label="Por porção de"
                type="number"
                ref={register({ required: true })}
                className={errors.portion ? 'error' : ''}
              />
              <Input
                name="unitMeasure"
                label="Unidade de medida"
                ref={register({ required: true })}
                className={errors.unitMeasure ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <Input
                name="calories"
                label="Calorias (kcal)"
                type="number"
                ref={register({ required: true })}
                className={errors.calories ? 'error' : ''}
              />
              <Input
                name="carbo"
                label="Carboidratos (g)"
                type="number"
                ref={register({ required: true })}
                className={errors.carbo ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <Input
                name="protein"
                label="Proteínas (g)"
                type="number"
                ref={register({ required: true })}
                className={errors.protein ? 'error' : ''}
              />
              <Input
                name="fat"
                label="Gordura (g)"
                type="number"
                ref={register({ required: true })}
                className={errors.fat ? 'error' : ''}
              />
            </div>
          </fieldset>
        </form>
      </section>

      <footer className="new-food-footer">
        <button type="button" className="btn-back" onClick={handleBackClick}>
          Voltar
        </button>
        <button
          type="button"
          className="btn-green"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Cadastrar
        </button>
      </footer>
    </>
  );
};

export default NewFoodModalContent;
