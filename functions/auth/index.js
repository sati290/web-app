const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello form the auth service! ' + req.url)
})

exports.router = router
