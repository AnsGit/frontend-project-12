import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginForm } from '../forms';
import * as actions from '../../store/user';

const LoginPage = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState('pending');

  const user = useSelector((state) => state.user);
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
    });
  };

  useEffect(() => {
    if (!user.token) return;

    navigate('/');
  // eslint-disable-next-line
  }, [user]);

  if (user.token) return null;

  return (
    <>
      <h2>{t('login.title')}</h2>
      <LoginForm status={status} onSubmit={onLogin} />
    </>
  );
};

export default LoginPage;
