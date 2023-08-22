const express = require('express');
const router = express.Router();
const db = require('../queries/cartQueries.js')

//munt get all carts func on cart router
router.get('/', db.getAllCarts)

module.exports = router