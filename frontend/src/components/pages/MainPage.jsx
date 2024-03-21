import { Outlet } from 'react-router-dom';

const MainPage = () => (
  <>
    <h1>Hexlet chat</h1>

    <div>
      <Outlet />
    </div>
  </>
);

export default MainPage;
