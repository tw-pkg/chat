import { Server } from 'socket.io';
import { getRecord, registerListeners } from './chat.js'

const cors = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

export default (server) => {
  const io = new Server(server, cors);
  const chatIo = io.of('/global-chat');

  chatIo.on('connection', (socket) => {
    getRecord().then(record => socket.emit('init', record));
    registerListeners(chatIo, socket);
  });
}