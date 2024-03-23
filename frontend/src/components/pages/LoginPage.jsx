import { useTranslation } from 'react-i18next';
import { LoginForm } from '../forms';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('login.title')}</h2>
      <LoginForm />
    </>
  );
};

export default LoginPage;
