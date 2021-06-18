const authRoutes = require('./auth/auth.routes');
const properties = require('./config/properties');
const DB = require('./config/db');

DB();

var express = require("express");
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);
authRoutes(router);

app.listen(properties.PORT, () => console.log(`Server running on ${properties.PORT}`));