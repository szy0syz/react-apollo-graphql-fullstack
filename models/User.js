import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
}, { timestamps: true });

module.exports = model('User', UserSchema);
