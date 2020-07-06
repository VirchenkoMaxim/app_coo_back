const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/', (req, res) => {
    res.send('<h1>Hello Express</h1>')
})
app.use('/api', require('./serverApi'))
app.listen(4000, () => console.log("Server started"))