import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Base from '../../components/Base';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const { login } = useAuth();
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = async ({ email, password }: Inputs) => {
    try {
      await login(email, password);
    } catch (err) {
      console.error(err.response.data || err.message);
      const isUnauthorized = err.response.status === 401;
      if (isUnauthorized) {
        toast.error('🔒 email ou senha incorretos.');
      } else {
        toast.error('Ocorreu um erro, tente novamente mais tarde.');
      }
    }
  };

  const history = useHistory();

  return (
    <Base>
      <form id="login" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Acessar</legend>
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
          <button type="submit" className="btn-green">
            Acessar
          </button>
          <button
            type="button"
            className="switch-form"
            onClick={() => history.push('/register')}
          >
            Não sou cadastrado
          </button>
        </fieldset>
      </form>
    </Base>
  );
}

export default Login;
