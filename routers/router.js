var express = require('express');
var router = express.Router()
var articleRouter = require('./articleService')


router.use((req, res, next) => {
    console.log("Called: ", req.path, " Method: ", req.method)
    next()
})

router.use(articleRouter)
module.exports = router