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

router.post('/create', isLoggedIn, (req, res) => {  
    const {name, description, completed} = req.body;
    console.log(req.body)
    PetModel.create({name: name, description: description, completed: completed})
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

router.get('/shelter/animal/:myId', (req, res) => {
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
    const {name, description, completed} = req.body;
    PetModel.findByIdAndUpdate(id, {$set: {name: name, description: description, completed: completed}})
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