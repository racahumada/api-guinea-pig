import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const photoProfileSchema = new Schema({
  name: { type: String, required: true },
  pdiId: {
    type: String,
    required: true,
  },
});

const PhotoProfileModel = model(
  'PhotoProfileModel',
  photoProfileSchema,
  'photo_profiles'
);

export default PhotoProfileModel;
