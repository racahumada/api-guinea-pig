import mongoose from 'mongoose';
import crypto from 'crypto';

//Descontruindo mongoose
const { Schema, model } = mongoose;

//Construindo Schema para mapear coleção de Users
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, //Não pode haver email igual
    required: true,
    lowercase: true, //Tudo minusculo
    trim: true, //Remoção de espaços em branco
  },
  password: {
    type: String,
    required: true,
    select: false,
    //Vai pegar o valor cadastrado de senha e criptografar em md5
    set: (value) => crypto.createHash('md5').update(value).digest('hex'),
  },
});

const UserModel = model('UserModel', userSchema, 'users');

export default UserModel;
