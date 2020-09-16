import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Base from '../../components/Base';

type Inputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

function Register() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  const history = useHistory();

  return (
    <Base>
      <form id="register" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Cadastre-se</legend>
          <Input
            name="email"
            label="Email"
            ref={register({ required: true })}
            className={errors.password ? 'error' : ''}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            ref={register({ required: true })}
            className={errors.password ? 'error' : ''}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            label="Confirme a senha"
            ref={register({
              required: true,
              validate: (value) => value === watch('password'),
            })}
            className={errors.passwordConfirmation ? 'error' : ''}
          />
          <button type="submit" className="btn-green">
            Cadastrar
          </button>
          <button
            type="button"
            className="switch-form"
            onClick={() => history.push('/login')}
          >
            Já sou cadastrado
          </button>
        </fieldset>
      </form>
    </Base>
  );
}

export default Register;
