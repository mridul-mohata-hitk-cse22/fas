const mysql=require('mysql');

class MySQL {

    constructor() {
        this.connection=mysql.createConnection({
            host     : 'localhost',
            user     : process.env.SQL_USER,
            password : process.env.SQL_PASSWORD,
            database : process.env.SQL_DATABASE,
            supportBigNumbers : true,
            charset : 'utf8mb4',
        });
    }

    connect() {
        let c=this.connection;
        return new Promise(function(resolve, reject) {
            c.connect((err) => {
                if(err)
                reject(new Error('Connection Error'));
                else
                resolve();
            })
        });
    }

    query(sql, args) {
        let c=this.connection;
        return new Promise(function(resolve, reject) {
            c.query(sql, args, (err, result, fields) => {
                if(err) {
                    console.log(err, sql);
                    reject(new Error('Query Error'));
                }
                else
                resolve([
                    result,
                    fields
                ]);
            });
        });
    }

    beginTransaction() {
        let c=this.connection;
        return new Promise(function(resolve, reject) {
            c.beginTransaction((err) => {
                if(err)
                reject(new Error('Transaction Error'));
                else
                resolve();
            })
        });
    }
      
    commit() {
        let c=this.connection;
        return new Promise(function(resolve, reject) {
            c.commit((err) => {
                if(err)
                reject(new Error('Error'));
                else
                resolve();
            })
        });
    }
      
    rollback() {
        let c=this.connection;
        return new Promise(function(resolve, reject) {
            c.rollback((err) => {
                if(err)
                reject(new Error('Error'));
                else
                resolve();
            })
        });
    }

    close() {
        let c=this.connection;
        return new Promise(function(resolve, reject) {
            c.end((err) => {
                if(err)
                reject(new Error('Error'));
                else
                resolve();
            })
        });
    }
}

module.exports=MySQL;