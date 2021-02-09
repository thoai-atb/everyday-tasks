const express = require('express');
const bp = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 5000;

const pool = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'everyday_tasks'
});

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
   
app.get('/tasks', (req, res) => {
    let sql = 'SELECT * FROM tasks';
    pool.getConnection((error, connection) => {
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
            console.log(`Fetched all tasks ...`);
            connection.release();
        });
    });
})

app.get('/task/:id', (req, res) => {
    console.log(`GET request task with id ${req.params.id}`);
    let sql = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
    pool.getConnection((error, connection) => {
        let query = connection.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result[0]);
            connection.release();
        });
    });
})

app.put('/task/:id', (req, res) => {
    let task = req.body;
    console.log(`PUT request with body:`);
    console.log(req.body);

    const sql1 = `DELETE FROM tasks WHERE id = ${req.params.id}`;
    
    pool.getConnection((error, connection) => {
        let query = connection.query(sql1, (err, result) => {
            if(err) {
                console.log("ERROR HERE!");
                return;
            }
            console.log(`Task with id ${req.params.id} deleted ...`);
            connection.release();
        });
    });

    const sql2 = `INSERT INTO tasks SET ?`;
    
    pool.getConnection((error, connection) => {
        // know tasks
        query = connection.query(sql2, task, (err, result) => {
            if(err) {
                console.log("ERROR, task is:");
                console.log(task);
            }
            console.log(`Task with id ${req.params.id} updated ...`);
            connection.release();
        });
    });
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
