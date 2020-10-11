import express from 'express';

//Chamando Modelos Mongo
import UserModel from '../model/UserModel.js';

//Definindo variavel do router
const userRouter = express.Router();

//Definindo rota raiz de users
userRouter.get('/', (req, res) => {
  res.status(200).send('Rota Raiz de User');
});

export default userRouter;
