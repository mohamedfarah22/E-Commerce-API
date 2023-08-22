const Pool = require('pg').Pool;

const pool = new Pool({
    user:"admin",
    password: "ecommdb",
    host: "ecomm-database-postgres",
    database: "ecommercedatabase",
    port: 5432
});

const getAllCarts = (req, res) => {
    pool.query('SELECT * FROM carts ORDER BY id ASC', (error, results) => {
        if(error){
            throw(error)
        }
        res.status(200).json(results.rows)
    })
}

module.exports ={
    getAllCarts
}