const express = require('express')
const router = express.Router()

let TodoModel = require('../models/Todo.model')

router.get('/', (req, res) => {
    res.render('landing.hbs')
})

router.get('/all-todos', (req, res) => {
    
    TodoModel.find()
       .then((todos) => {
            console.log(todos)
            res.render('all-todos.hbs', {todos})
       })
       .catch(() => {
            res.send('Something went wrong')
       })

})

router.get('/create', (req, res) => {
    res.render('create.hbs')
})

router.post('/create', (req, res) => {  
    const {name, description} = req.body;

    TodoModel.create({name: name, description: description})
        .then((response) => {
            res.render('create.hbs', {showSuccessMessage: true})
        })
        .catch(() => {
            res.render('create.hbs', {showFailureMessage: true})
        })
})



router.get('/todo/:myId', (req, res) => {

    TodoModel.findById(req.params.myId)
      .then((todo) => {
        res.render('todo.hbs', {todo})
      })
      .catch(() => {
        res.send('Something went wrong')
      })
})



router.get('/todo/:id/delete', (req, res) => {

    TodoModel.findByIdAndDelete(req.params.id)
       .then(() => {
            res.redirect('/all-todos')
       })
       .catch(() => {
            res.send('Something went wrong')
       })

})


router.get('/todo/:id/edit', (req, res) => {

    TodoModel.findById(req.params.id)
       .then((todo) => {
            res.render('edit.hbs', {todo} )
       })
       .catch(() => {
            res.send('Something went wrong')
       })

})

router.post('/todo/:id/edit', (req, res) => {
    let id = req.params.id
    const {name, description} = req.body;
    TodoModel.findByIdAndUpdate(id, {$set: {name: name, description: description}})
       .then(() => {
            res.redirect('/all-todos')
       })
       .catch(() => {
            res.send('Something went wrong')
       })

})



module.exports = router;