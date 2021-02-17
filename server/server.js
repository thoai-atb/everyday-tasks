const express = require('express');
const bp = require('body-parser');
const Pool = require('pg').Pool;
const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'everyday_tasks',
    password: '123',
    port: 5432,
});

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
   
app.get('/tasks', (req, res) => {
    console.log(`GET request get all tasks`);
    let sql = 'SELECT * FROM tasks ORDER BY id';
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result.rows);
        console.log('Fetched all tasks ...');
    })
})

app.get('/task/:id', (req, res) => {
    console.log(`GET request task with id ${req.params.id}`);
    let sql = `SELECT * FROM tasks WHERE id = ${req.params.id}`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result.rows[0]);
        console.log('Fetched single task ...');
    })
})

app.put('/tasks', (req, res) => {
    console.log(`PUT request create new task`);
    const {name, checked} = req.body;
    let sql = `INSERT INTO tasks (name, checked) VALUES ('${name}', '${checked}')`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).send('PUT success');
        console.log('New task created ...');
    })
})

app.patch('/tasks/reset', (req, res) => {
    console.log(`PATCH request: resetting all tasks unchecked`);
    let sql = `UPDATE tasks SET checked = 'false'`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).send('Update success');
        console.log('Reset all tasks ...');
    })
})

app.patch('/task/:id/toggle', (req, res) => {
    console.log(`PATCH request: toggle check task with id ${req.params.id}`);
    const sql = `UPDATE tasks SET checked = NOT checked WHERE id = ${req.params.id}`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).send('Toggling success');
        console.log('Task toggled ...');
    })
});

app.delete('/task/:id', (req, res) => {
    console.log(`DELETE request task with id ${req.params.id}`);
    const sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
    pool.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).send('Deleting success');
        console.log('Task deleted ...');
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
