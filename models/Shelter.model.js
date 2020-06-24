const mongoose = require('mongoose');

let ShelterSchema = new mongoose.Schema({
    full_name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    shelter_name: {type: String, required: true},
    location:{type: String, required: true}, 
    description: {type: String, required: true},
    url: {tyoe: String, required: true},
  })

let ShelterModel = mongoose.model('shelter', ShelterSchema)

module.exports = ShelterModel;