import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Base from '../../components/Base';

import './styles.scss';
import Select from '../../components/Select';

const genders = [
  {
    label: 'Masculino',
    value: 'M',
  },
  {
    label: 'Feminino',
    value: 'F',
  },
];

const activities = [
  {
    label: 'Pouco exercício ou nenhum',
    value: 'low',
  },
  {
    label: '1 a 3 vezes por semana',
    value: 'moderate',
  },
  {
    label: '3 a 5 vezes na semana',
    value: 'high',
  },
  {
    label: '6 a 7 vezes por semana',
    value: 'very_high',
  },
  {
    label: '2 horas ou mais por dia',
    value: 'hyperactive',
  },
];

const objectives = [
  {
    label: 'Perder peso',
    value: 'weight_loss',
  },
  {
    label: 'Perder peso lentamente',
    value: 'weight_loss_slow',
  },
  {
    label: 'Manter o peso',
    value: 'weight_keep',
  },
  {
    label: 'Aumentar o peso lentamente',
    value: 'weight_gain_slow',
  },
  {
    label: 'Aumentar peso',
    value: 'weight_gain',
  },
];

type Inputs = {
  name: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  activity: string;
  objective: string;
};

function Profile() {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <Base>
      <form id="profile" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Precisamos só de mais algumas informações</legend>
          <Input
            name="name"
            label="Nome"
            ref={register({ required: true })}
            className={errors.name ? 'error' : ''}
          />

          <div className="input-group">
            <Input
              name="height"
              label="Altura (cm)"
              type="number"
              ref={register({ required: true })}
              className={errors.height ? 'error' : ''}
            />
            <Input
              name="weight"
              label="Peso (kg)"
              type="number"
              ref={register({ required: true })}
              className={errors.weight ? 'error' : ''}
            />
          </div>

          <div className="input-group">
            <Select
              name="gender"
              label="Gênero"
              options={genders}
              ref={register({ required: true })}
              className={errors.gender ? 'error' : ''}
            />
            <Select
              name="activity"
              label="Atividade"
              options={activities}
              ref={register({ required: true })}
              className={errors.activity ? 'error' : ''}
            />
          </div>

          <div className="input-group">
            <Input
              name="age"
              label="Idade"
              type="number"
              ref={register({ required: true })}
              className={errors.age ? 'error' : ''}
            />
            <Select
              name="objective"
              label="Objetivo"
              options={objectives}
              ref={register({ required: true })}
              className={errors.objective ? 'error' : ''}
            />
          </div>

          <button type="submit" className="btn-green">
            Finalizar
          </button>
        </fieldset>
      </form>
    </Base>
  );
}

export default Profile;
