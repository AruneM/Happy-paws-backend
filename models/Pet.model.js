const mongoose = require('mongoose');

let PetSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    breed: {type: String, required: true},
    color: {type: String, required: true}, 
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    hair_length: {type: Number, required: true},
    available_housing: {type: Number, required: true},
    good_with: {type: Number, required: true},
    bad_with: {type: Number, required: true},
    needs_time: {type: Number, required: true},
    image: {type: String},
    description: {type: String, required: true},
    funfact: {type: String},
    location: {type: String, required: true},
    organisation: [{
       type: mongoose.Schema.Types.ObjectId, ref: 'shelter'
     }]
  })

let PetModel = mongoose.model('pet', PetSchema)

module.exports = PetModel;