const express = require('express');
const router = express.Router();
const db = require('../queries/authQueries')

//registration

router.post('/register', db.createUser)




module.exports = router;