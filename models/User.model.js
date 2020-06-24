const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: {type: String, required: [true, 'Please enter full name'], unique: true},
    email: {type: String, required: [true, 'Please enter email'], unique: true},
    location: {type: String, required: true},
    passwordHash: {type: String, required: true},
    phone : {type: String, required: true, unique: true},
    job: {enum: ['full-time', 'part-time', 'no job', 'remote']},
    livingPlace: {enum: ['house with garden', 'apartment with garden', 'rented apartment', 'rented house', 'owned apartment', 'owned house']},
    have: {enum: ['dogs', 'cats', 'children', 'other']},
    availability: {type: Number, required: true},
    favorites: ['ObjectID puppiest'],
  },
  {
    timestamps: true
  }
);
userSchema.index({ 'email': 1}, {unique: true});
userSchema.index({ 'fullName': 1}, {unique: true});
 module.exports = model('User', userSchema);
