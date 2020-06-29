const express = require('express')
const router = express.Router()

let PetModel = require('../models/Pet.model')
let UserModel = require('../models/Shelter.model')
const { isLoggedInAdopter } = require('../helpers/auth-helper'); // to check if user is loggedIn

router.get('/user/pets', isLoggedInAdopter, (req, res) => {
    PetModel.find()
         .then((animals) => {
              res.status(200).json(animals)
         })
         .catch((err) => {
              res.status(500).json({
                   error: 'Something went wrong',
                   message: err
              })
    })         
})

module.exports = router;