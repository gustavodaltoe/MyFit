import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Base from '../../components/Base';

function Register() {
  const history = useHistory();

  return (
    <Base>
      <form id="register">
        <fieldset>
          <legend>Cadastre-se</legend>
          <Input name="email" label="Email" />
          <Input name="password" type="password" label="Senha" />
          <Input
            name="passwordConfirmation"
            type="password"
            label="Confirme a senha"
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
