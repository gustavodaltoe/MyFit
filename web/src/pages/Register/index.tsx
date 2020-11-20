import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import Base from '../../components/Base';
import authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

type Inputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

function Register() {
  const { login } = useAuth();
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
  const history = useHistory();

  const onSubmit = async ({ email, password }: Inputs) => {
    try {
      await authService.register(email, password);

      toast.success('✔ Usuário cadastrado com sucesso, olhe seu email!');

      login(email, password)
        .catch(() => {
          toast.warning(`⚠ falha ao tentar entrar automaticamente`);
        })
        .finally(() => {
          history.push('/confirmation');
        });
    } catch (err) {
      console.error(err.response.data || err.message);
      const errorMessage =
        err.response.data.message ||
        'Oops, failed to register, try again later.';

      toast.error(`⚠ ${errorMessage}`);
    }
  };

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
