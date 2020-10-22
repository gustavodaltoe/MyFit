import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';

import './styles.scss';

type Inputs = {
  name: string;
  brand: string;
  portion: number;
  measureUnit: string;
  calories: number;
  carbo: number;
  protein: number;
  fat: number;
};

interface IProps {
  handleBackClick(): void;
}

const NewFoodModalContent: React.FC<IProps> = ({ handleBackClick }) => {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

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
                name="measureUnit"
                label="Unidade de medida"
                ref={register({ required: true })}
                className={errors.measureUnit ? 'error' : ''}
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
