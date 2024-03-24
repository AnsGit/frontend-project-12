import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginForm } from '../forms';
import * as actions from '../../store/user';

const LoginPage = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onLogin = (data) => dispatch(actions.login(data));

  useEffect(() => {
    if (!user.token) return;

    navigate('/');
  // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <h2>{t('login.title')}</h2>
      <LoginForm status={user.login.status} onSubmit={onLogin} />
    </>
  );
};

export default LoginPage;
