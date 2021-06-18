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

const cats = require('./data/cats.json');
const dogs = require('./data/dogs.json');

router.route("/cats").post((req, res) => {
    if(req.body.token != null && req.body.role === 'admin') {
        res.json(cats);
    }
    return res.status(401).send('Unauthorized');
});

router.route("/dogs").post((req, res) => {
    if(req.body.token != null && req.body.role === 'user') {
        res.json(dogs);
    }
    return res.status(401).send('Unauthorized');
});

app.listen(properties.PORT, () => console.log(`Server running on ${properties.PORT}`));