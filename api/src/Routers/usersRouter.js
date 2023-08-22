const express = require('express');
const router = express.Router();
const db = require('../queries/userQueries')

router.get('/', db.getUsers)

module.exports = router