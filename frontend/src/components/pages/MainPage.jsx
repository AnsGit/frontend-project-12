import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <h1 className="pb-2 pt-2 bg-body-secondary">
        <a
          href="/"
          className="link-dark text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            navigate(e.target.pathname);
          }}
        >
          {t('header.title')}
        </a>
      </h1>

      <div className="mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
