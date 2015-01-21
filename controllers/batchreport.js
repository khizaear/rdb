'use strict';
var BatchReportModel = require('../models/batchreport');

module.exports = function (router) {

    var model = new BatchReportModel();


    router.get('/', function (req, res) {

      console.log('its batchreport');
        res.render('batchreport', model);
        
    });


};

