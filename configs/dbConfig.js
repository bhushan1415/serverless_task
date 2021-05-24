// DB connection
const Pool = require('pg').Pool
const pool  = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'tatva123',
    port: 5432,
})

module.exports = pool