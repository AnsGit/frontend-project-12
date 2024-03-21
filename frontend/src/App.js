import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, LoginPage, Page404 } from './components/pages';
import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<h2>Home page</h2>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
