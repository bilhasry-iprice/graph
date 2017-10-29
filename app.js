
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
            		case 'bar' : 
                              var _cat = data[pos].categories;
                              barChart( _id, _values, _format, _cat);
            		break;
                        case 'donut' : 
                              var _cat = data[pos].categories;
                              donutChart( _id, _values, _format, _cat);
                        break;
                        case 'stacked' : 
                              var _groups = data[pos].groups;
                              var _cat = data[pos].categories;
                              stackedChart( _id, _values, _groups, _cat, _format);
                        break;

            	}
            }

      });

});

