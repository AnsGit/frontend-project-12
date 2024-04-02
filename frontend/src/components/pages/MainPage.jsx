import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { exit } from '../../store/user';

const MainPage = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="pb-2 pt-2 bg-body-secondary d-flex justify-content-center">
        <div className="d-flex justify-content-between" style={{ width: 1024 }}>
          <a
            href="/"
            className="link-dark text-decoration-none fs-1"
            onClick={(e) => {
              e.preventDefault();
              navigate(e.target.pathname);
            }}
          >
            {t('header.title')}
          </a>

          {(user.token) && (
            <Button
              className="btn-primary align-self-center"
              onClick={() => {
                dispatch(exit());
              }}
            >
              {t('exit')}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
