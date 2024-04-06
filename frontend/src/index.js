import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { connect } from './services/socket.jsx';
import resources from './locales';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { ToastProvider } from './components/toastify.jsx';
import RollbarProvider from './services/rollbar.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));

  connect(
    i18n.t('toastify.error-data-synchronization'),
    () => {
      root.render(
        <RollbarProvider>
          <I18nextProvider i18n={i18n}>
            <ToastProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </ToastProvider>
          </I18nextProvider>
        </RollbarProvider>,
      );
    },
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

init();
