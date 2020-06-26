const mongoose = require('mongoose');

let PetSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    breed: {type: String, required: true},
    color: {type: String, required: true}, 
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    hair_length: {enum: ['short', 'medium', 'long']},
    available_housing: {enum: ['house with garden', 'apartment with garden', 'rented apartment', 'rented house', 'owned apartment', 'owned house']},
    good_with: {enum: ['dogs', 'cats', 'children', 'all', 'none']},
    bad_with: {enum: ['dogs', 'cats', 'children', 'all', 'none']},
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