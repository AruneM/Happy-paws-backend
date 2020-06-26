const express = require('express')
const router = express.Router()

//we installed bcrypt.js
const bcrypt = require('bcryptjs');

const ShelterModel = require('../models/Shelter.model');

const UserModel = require('../models/User.model');

const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn

//AUTH ROUTES FOR SHELTER
router.post('/shelter/signup', (req, res) => {
    const {full_name, email, password, shelter_name, location, description, url} = req.body;
    // console.log(username, email, password);
    
    // if any field is left empty
    if (!full_name || !email || !password || !shelter_name || !location || !description || !url) {
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
            ShelterModel.create({full_name, email, shelter_name, location, description, url, passwordHash})
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
//router.post('/user/application', (req, res) => {
  //const {fullName, email, passwordHash, phone, job, livingPlace, have, availability} = req.body;
  // console.log(username, email, passwordHash);
  
//   // if any field is left empty
//   if (!fullName || !email || !passwordHash || !phone || !job || !livingPlace || !have || !availability) {
//       res.status(500)
//         .json({
//           errorMessage: 'Please fill in  all the fields'
//         });
//       return;  
//   }

//   const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
//   if (!myRegex.test(email)) {
//       res.status(500)
//         .json({
//           errorMessage: 'Email format not correct'
//       });
//       return;  
//   }

//   const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
//   if (!myPassRegex.test(passwordHash)) {
//     res.status(500)
//         .json({
//           errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
//         });
//       return;  
//   }

//   bcrypt.genSalt(12)
//     .then((salt) => {
//       console.log('Salt: ', salt);
//       bcrypt.hash(password, salt)
//         .then((passwordHash) => {
//           User.model.create({fullname, email, passwordHash, phone, job, livingPlace, have, availability })
//             .then((user) => {
//               user.passwordHash = "***";
//               req.session.loggedInUser = user;
//               console.log(req.session)
//               res.status(200).json(user);
//             })
//             .catch((err) => {
//               if (err.code === 11000) {
//                 res.status(500)
//                 .json({
//                   errorMessage: 'name or email entered already exists!'
//                 });
//                 return;  
//               } 
//               else {
//                 res.status(500)
//                 .json({
//                   errorMessage: 'Something went wrong! Go to sleep!'
//                 });
//                 return; 
//               }
//             })
//         });  
// });

// });
 
router.post('/signin', (req, res) => {
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
                    res.status(500).json({
                        error: 'Passwords don\'t match',
                    })
                  return; 
                }
            })
            .catch(() => {
                res.status(500).json({
                    error: 'Email format not correct',
                })
              return; 
            });
      })
      //throw an error if the user does not exists 
      .catch((err) => {
        res.status(500).json({
            error: 'Email format not correct',
            message: err
        })
        return;  
      });
  
});
 
router.post('/logout', (req, res) => {
    req.session.destroy();
    res
    .status(204) //  No Content
    .send();
})

router.get("/user", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

  module.exports = router;