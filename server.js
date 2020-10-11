import express from 'express';
import userRouter from './route/user.js';

//Iniciando express em server
const server = express();

//Definindo rotas
server.use('/user', userRouter);

//Rota Raiz
server.get('/', (req, res) => {
  res.status(200).send('Seja Bem Vindo à API!');
});

server.listen(3001, () => {
  console.log('Server OK');
});
