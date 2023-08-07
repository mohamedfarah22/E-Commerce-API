const express = require('express');
const router = express.Router();
const db = require('../../../database/product-queries/product-queries')

//get all products
router.get('/', db.getProducts);

//get products by id

router.get('/:id', db.getProductById)

//get products by category

router.get('/', db.getProductsByCategory)


