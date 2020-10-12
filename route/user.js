import express from 'express';

import UserModel from '../model/UserModel.js'; //Chamando Modelos Mongo
import * as jwt from '../config/jwt.js'; //Chamando funções de verificação e criação de token

//Definindo variavel do router
const userRouter = express.Router();

// //Definindo rota raiz de users
// userRouter.get('/', (req, res) => {
//   res.status(200).send('Rota Raiz de User');
// });

//Rota para registrar user
userRouter.post('/signup', async (req, res) => {
  try {
    if (!req.body) {
      throw 'Erro ao carregar dados do formulário';
    }
    //Inserindo dados na DB
    const result = await UserModel.create(req.body);
    const { password, ...user } = result.toObject();
    const token = jwt.sign({ userId: user.id });
    res.status(200).send({
      message: 'Cadastro realizado com sucesso',
      data: user,
      token: token,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default userRouter;
