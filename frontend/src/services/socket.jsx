import io from 'socket.io-client';
import { toast } from 'react-toastify';

const socket = io();

const connect = (errText, cb) => {
  socket.on('connect_error', () => toast(errText, { type: 'error' }));
  socket.on('connect_failed', () => toast(errText, { type: 'error' }));
  socket.on('disconnect', () => toast(errText, { type: 'error' }));

  socket.on('connect', cb);
};

export { socket, connect };
