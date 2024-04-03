import { createContext, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

const ToastProvider = (props = {}) => {
  const contextData = useMemo(() => ({
    notify: (newType, text) => {
      toast(text, { type: newType });
    },
  }), []);

  return (
    <ToastContext.Provider value={contextData}>
      {props.children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
