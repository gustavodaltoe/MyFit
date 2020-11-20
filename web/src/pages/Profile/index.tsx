import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../components/Input';
import Base from '../../components/Base';
import Select from '../../components/Select';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import ProfileDto from '../../dtos/ProfileDto';

import './styles.scss';

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

const Profile: React.FC = () => {
  const { setUser } = useAuth();
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(),
        height: yup.number().positive().integer().required(),
        weight: yup.number().positive().integer().required(),
        gender: yup.string().required(),
        physicalActivity: yup.string().required(),
        age: yup.number().positive().integer().required(),
        goal: yup.string().required(),
      }),
    [],
  );
  const resolver = yupResolver<ProfileDto>(validationSchema);
  const { register, handleSubmit, errors } = useForm<ProfileDto>({ resolver });

  const onSubmit = useCallback(
    async (profileData: ProfileDto) => {
      try {
        const userWithProfile = await userService.createProfile(profileData);
        setUser(userWithProfile);

        toast.dark('🎉 Obrigado por se cadastrar :D');
      } catch (err) {
        toast.error(err.message);
      }
    },
    [setUser],
  );

  return (
    <Base>
      <form id="profile" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Precisamos só de mais algumas informações</legend>
          <Input
            name="name"
            label="Nome"
            ref={register}
            className={errors.name ? 'error' : ''}
          />

          <div className="input-group">
            <Input
              name="height"
              label="Altura (cm)"
              type="number"
              ref={register}
              className={errors.height ? 'error' : ''}
            />
            <Input
              name="weight"
              label="Peso (kg)"
              type="number"
              ref={register}
              className={errors.weight ? 'error' : ''}
            />
          </div>

          <div className="input-group">
            <Select
              name="gender"
              label="Gênero"
              options={genders}
              ref={register}
              className={errors.gender ? 'error' : ''}
            />
            <Select
              name="physicalActivity"
              label="Atividade"
              options={activities}
              ref={register}
              className={errors.physicalActivity ? 'error' : ''}
            />
          </div>

          <div className="input-group">
            <Input
              name="age"
              label="Idade"
              type="number"
              ref={register}
              className={errors.age ? 'error' : ''}
            />
            <Select
              name="goal"
              label="Objetivo"
              options={objectives}
              ref={register}
              className={errors.goal ? 'error' : ''}
            />
          </div>

          <button type="submit" className="btn-green">
            Finalizar
          </button>
        </fieldset>
      </form>
    </Base>
  );
};

export default Profile;
