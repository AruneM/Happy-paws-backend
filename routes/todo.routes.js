const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Your main route is working')
})

module.exports = router;