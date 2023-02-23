const mysql = require('mysql2')

class DatabaseService {
    constructor() {
        this._conn = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'muralis_node',
        })
    }

    getConnection() {
        this._conn.connect((err) => {
            if(err) {
                console.log(`Error connecting: ${err.stack}`)
                return;
            }

            console.log('Connected')
        });
        
        return this._conn
    }
}

module.exports = DatabaseService;