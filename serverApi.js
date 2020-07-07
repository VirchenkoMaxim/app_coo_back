const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b6e2d6376b8d2b',
    database: 'heroku_df9ca18dfbaf1c3',
    password: 'ba5bbcf0',
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
    const queryString = `SELECT * FROM stats WHERE userId >= ${from} AND userId <= ${to}`
    connection.query(queryString, (err, rows, fields) => {
        res.json(rows)
    })
})
module.exports = router;