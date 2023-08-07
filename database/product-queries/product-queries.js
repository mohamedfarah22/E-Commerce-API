const Pool = require('pg').Pool;

const pool = new Pool({
    user:"admin",
    host: "172.17.0.2",
    database: "ecommercedatabase",
    password: 'ecommdb',
    port: 5432
});

// get all products

const getProducts = (req, res) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if(error){
            throw(error)
        }
        res.status(200).json(results.rows)
    })
}

//get product by id

const getProductById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM products WHERE id=$1', [id], (error, results) => {
        if(error){
            throw(error)
        }
        res.status(200).json(results.rows)
    })
}

//get products by category

const getProductsByCategory  = (req, res) => {
    const category = req.query.category

    pool.query('SELECT * FROM products WHERE category= $1', [category], (error, results) => {
        if(error){
            throw(error)

        }
        res.status(200).json(results.rows)
    })
}

module.exports ={
    getProducts,
    getProductById,
    getProductsByCategory,
}