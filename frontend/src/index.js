import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import SocketContext from './services/socket.js';
import resources from './locales/index.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <SocketContext.Provider value={io()}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </SocketContext.Provider>,
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

init();
