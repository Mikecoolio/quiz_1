const express = require('express');
const knex = require('../db/client');

const router = express.Router()

router.get('/sign_in', (request, response) => {
    // response.send("<h1>Hello World</h1>")
    response.render('/sign_in')
})

module.exports = router;