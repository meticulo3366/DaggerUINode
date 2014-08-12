var daggerApp = angular.module('daggerApp', []);

var httpErrorHandler = function($scope) {
    return function() {
	var msg = 'Unable to connect to a dagger middleware at ' + serviceUrl + '.' +
	    ' Please ensure the dagger middleware is running and check that it is' +
	    ' visible from your computer.';
	$scope.error = {message: msg, hasError: true};
    };
};

var goGet = function($http, $scope, path, dataVar, after) {
    $http.jsonp(serviceUrl + path + '?callback=JSON_CALLBACK')
	.error(httpErrorHandler($scope))
	.success(function(data) {
	    $scope.error = {hasError: false};
	    $scope[dataVar] = data;

	    if (after) {
		after(data);
	    }
	});
};

daggerApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
	when('/summary', {templateUrl: 'partials/summary.html', controller: 'summaryCtrl'}).
	when('/breakdown', {templateUrl: 'partials/breakdown.html', controller: 'breakdownCtrl'}).
	when('/status', {templateUrl: 'partials/status.html', controller: 'statusCtrl'}).
	otherwise({redirectTo: '/summary'});
}]);

daggerApp.controller('summaryCtrl', function($scope, $http) {
    goGet($http, $scope, '/tallies', 'tallies', function(data) {
	nv.addGraph(function() {
	    var chart = nv.models.lineChart();
	    
	    chart.xAxis
		.axisLabel('Date')
		.tickFormat(function(d) {
		    return d3.time.format('%Y-%m-%d')(new Date(d))
		});

	    chart.yAxis
		.axisLabel('# of publications')
		.tickFormat(d3.format(',r'));
	    
	    d3.select('#kpi-history-chart svg')
		.datum(data.series)
		.transition().duration(500)
		.call(chart);
	    
	    nv.utils.windowResize(function() { chart.update(); });
	    return chart;
	});
    });

    goGet($http, $scope, '/breakdowns', 'breakdowns', function(data) {
	$.each(['license', 'fulltext', 'archive'], function(index, chartName) {
	    nv.addGraph(function() {
		var chart = nv.models.pieChart()
		    .x(function(d) { return d.label })
		    .y(function(d) { return d.value })
		    .showLabels(true)
		    .donut(true);

		d3.select('#' + chartName + '-breakdown-chart svg')
		    .datum(data[chartName][0]['values'])
		    .transition().duration(500)
		    .call(chart);

		nv.utils.windowResize(function() { chart.update(); });
		return chart;
	    });
	});
    });

    goGet($http, $scope, '/publishers', 'publishers', function(data) {
	$.each(data, function(index, publisher) {
	    nv.addGraph(function() {
		var chart = nv.models.bulletChart();

		var $row = d3.select('#publisher-charts').append('div');
		$row.attr('class', 'row');
		var $title = $row.append('div');
		$title.attr('class', 'col-md-4');
		$title.html('<h4>' + publisher.name);
		var $chartContainer = $row.append('div');
		$chartContainer.attr('class', 'col-md-8');
		var $chartSvg = $chartContainer.append('svg');
		$chartSvg.attr('style', 'height:60px');
		
		$chartSvg.datum(publisher)
		    .transition().duration(1000)
		    .call(chart);

		nv.utils.windowResize(function() { chart.update(); })
		return chart;
	    });
	});
    });
});

daggerApp.controller('breakdownCtrl', function($scope, $http) {
    goGet($http, $scope, '/tally-table', 'tallies', function(data) {
	$('#tally-table').dataTable().fnDestroy();
	$('#tally-table').dataTable({"aaData": data});
    });

    goGet($http, $scope, '/publisher-table', 'publishers', function(data) {
	$('#publisher-table').dataTable().fnDestroy();
	$('#publisher-table').dataTable({"aaData": data});
    });
});

daggerApp.controller('statusCtrl', function($scope, $http) {
    goGet($http, $scope, '/collections', 'collections');
});

daggerApp.controller('brandingCtrl', function($scope, $http) {
    goGet($http, $scope, '/branding', 'branding');
});

