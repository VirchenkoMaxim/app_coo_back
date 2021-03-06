const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 80;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', require('./serverApi'))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))