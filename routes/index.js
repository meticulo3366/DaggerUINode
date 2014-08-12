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
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/nsf\'" });
	});

	router.get('/usdhhs', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdhhs\'" });
	});

	router.get('/usdoa', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdoa\'" });
	});

	router.get('/usdod', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdod\'" });
	});

	router.get('/usdoe', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdoe\'" });
	});

    router.get('/usdoi', function(req, res) {
      res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdoi\'" });
    });

    router.get('/usaid', function(req, res) {
      res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usaid\'" });
    });

    router.get('/smithsonian', function(req, res) {
      res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/smithsonian\'" });
    });

	return  router;
}
