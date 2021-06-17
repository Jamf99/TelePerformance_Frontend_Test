var express = require("express");
var app = express();
var path = require("path")
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function() {
    console.log("Server started on port "+ app.get("port"));
});

router.route('/register').post((request, response) => {
    const body = request.body;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({'status': 'okay'}));
});

router.route('/login').post((request, response) => {
    const body = request.body;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({'status': 'okay'}));
});

app.get("/", (req, res) => {
    res.send("WORKS")
})