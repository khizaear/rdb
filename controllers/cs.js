module.exports = function (router) {


    router.get('/', function (req, res) {
	
	res.render('livebugs',{'val' : req.session.csval, 'size' : req.session.size, 'posttxnsize' : req.session.posttxnsize, 'cssize' : req.session.cssize, 'pretxnsize' : req.session.pretxnsize, 'txnsize' : req.session.txnsize });
	});
	
	
	}