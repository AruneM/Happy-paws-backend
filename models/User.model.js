const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
  {
    fullName: {type: String, required: [true, 'Please enter full name'], unique: true},
    email: {type: String, required: [true, 'Please enter email'], unique: true},
    location: {type: String, required: true},
    passwordHash: {type: String, required: true},
    phone : {type: String, required: true, unique: true},
    job: {type: String, required: true},
    livingPlace: {type: String, required: true},
    otherowned: {type: String, required: true},
    availability: {type: Number, required: true},
    likedDogs: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'pet'
    }],
  },
  // {
  //   timestamps: true
  // }
);

let UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;
