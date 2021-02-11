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
        if(error) throw error;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
            console.log(`Fetched all tasks ...`);
            connection.release();
        });
    });
})

app.get('/tasks/reset', (req, res) => {
    console.log(req.body);
    res.send();
})

app.put('/tasks', (req, res) => {
    console.log(`PUT request create new task`);
    let sql = `INSERT INTO tasks SET ?`;
    pool.getConnection((error, connection) => {
        if(error) throw error;
        let query = connection.query(sql, req.body, (err, result) => {
            if(err) throw err;
            res.send('PUT success');
            connection.release();
        });
    });
})

app.get('/task/:id', (req, res) => {
    console.log(`GET request task with id ${req.params.id}`);
    let sql = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
    pool.getConnection((error, connection) => {
        if(error) throw error;
        let query = connection.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result[0]);
            connection.release();
        });
    });
})

app.patch('/tasks/reset', (req, res) => {
    console.log(`PATCH request: resetting all tasks unchecked`);
    let sql = `UPDATE tasks SET checked = 0`;
    pool.getConnection((error, connection) => {
        if(error) throw error;
        let query = connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send();
            connection.release();
        });
    });
})

app.patch('/task/:id/toggle', (req, res) => {
    console.log(`PATCH request: toggle check task with id ${req.params.id}`);
    const sql = `UPDATE tasks SET checked = !checked WHERE id = ${req.params.id}`;
    pool.getConnection((error, connection) => {
        if(error) throw error;
        let query = connection.query(sql, (err, result) => {
            if(err) throw error;
            console.log(`Task with id ${req.params.id} toggled ...`);
            connection.release();
        });
    });
    res.send();
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
