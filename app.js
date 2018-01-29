
var data = '';
var a = angular.module("myApp", ['ngSanitize', 'ngRoute']);

a.controller('mainController', function($scope, $http, $window, $routeParams, $location){
	
	var pos = false;
      var embed = false;
      var lang = 'en';
      var query   = window.location.search.substring(1);
      
	var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == 'id'){
				pos =  pair[1];
			} 
                  if(pair[0] == 'embed'){
                        embed = pair[1];
                  }
                  if(pair[0] == 'lang'){
                        lang = pair[1];
                  }
		}

      switch( lang ){
            case 'id':  var data_url = 'graph.data.id.json';
                        var avg  = 'Rata-rata';
                  break;
            case 'th':  var data_url = 'graph.data.th.json'
                  break;
            case 'vn':  var data_url = 'graph.data.vn.json'
                        var avg = 'trung bình'
                  break;
            default: var data_url = 'graph.data.json';
                        var avg  = 'Average';
                  break;
      }
	$http({
      	method: "GET",
      	url: "data/" + data_url
      }).then(function mySuccess(response){
            
            console.log(embed);
            if( pos !== false){
            	
            	var data = response.data;

            	pos = parseInt(pos);

            	var _id           = 'canvas';
            	var _type         = data[pos].type;
            	var _values       = data[pos].data;
            	var _format       = data[pos].format;
                  var _xlabel       = data[pos].x_label;
                  var _ylabel       = data[pos].y_label;
                  var label         = data[pos].label;
                  var ticks         = data[pos].tick;

                  $('#'+_id).addClass('graph-'+pos);
            	switch( _type ){
            		case 'horizontal-bar' : 
                              var legend        = ( data[pos].legend !== 'undefined' ) ? data[pos].legend : false;
                              var _max          = data[pos].max;
					horizontalChart( _id, _values, _format, _xlabel, _ylabel, label, legend, _max, avg);
            		break;
            		case 'spline'         : 
                              if(pos == 9){
                                    splineChart2( _id, _values, _format, _xlabel, _ylabel, ticks, avg);
                              }else{
                                    splineChart( _id, _values, _format, _xlabel, _ylabel, ticks);
                              }
					
            		break;
            		case 'bar' : 
                              var _cat = data[pos].categories;
                              barChart( _id, _values, _format, _cat, _xlabel, _ylabel, label, ticks);
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
        

            if( embed ){
                  var header  = document.getElementsByTagName('head')[0];
                  var main    = document.getElementById('main-container');
                  var _el     = document.createElement('div');
                  var _title  = document.createElement('strong');
                  

                  main.setAttribute( 'class', 'embedded-graph');
                  _el.setAttribute( 'class', 'copyright');
                  _el.innerHTML = '<p><strong>The State of eCommerce in SEA 2017</strong><a href="https://iprice.my" target="_blank">Powered by iPrice</a></p>';

                  main.appendChild(_el);

                  _title.innerHTML = data[pos].title;
                  main.insertBefore( _title, main.childNodes[0]);
                  header.appendChild(_s);
            }

      });

});

