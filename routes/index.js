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
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/nsf\'", title:"NSF" });
	});

        router.get('/nist', function(req, res) {
          res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/nist\'", title:"NIST" });
        });

	router.get('/usdhhs', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdhhs\'", title:"USDHHS" });
	});

	router.get('/usdoa', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdoa\'", title:"USDA" });
	});

	router.get('/usdod', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdod\'", title:"USDOD" });
	});

	router.get('/usdoe', function(req, res) {
	  res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdoe\'", title:"USDOE" });
	});

    router.get('/usdoi', function(req, res) {
      res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usdoi\'", title:"USDOI" });
    });

    router.get('/usaid', function(req, res) {
      res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/usaid\'", title:"USAID" });
    });

    router.get('/smithsonian', function(req, res) {
      res.render('agency', { datasource: "var serviceUrl = \'http://"+ipv4+"/data/smithsonian\'", title:"Smithsonian" });
    });

	return  router;
}
