var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Express', 
        name: "Javier", 
        image:"/images/bridge.png", 
        imagealt: "The famous bridge" 
    });
});

module.exports = router;
