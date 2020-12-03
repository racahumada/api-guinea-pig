import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const pdiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  pelage: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

const PdiModel = model('PdiModel', pdiSchema, 'pigs');

export default PdiModel;
