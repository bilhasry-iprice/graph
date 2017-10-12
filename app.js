
var data = '';
var a = angular.module("myApp", ['ngSanitize', 'ngRoute']);

a.controller('mainController', function($scope, $http, $window, $routeParams){
	
	var pos = false;
    var query = window.location.search.substring(1);
	var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == 'id'){
				pos =  pair[1];
			}
		}

	$http({
      	method: "GET",
      	url: "data/graph.data.json"
      }).then(function mySuccess(response){
            
            if( pos !== false){
            	
            	var data = response.data;

            	pos = parseInt(pos);

            	var _id = 'canvas';
            	var _type = data[pos].type;
            	var _values = data[pos].data;
            	var _format = data[pos].format;

            	switch( _type ){
            		case 'horizontal-bar' : 
						horizontalChart( _id, _values, _format);
            		break;
            		case 'spline'         : 
						splineChart( _id, _values);

            		break;
            		case 'doughnut' :
            		break;
            		case 'toggle-bar' :
            		var format = data[pos].format;
            		pos = parseInt(pos);
            		_values = data[pos].data.overall;
            		barChart( _id, _values, format)

            		break;
            		case 'toggle-stack':

            		pos = parseInt(pos);
            		_values = data[pos].data.overall;

            		var groups = data[pos].groups;
            		console.log(groups);
            		stackedChart( _id, _values, groups);
            		break;

            		case 'toggle-horizontal' :
            		var format = data[pos].format;
            		pos = parseInt(pos);
            		_values = data[pos].data.overall;
            		horizontalChart( _id, _values, format);

            		break;

            	}
            }

      });

});

