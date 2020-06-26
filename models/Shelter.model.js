const mongoose = require('mongoose');

let ShelterSchema = new mongoose.Schema({
    shelter_name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    phone: {type: String, required: true},
    location:{type: String, required: true}, 
    description: {type: String, required: true},
    url: {type: String, required: true},
  })

let ShelterModel = mongoose.model('shelter', ShelterSchema)

module.exports = ShelterModel;