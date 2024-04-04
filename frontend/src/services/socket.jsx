import { createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const handleSocketErrors = (socket, cb = () => {}) => {
  socket.on('connect_error', (error) => cb('connect_error', error));
  socket.on('connect_failed', (error) => cb('connect_failed', error));
  socket.on('disconnect', (error) => cb('disconnect', error));
};

const SocketProvider = (props = {}) => {
  const socket = io();

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider, handleSocketErrors };
