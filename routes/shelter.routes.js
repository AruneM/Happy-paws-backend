const express = require('express')
const router = express.Router()

let PetModel = require('../models/Pet.model')
const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn

router.get('/shelter/animals', (req, res) => {
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

router.post('/create', (req, res) => {
    const {name, breed, color, age, height, weight, image, description, funfact, location, hair_length, available_housing, good_with, bad_with, needs_time} = req.body;
    console.log(req.body)
    PetModel.create({name: name, description: description, breed: breed, color: color, age: age, height: height, weight: weight, hair_length: hair_length, available_housing: available_housing, good_with: good_with, bad_with: bad_with, needs_time: needs_time, image: image, funfact: funfact, location: location})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

router.get('/shelter/animal/:myId', isLoggedIn, (req, res) => {
    PetModel.findById(req.params.myId)
     .then((response) => {
          res.status(200).json(response)
     })
     .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
     }) 
})

router.delete('/shelter/animal/:id', isLoggedIn, (req, res) => {
    PetModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

router.patch('/shelter/animal/:id', isLoggedIn, (req, res) => {
    let id = req.params.id
    const {name, breed, color, age, height, weight,hair_length, available_housing, good_with, bad_with, needs_time, image, description, funfact, location} = req.body;
    PetModel.findByIdAndUpdate(id, {$set: {name: name, description: description, breed: breed, color: color, age: age, height: height, hair_length: hair_length, available_housing: available_housing, good_with: good_with, bad_with: bad_with, needs_time: needs_time, image: image, funfact: funfact, location: location, weight: weight, image: image, funfact: funfact, location: location}})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               console.log(err)
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

module.exports = router;