import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaSyncAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Base from '../../components/Base';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

import './styles.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Confirmation() {
  const { user, refresh } = useAuth();
  const { handleSubmit } = useForm();
  const query = useQuery();

  const onSubmit = async () => {
    try {
      await authService.resendConfirmationEmail(user.info.email);
      toast.success('✔ Email reenviado com sucesso!');
    } catch (err) {
      if (err.response.data.message === 'LOGIN.EMAIL_SENT_RECENTLY') {
        toast.error(
          'Email enviado recentemente, aguarde para tentar novamente',
        );
      } else {
        toast.error('Tente novamente mais tarde');
      }
    }
  };

  useEffect(() => {
    const token = query.get('token');
    if (token) {
      authService
        .verifyEmail(token)
        .then(() => {
          toast.success('✔ Email confirmado com sucesso!');
          refresh();
        })
        .catch((err) => toast.error(`⚠ ${err}`));
    }
  }, [refresh, query]);

  return (
    <Base>
      <div id="confirmation">
        <h1>Aguardando confirmação de cadastro por email.</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit" className="btn-white">
            <FaSyncAlt />
            Reenviar email
          </button>
        </form>
      </div>
    </Base>
  );
}

export default Confirmation;
