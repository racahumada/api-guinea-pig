import express from 'express';
import PdiModel from '../model/PdiModel.js';
import PhotoProfileModel from '../model/PhotoProfileModel.js';
import fileUpload from 'express-fileupload';

const pathPdiProfile = './public/pdi_profile/';

const pdiRouter = express.Router();

pdiRouter.use(fileUpload({ createParentPath: true }));

pdiRouter.get('/', (req, res) => {
  res.send('Acessando área PDI');
});

pdiRouter.post('/new', async (req, res) => {
  try {
    if (!req.body) {
      throw 'Dados incompletos.';
    }

    //inserindo dados no
    const result = await PdiModel.create(req.body);

    if (!req.files) {
      throw 'Arquivo de imagem não encontrado';
    }

    const { name, id } = result;
    const { picture } = req.files;
    const [_, ext] = picture.name.split('.');

    //Ajustando nome e salvando arquivo no servidor
    picture.name = `${name.toLowerCase()}-${id}.${ext}`;
    picture.mv(pathPdiProfile + picture.name);

    const resultPhoto = await PhotoProfileModel.create({
      name: picture.name,
      pdiId: id,
    });

    console.log(resultPhoto);

    res.status(200).send({
      message: 'Pdi cadastrado com sucesso',
      dataPdi: {
        ...result._doc,
        picture: picture.name,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default pdiRouter;
