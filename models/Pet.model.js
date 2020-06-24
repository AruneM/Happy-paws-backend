const mongoose = require('mongoose');

let PetSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    breed: {type: String, required: true},
    color: {type: String, required: true}, 
    age: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    funfact: {type: String, required: true},
    location: {type: String, required: true},
    organisation: [{
       type: mongoose.Schema.Types.ObjectId, ref: 'Shelter'
     }]
  })

let PetModel = mongoose.model('pet', PetSchema)

module.exports = PetModel;