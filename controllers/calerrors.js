'use strict';


var CalErrorsModel = require('../models/calerrors');



module.exports = function (router) {

    var model = new CalErrorsModel();


    router.get('/', function (req, res) {

      console.log('its calerrors');
        res.render('calerrors', model);
        
    });



};

