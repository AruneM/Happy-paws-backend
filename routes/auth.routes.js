const express = require('express')
const router = express.Router()

//we installed bcrypt.js
const bcrypt = require('bcryptjs');

const ShelterModel = require('../models/Shelter.model');

const UserModel = require('../models/User.model');

const { isLoggedIn, isLoggedInAdopter } = require('../helpers/auth-helper'); // to check if user is loggedIn

//AUTH ROUTES FOR SHELTER
router.post('/shelter/signup', (req, res) => {
  const {shelter_name, email, password, phone, location, description, url} = req.body;
  // console.log(shelter_name, email, password);
  
  // if any field is left empty
  if (!shelter_name || !email || !password || !phone || !location || !description || !url) {
      res.status(500)
        .json({
          errorMessage: 'Please enter full name, email and password'
        });
      return;  
  }

  const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
  if (!myRegex.test(email)) {
      res.status(500)
        .json({
          errorMessage: 'Email format not correct'
      });
      return;  
  }

  const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
  if (!myPassRegex.test(password)) {
    res.status(500)
        .json({
          errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
        });
      return;  
  }

  bcrypt.genSalt(12)
    .then((salt) => {
      console.log('Salt: ', salt);
      bcrypt.hash(password, salt)
        .then((passwordHash) => {
          ShelterModel.create({shelter_name, email, phone, location, description, url, passwordHash})
            .then((user) => {
              user.passwordHash = "***";
              req.session.loggedInUser = user;
              console.log(req.session)
              res.status(200).json(user);
            })
            .catch((err) => {
              if (err.code === 11000) {
                res.status(500)
                .json({
                  errorMessage: 'name or email entered already exists!'
                });
                return;  
              } 
              else {
                res.status(500)
                .json({
                  errorMessage: 'Something went wrong! Go to sleep!'
                });
                return; 
              }
            })
        });  
});

});


//AUTH ROUTER FOR USER
router.post('/user/application', (req, res) => {
  const {fullName, email, password, phone, location, job, livingPlace, otherowned, availability} = req.body;
  console.log(fullName, email, password);
  
  // if any field is left empty
  if (!fullName || !email || !password || !phone || !location || !job || !livingPlace || !otherowned || !availability) {
      res.status(500)
        .json({
          errorMessage: 'Please fill in  all the fields'
        });
      return;  
  }

  const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
  if (!myRegex.test(email)) {
      res.status(500)
        .json({
          errorMessage: 'Email format not correct'
      });
      return;  
  }

  const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
  if (!myPassRegex.test(password)) {
    res.status(500)
        .json({
          errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
        });
      return;  
  }

  bcrypt.genSalt(12)
    .then((salt) => {
      console.log('Salt: ', salt);
      bcrypt.hash(password, salt)
        .then((passwordHash) => {
          UserModel.create({fullName, email, passwordHash, phone, location, job, livingPlace, otherowned, availability })
            .then((adopter) => {
              adopter.passwordHash = "***";
              req.session.loggedInUser = adopter;
              console.log(req.session)
              res.status(200).json(adopter);
            })
            .catch((err) => {
              console.log(err)
              if (err.code === 11000) {
                res.status(500)
                .json({
                  errorMessage: 'name or email entered already exists!'
                });
                return;  
              } 
              else {
                res.status(500)
                .json({
                  errorMessage: 'Something went wrong! Go to sleep!'
                });
                return; 
              }
            })
        });  
});

});
// signin user//
router.post('/user/signup', (req, res) => {
  const { email, password } = req.body;
  // console.log(password, '-----------')
  if (!email || !password) {
    res.status(500).json({
      error: 'Please enter username, email and password',
    })
    return;
  }
  const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
  if (!myRegex.test(email)) {
    res.status(500).json({
      error: 'Email format not correct',
    })
    return;
  }

  // Find if the user exists in the database 
  UserModel.findOne({ email })
    .then((userData) => {
      //check if passwords match
      bcrypt.compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          //if it matches
          if (doesItMatch) {
            // req.session is the special object that is available to you
            userData.passwordHash = "***";
            req.session.loggedInUser = userData;
            console.log('Signin', req.session)
            res.status(200).json(userData)
          }
          //if passwords do not match
          else {
            console.log('Doesn\'t match')
            res.status(500).json({
              error: 'Passwords don\'t match',
            })
            return;
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({
            error: 'Email format not correct',
          })
          return;
        });
    })
    //throw an error if the user does not exists 
    .catch((err) => {
      console.log(err, '2nd catch')
      res.status(500).json({
        error: 'Email format not correct',
        message: err
      })
      return;
    });

});




 
router.post('/shelter/signin', (req, res) => {
    const {email, password } = req.body;
    if ( !email || !password) {
        res.status(500).json({
            error: 'Please enter name, email and password',
       })
      return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500).json({
            error: 'Email format not correct',
        })
        return;  
    }
  
    // Find if the user exists in the database 
    ShelterModel.findOne({email})
      .then((userData) => {
           //check if passwords match
          bcrypt.compare(password, userData.passwordHash)
            .then((doesItMatch) => {
                //if it matches
                if (doesItMatch) {
                  // req.session is the special object that is available to you
                  user.passwordHash = "***";
                  req.session.loggedInUser = userData;
                  console.log('Signin', req.session)
                  res.status(200).json(userData)
                }
                //if passwords do not match
                else {
                    res.status(502).json({
                        error: 'Passwords don\'t match',
                    })
                  return; 
                }
            })
            .catch(() => {
                res.status(502).json({
                    error: 'Email format not correct',
                })
              return; 
            });
      })
      //throw an error if the user does not exists 
      .catch((err) => {
        res.status(501).json({
            error: 'Email format not correct',
            message: err
        })
        return;  
      });
  
});
 
router.post('/shelter/logout', (req, res) => {
    req.session.destroy();
    res
    .status(204) //  No Content
    .send();
})
router.post('/user/logout', (req, res) => {
  req.session.destroy();
  res
  .status(204) //  No Content
  .send();
})

router.get("/user", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

router.get("/adopter", isLoggedInAdopter, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

  module.exports = router;