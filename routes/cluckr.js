const express = require('express');
const knex = require('../db/client');

const router = express.Router()

// These 2 methods aren't working unfortunately

router.post('/new_cluck', (req, res) => {
    knex('clucks')
    .insert({
        username: req.body.username,
        image_url: req.body.image_url,
        content: req.body.content,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    })
    .returning('*')
    .then( (cluck) => {
        console.log("cluck should be posted:", cluck)
        res.redirect('/clucks')
    })
})

router.get('/clucks', (req, res) => {
    knex('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks => {
        res.redirect('/clucks', {clucks: clucks})
    })
})

module.exports = router;