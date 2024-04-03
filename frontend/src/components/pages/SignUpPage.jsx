import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpForm } from '../forms';
import { ToastContext } from '../toastify.jsx';
import * as actions from '../../store/user';

const SignUpPage = () => {
  const { t } = useTranslation();

  const { notify } = useContext(ToastContext);

  const [status, setStatus] = useState('pending');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSignUp = (data, { resetForm }) => {
    setStatus('sending');

    dispatch(actions.signup(data)).then(({ error }) => {
      setStatus('pending');

      if (error) {
        setStatus('error');
        notify('error', t('toastify.error-sign-up'));
        return;
      }

      resetForm();
      navigate('/');
    });
  };

  return (
    <>
      <h2>{t('signup.title')}</h2>
      <SignUpForm status={status} onSubmit={onSignUp} />
    </>
  );
};

export default SignUpPage;
