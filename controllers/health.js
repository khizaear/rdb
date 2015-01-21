'use strict';
var HealthModel = require('../models/health');
module.exports = function (router) {

    var model = new HealthModel();


    router.get('/', function (req, res) {

      console.log('its healt');
        res.render('health', model);
        
    });



};

