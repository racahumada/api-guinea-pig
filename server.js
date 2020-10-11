import express from 'express';
import userRouter from './route/user.js';
import db from './config/db.js'; //Importando conexão

db(); //Executando conexão com Mongo

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
