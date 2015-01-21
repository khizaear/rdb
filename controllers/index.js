'use strict';


var IndexModel = require('../models/index');

module.exports = function (router) {

    var model = new IndexModel();
 
     router.get('/', function (req, res) {
     	console.log('its index');
        
        res.render('index', model);
        console.log('its index after rendering');
        
    });

	router.get('/icons', function (req, res) {
     	console.log('its index');
        
        res.render('icon', model);
        console.log('its index after rendering');
        
    });

  
};


