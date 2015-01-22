'use strict';
var http = require('http');
var LiveBugsModel = require('../models/livebugs');



var underscore = require('underscore-contrib');
module.exports = function (router) {

    var model = new LiveBugsModel();


    router.get('/', function (req, res) {
var commonservicessize = 0;
var posttxnsize = 0;
var pretxnsize = 0;
var txnsize = 0;
var totalsize = 0;
var val = [];
var posttxnval = [];
var csval = [];
var txnval = [];
var pretxnval = [];
        http.get("http://qualinfralvs42.qa.paypal.com/rest/metricsserv/openBugs?leaderHierarchy=/kapsharma", function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);
	var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                str = JSON.parse(str);
                totalsize += underscore.size(str);
                console.log("Size", totalsize);
				val = val.concat(str);
                str.forEach(function(val){console.log(val.pkey);

                })
                
                
            });
        });
		http.get("http://qualinfralvs42.qa.paypal.com/rest/metricsserv/openBugs?leaderHierarchy=/nidixit", function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);
	var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                str = JSON.parse(str);
                posttxnsize += underscore.size(str);
                console.log("posttxnsize", posttxnsize);
				posttxnval = posttxnval.concat(str);
                str.forEach(function(val){console.log(val.pkey);

                })
                
                
            });
        });
		http.get("http://qualinfralvs42.qa.paypal.com/rest/metricsserv/openBugs?leaderHierarchy=/kartn", function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);
	var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                str = JSON.parse(str);
                posttxnsize += underscore.size(str);
                console.log("Size", posttxnsize);
				posttxnval = posttxnval.concat(str);
                str.forEach(function(val){console.log(val.pkey);

                })
                
                
            });
        });
		http.get("http://qualinfralvs42.qa.paypal.com/rest/metricsserv/openBugs?leaderHierarchy=/saradhakrishnan", function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);
	var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                str = JSON.parse(str);
                commonservicessize += underscore.size(str);
                console.log("Size", commonservicessize);
				csval = csval.concat(str);
                str.forEach(function(val){console.log(val.pkey);

                })
                req.session.size = commonservicessize;
                
            });
        });
		http.get("http://qualinfralvs42.qa.paypal.com/rest/metricsserv/openBugs?leaderHierarchy=/sbal", function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);
	var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                str = JSON.parse(str);
				pretxnsize += underscore.size(str);
                totalsize += pretxnsize;
                console.log("Size", totalsize);
				val = val.concat(str);    
pretxnval = pretxnval.concat(str);				
				str.forEach(function(val){console.log(val.pkey);

                })
            
                
            });
        });
		http.get("http://qualinfralvs42.qa.paypal.com/rest/metricsserv/openBugs?leaderHierarchy=/ccchang", function (response) {
            console.log("statusCode: ", response.statusCode);
            console.log("headers: ", response.headers);
	var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                str = JSON.parse(str);
				txnsize += underscore.size(str);
                totalsize += txnsize;
                console.log("Size", totalsize);
				val = val.concat(str);
				txnval = txnval.concat(str);
                str.forEach(function(val){console.log(val.pkey);

                })
            
                
            });
        });
        console.log('its livebugs');
        setTimeout(continueExecution, 20000);
        
		function continueExecution()
{
   //finish doing things after the pause
    console.log('its exed');
	req.session.size = totalsize;
	req.session.posttxnsize = posttxnsize;
	req.session.pretxnsize = pretxnsize;
	req.session.txnsize = txnsize;
	req.session.cssize = commonservicessize;
	req.session.val = val;
	req.session.posttxnval = posttxnval;
	req.session.pretxnval = pretxnval;
	req.session.txnval = txnval;
	req.session.csval = csval;
   res.render('livebugs',{'val' : val, 'size' : totalsize, 'posttxnsize' : posttxnsize, 'cssize' : commonservicessize, 'pretxnsize' : pretxnsize, 'txnsize' : txnsize });
}
		
    });



};


