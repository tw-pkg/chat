import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import socket from './socket.js';
import sequelize from '../models/index.js';

const app = express();
const port = 8080;
app.use(cors());

app.get('/health', (req, res) => {
  res.send("success!")
})

app.post('/github-webhook', (req, res) => {
  console.log('hooked');
  res.status(202).send('Accepted');
})

await sequelize.sync({ alter: true });
const server = createServer(app);

socket(server);

server.listen(port, () => {
  console.log('start chat server');
});