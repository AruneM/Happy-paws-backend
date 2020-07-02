const mongoose = require('mongoose');

let PetSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    breed: {type: String, required: true},
    color: {type: String, required: true}, 
    age: {type: String, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    hair_length: {type: String, required: true},
    available_housing: {type: String, required: true},
    good_with: {type: String, required: true},
    bad_with: {type: String, required: true},
    needs_time: {type: String, required: true},
    image: {type: String},
    description: {type: String, required: true},
    funfact: {type: String},
    location: {type: String, required: true},
    contact: {type: String}
  })

let PetModel = mongoose.model('pet', PetSchema)

module.exports = PetModel;