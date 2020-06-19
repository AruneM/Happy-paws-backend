const express = require('express')
const router = express.Router()

let TodoModel = require('../models/Todo.model')

router.get('/todos', (req, res) => {
     TodoModel.find()
          .then((todos) => {
               res.status(200).json(todos)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })         
})

router.post('/create', (req, res) => {  
    const {name, description, completed} = req.body;
    TodoModel.create({name: name, description: description, completed: completed})
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

router.get('/todos/:myId', (req, res) => {
    TodoModel.findById(req.params.myId)
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

router.delete('/todos/:id/delete', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id)
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

router.patch('/todos/:id/edit', (req, res) => {
    let id = req.params.id
    const {name, description, completed} = req.body;
    TodoModel.findByIdAndUpdate(id, {$set: {name: name, description: description, completed: completed}})
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