import React from 'react';
import Input from '../../components/Input';
import Base from '../../components/Base';

import './styles.scss';

function Questions() {
  return (
    <Base>
      <form id="questions">
        <fieldset>
          <legend>Precisamos só de mais algumas informações</legend>
          <Input name="name" label="Nome" />

          <div className="inline-block">
            <Input name="height" label="Altura (cm)" />
            <Input name="weight" label="Peso (kg)" />
          </div>

          <div className="inline-block">
            <Input name="gender" label="Gênero" />
            <Input name="activity" label="Atividade" />
          </div>

          <div className="inline-block">
            <Input name="age" label="Idade" />
            <Input name="objective" label="Objetivo" />
          </div>

          <button type="submit" className="btn-green">
            Finalizar
          </button>
        </fieldset>
      </form>
    </Base>
  );
}

export default Questions;
