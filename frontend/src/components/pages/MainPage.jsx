import { Outlet } from 'react-router-dom';

const MainPage = () => (
  <>
    <h1 className="pb-2 pt-2 bg-body-secondary">Hexlet chat</h1>

    <div className="mt-3">
      <Outlet />
    </div>
  </>
);

export default MainPage;
