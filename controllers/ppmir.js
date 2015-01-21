'use strict';


var PPMIRModel = require('../models/ppmir');



module.exports = function (router) {

    var model = new PPMIRModel();


    router.get('/', function (req, res) {

    	console.log('its ppmir');
        res.render('ppmir', model);
        
    });



};
