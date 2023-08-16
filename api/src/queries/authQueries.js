const Pool = require('pg').Pool;
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local');
const pool = new Pool({
    user:"admin",
    password: "ecommdb",
    host: "ecomm-database-postgres",
    database: "ecommercedatabase",
    port: 5432
});
//password hashing function
const passwordHash = async (password, saltRounds) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (err) {
      console.log(err);
    }
    return null;
  };


//register a new user

const createUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.query

    //hash password before inserting into database and add 3 salts
    const hashedPassword = await passwordHash(password, 3)

    //insert new user in database with hashed password

    pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, hashedPassword], (error, results) => {
        if(error){
            throw error
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
    
}

//password comparison logic using bcrypt.js
const comparePasswords = async (password, hash) => {
    try {
        const matchFound = await bcrypt.compare(password, hash)
        return matchFound
    } catch (err) {
        console.log(err)
    }

    return false
};
//create local passport strategy

const strategy = new LocalStrategy(function( email, password, done){
    pool.query('SELECT * FROM users WHERE email = $1', [email], async function(err, results){
        if(err){
            return done(err)
        }

        if(results.rows.length === 0){
            return done(null, false, {message: 'Incorrect email or password'})
        }

        const user = results.rows[0]

        const passwordAuthenticated = await comparePasswords(password, user.password)

        if(passwordAuthenticated){
            return done(null, user)
        }
        else{
            return done(null, false, {message: 'Incoreect password. '})
        }

    });

})



module.exports = {
    createUser, 
    strategy
}