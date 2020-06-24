const mongoose = require('mongoose');

let TransactionSchema = new mongoose.Schema( {
    shelter: [{
       type: mongoose.Schema.Types.ObjectId, ref: 'Shelter'
     }],
        pets: [{
       type: mongoose.Schema.Types.ObjectId, ref: 'Pets'
     }],
        user: [{
       type: mongoose.Schema.Types.ObjectId, ref: 'User'
     }],
})

let TransactionModel = mongoose.model('trasaction', TransactionSchema)

module.exports = TransactionModel ;