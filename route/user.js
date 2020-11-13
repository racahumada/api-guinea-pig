import express from 'express';

import UserModel from '../model/UserModel.js'; //Chamando Modelos Mongo
import * as jwt from '../config/jwt.js'; //Chamando funções de verificação e criação de token

//Definindo variavel do router
const userRouter = express.Router();

// //Definindo rota raiz de users
// userRouter.get('/', (req, res) => {
//   res.status(200).send('Rota Raiz de User');
// });


//Rota dpara listar usuario *ainda sem autenticação
userRouter.get('/listusers', async (req, res) => {
  try {
    const result = await UserModel.find();
    console.log(result);
    res
      .status(200)
      .send({ message: 'Busca realizada com sucesso.',
              data: result,
            });
  
  } catch (error) {
    res.send(error);
  }
})

//Rota para registrar user
userRouter.post('/signup', async (req, res) => {
  console.log(req.body)
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

userRouter.get('/signin', async (req, res) => {
  try {
    if(!req.headers.authorization) {
      throw 'Erro ao carregar dados do formulário';
    }
    const [_typeHash, hash] = req.headers.authorization.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    const user = await UserModel.find({email: email, password: password});
    const token = jwt.sign({userId: user.id});

    res.status(200).send({
      message: 'Login realizado com sucesso!',
      token: token
    })
  } catch(error) {
    res.send({
      message: 'erro ao logar', 
      erro: error
    })
  }
});

//Rota de autenticação 
// userRouter.get('/auth', (req, res) => {});

export default userRouter;
