const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'articles',
    password: 'maks',
});
router.get('/user', (req, res) => {
    const pageNum = parseInt(req.query.page - 1, 10) || 0;
    const count = parseInt(req.query.count, 10) || 1;
    const ignore = count * pageNum;
    const limit = ignore + ',' + count
    const queryString = `SELECT * FROM users ORDER BY ID DESC LIMIT ${limit}`
    connection.query(queryString, (err, rows, fields) => {
        connection.query('SELECT COUNT(id) AS total FROM users;', (err, total, fields) => {
            res.json({ status: 'done', data: rows, total: total[0].total })
        })
    })
})
router.get('/stats', (req, res) => {
    const from = parseInt(req.query.from, 10) || 1;
    const to = parseInt(req.query.to, 10) || 1;
    const userId = parseInt(req.query.userId, 10) || 1;

    // const queryString = `SELECT * FROM articles.stats WHERE userId >= ${from} AND userId <= ${to}`
    const queryString = `SELECT * FROM articles.stats WHERE userId = ${userId}`
    connection.query(queryString, (err, rows, fields) => {
        res.json(rows)
    })
})
module.exports = router;