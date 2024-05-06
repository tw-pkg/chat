import express from 'express';
import http from 'http';
import cors from 'cors';
import socket from './socket.js';
import sequelize from '../models/index.js';

const app = express();
app.use(cors());

await sequelize.sync({ alter: true });
const server = http.createServer(app);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`starting ${PORT}`);
  socket(server);
});