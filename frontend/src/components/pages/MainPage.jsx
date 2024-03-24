import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation();

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
