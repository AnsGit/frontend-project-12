import { createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = (props = {}) => (
  <SocketContext.Provider value={io()}>
    {props.children}
  </SocketContext.Provider>
);

export { SocketContext, SocketProvider };
