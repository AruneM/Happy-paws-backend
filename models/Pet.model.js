const mongoose = require('mongoose');

let PetSchema = new mongoose.Schema({
    name: String,
    description: String,
    completed: Boolean,
})

let PetModel = mongoose.model('pet', PetSchema)

module.exports = PetModel;