import express from 'express';
import cors from 'cors';
import userRouter from './route/user.js';
import pdiRouter from './route/pdis.js';
import db from './config/db.js'; //Importando conexão
import morgan from 'morgan';

db(); //Executando conexão com Mongo

//Iniciando express em server
const server = express();
server.use(express.json()); //middleware para recebimento de json
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

//Liberando acesso as funcionalidades da API, para outros dominios diferentes
server.use(cors());

//liberando acesso a informações da pasta public
server.use(express.static('public'));

//Definindo rotas
server.use('/', userRouter);
server.use('/pdi', pdiRouter);

//Rota Raiz
server.get('/', (req, res) => {
  res.status(200).send('Seja Bem Vindo à API!');
});

server.listen(3001, () => {
  console.log('Server OK');
});
