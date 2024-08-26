const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Letsdoit!',
    database: 'STOCK'
});

con.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Database connected');
});

module.exports = con;
