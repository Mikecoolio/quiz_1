const express = require('express');
const knex = require('../db/client');

const router = express.Router()

// Part 4: Create Clucks
// Value: 28%

// Create a form page as shown in the wireframe below.

// Routes related to clucks must be in one file.
// Only allow a user that's signed in to create clucks.
// When submitted, Cluckr should add a new cluck to the database.
// A user should be able to give a link to an image url.
// The cluck should get its `username` field from the `username` in the cookies.
// A successfully submitted cluck redirects the user to the index page.



module.exports = router;