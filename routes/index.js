module.exports = function(app){
	console.log(app);
	var ipv4 = app.ipv4;
	var express = require('express');
	var router = express.Router();

	/* nsf  usdhhs  usdoa  usdod  usdoe  */

	/* GET home page. */
	router.get('/', function(req, res) {
	  res.render('index');  
	  //res.render('index', { title: "try /nsf /usdhhs /usdoa /usdod /usdoe /usdoi" });
	  /*res.writeHead(301, {
	    "location":"http://chorusaccess.org"
	  });
	  res.end();*/
	});

	router.get('/nsf', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/nsf_data\'" });
	});

	router.get('/usdhhs', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/usdhhs_data\'" });
	});

	router.get('/usdoa', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/usdoa_data\'" });
	});

	router.get('/usdod', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/usdod_data\'" });
	});

	router.get('/usdoe', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/usdoe_data\'" });
	});

        router.get('/usdoi', function(req, res) {
          res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/usdoi_data\'" });
        });


	return  router;
}
