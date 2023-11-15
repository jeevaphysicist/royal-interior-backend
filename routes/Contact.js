const express = require('express');
const router = express.Router();
const {RegisterContact} = require('../Controllers/Contact');

router.post('/register-contact',RegisterContact)

module.exports = router ;