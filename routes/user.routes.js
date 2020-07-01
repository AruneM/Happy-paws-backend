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
});

//favorite route
router.get('/user/favorite', isLoggedInAdopter, (req, res) => {
  
  UserModel.findById(req.session.loggednInAdopt._id)
  .populate('likedDogs')
  .then((items) => {
    const user = req.session.loggednInAdopt;

    let sortedItems = items.likedDogs.reduce((collection, object) => {
      let itemType = object.itemType[0].toUpperCase() + object.itemType.substring(1) + 's';
      if(collection[itemType]) {collection[itemType].push(object);}
      else {
        collection[itemType] = [];
        collection[itemType].push(object);
      }
      return collection;
    }, {});

    res.status(200).json(items)
    res.render('users/profile.hbs', {sortedItems, user});
  })
  .catch((err) => {
    res.status(500).json({
        error: 'Something went wrong',
        message: err
   })      });
});

//adding to favorites
router.post('/user/favorite/:itemId/add', isLoggedInAdopter, (req, res, next) => {

    const userId = req.session.loggednInAdopt._id;
    const itemId = req.params.itemId;
    UserModel.findOneAndUpdate({_id: userId}, {$push: {likedDogs: [{_id: itemId}]}})
      .then((animals) => {
        res.status(200).json(animals)
      })
      .catch((err) => {
        console.log('failed to add user to item owners');
        res.status(500).json({
            error: 'Something went wrong',
            message: err
       })
      });
});
  
  //deleting things from favorites
router.delete('/user/favorite/:itemId/delete', isLoggedInAdopter, (req, res, next) => {
    const userId = req.session.loggednInAdopt._id;
    UserModel.updateOne({_id: userId}, {$pullAll: {likedDogs: [{_id: req.params.itemId}]}})
      .then((response) => {
        console.log('deleted');
        res.status(200).json(response)
      })
      .catch((err) => {
        console.log('failed to remove object');
        res.status(500).json({
            error: 'Something went wrong',
            message: err
       })
      });
});

module.exports = router;