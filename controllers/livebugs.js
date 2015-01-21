'use strict';
var LiveBugsModel = require('../models/livebugs');

module.exports = function (router) {

    var model = new LiveBugsModel();


    router.get('/', function (req, res) {

        console.log('its livebugs');
        res.render('livebugs', model);
        
    });



};


