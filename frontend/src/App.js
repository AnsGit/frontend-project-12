import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import {
  MainPage,
  LoginPage,
  ChatPage,
  Page404,
} from './components/pages';

import './App.scss';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
