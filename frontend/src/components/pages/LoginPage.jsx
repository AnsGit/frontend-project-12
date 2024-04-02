import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginForm } from '../forms';
import * as actions from '../../store/user';

const LoginPage = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState('pending');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onLogin = (data, { resetForm }) => {
    setStatus('sending');

    dispatch(actions.login(data)).then(({ error }) => {
      setStatus('pending');

      if (error) {
        setStatus('error');
        return;
      }

      resetForm();
      navigate('/');
    });
  };

  return (
    <>
      <h2>{t('login.title')}</h2>
      <LoginForm status={status} onSubmit={onLogin} />
    </>
  );
};

export default LoginPage;
