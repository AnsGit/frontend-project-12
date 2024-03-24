import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.token) return;

    navigate('/login');
  });

  return (
    <>
      <h1 className="pb-2 pt-2 bg-body-secondary">{t('header.title')}</h1>

      <div className="mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
