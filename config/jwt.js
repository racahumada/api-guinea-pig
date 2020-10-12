import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

//Função para gerar token com tempo de 24h
export const sign = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: 86400 });
};

//Função para verificar token
export const verify = (token) => {
  return jwt.verify(token, SECRET);
};
