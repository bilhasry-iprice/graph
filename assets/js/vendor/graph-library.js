
function translateCountry(label){

	switch( label ){
		case 'ID' : return 'Indonesia';
			break;
		case 'PH' : return 'Philippines';
			break;
		case 'VN' : return 'Vietnam';
			break;
		case 'TH' : return 'Thailand';
			break;
		case 'SG' : return 'Singapore';
			break;
		case 'MY' : return 'Malaysia';
			break;
		default : return label
			break;
	} 
}
/**
 * bar chart function
 */
function barChart( _id, _values, format, cat, x_label, y_label, label){

	var height = ($(window).width() < 768) ? 400 : 500;

	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	        columns : _values,
	        type: 'bar',
	        tick: {
                // this also works for non timeseries data
                values: ['06', '09', '12', '15', '18', '21', '00']
            }
	    },
	    size:{
	    	height: height
	    },
	    color: {
	        pattern: ['#33CCCC', '#FF6633', '#086A87', '#0DA290', '#3fbf72', '#ff4949']
	    },
	    axis: {
        	x: {
	            type: 'category',
	            categories: cat,
	            label: {
	                text: x_label,
	                position: 'outer-center'
	            },
	            tick : {
	            	culling: {
	                    max: 5 // the number of tick texts will be adjusted to less than this value
	                }
	            }
	        },
	        y : {
	        	tick: {
					format: function (d) { 
						if( format == '$'){
							return format + " " + d;
							
						}else{
							return d + " "+format; 	
						}
						
					}
	            },
	            label: {
	                text: y_label,
	                position: 'outer-middle'
	            }
	        }
	    },
	    grid: {
	        x: {
	            show: true
	        },
	        y: {
	            show: true
	        }
	    }
	});
}

function donutChart( _id, _values, format, cat){

	var height = ($(window).width() < 768) ? 350 : 450;

	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	        columns : _values,
	        type: 'donut'
	    },
	    size:{
	    	height: height
	    },
	    color: {
	        pattern: ['#33CCCC', '#FF6633', '#91B496', '#86E2D5', '#EC644B', '#FABE58', ]
	    },
	    axis: {
        	x: {
	            type: 'category',
	            categories: cat
	        },
	        y : {
	        	tick: {
					format: function (d) { 
						if( format == '$'){
							return format + " " + d;
							
						}else{
							return d + " "+format; 	
						}
						
					}
	            }
	        }
	    },
	    grid: {
	        x: {
	            show: true
	        },
	        y: {
	            show: true
	        }
	    }
	});
}

/**
 * horizontal chart function
 */

function horizontalChart( _id, _values, format, x_label, y_label, label){
	
	var height = ($(window).width() < 768) ? 350 : 450;

	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	    	x : 'x',
	        columns : _values,
	        type: 'bar'
	    },
	    size:{
	    	height: height
	    },
	    color: {
	        pattern: ['#33CCCC', '#FF6633', '#086A87', '#0DA290', '#3fbf72', '#ff4949']
	    },
	    tooltip: {
	    	format: {
	    		value: function (value, ratio, id, index) { 
	    			if( format == '$'){
						return format + " " + value;
						
					}else{
						return value + " "+format; 	
					}
	    		},
	    		title : function(x){
	    			return translateCountry(_values[0][x+1]);
	    		}
			}
	    },
	    axis : {
	    	rotated: true,
	    	y : {
            	tick: {
					format: function (d) { 
						if( format == '$'){
							return format + " " + d.toFixed(2);
							
						}else{
							return d.toFixed(2) + " "+format; 	
						}
					},
					count: 6
	            },
	            label: {
	                text: x_label,
	                position: 'outer-center'
	            }
	        },
	    	x: {
	            type: 'category', // this needed to load string x value
	        	label: {
	                text: y_label,
	                position: 'outer-middle'
	            }
	        }
	    },
	    grid: {
	        x: {
	            show: true
	        },
	        y: {
	            show: true
	        }
	    }
	});
}

function putImage( _el ){

    _el.selectAll(".tick").each(function(d,i){        
        d3.select(this)
          .append('image')
          .attr('xlink:href', img)
          .attr('x',0 - 128)
          .attr('y',0 - 128)
          .attr('width',128)
          .attr('height',128);
    });
}

/**
 * pie chart function
 */

function splineChart( _id, data, format, x_label, y_label){

	var height = ($(window).width() < 768) ? 350 : 450;

	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	    	x : 'x',
        	columns: data,
        	type: 'spline'
	    },
	    tooltip : {
	    	format : {
	    		title : function(x){
	    			return translateCountry(data[0][x+1]);
	    		}
	    	}
	    }
	    ,
	    axis : {
	    	x: {
	            type: 'category', // this needed to load string x value
	        	label: {
	                text: x_label,
	                position: 'outer-center'
	            },
	            tick : {
	            	count: 5
	            }
	        },
	        y : {
	        	label: {
	                text: y_label,
	                position: 'outer-middle'
	            },
	            tick : {
	            	format: function (d) { 
						if( format == '$'){
							return format + " " + d;

						}else{
							return d + " "+format; 	
						}
						
					}
	            }
	        }
	    },
	    size:{
	    	height: height
	    },
	    color: {
	        pattern: ['#33CCCC', '#FF6633', '#086A87', '#0DA290', '#3fbf72', '#ff4949']
	    },
	    point: {
	    	select: {
	    		r: 4
	    	},
			r: 3
		},
	    grid: {
	        x: {
	            show: true
	        },
	        y: {
	            show: true
	        }
	    }
	});
}

/**
 * pie chart function
 */

function splineChart2( _id, data, format, x_label, y_label){

	var height = ($(window).width() < 768) ? 350 : 450;

	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	    	x : 'x',
        	columns: data,
        	type: 'spline'
	    },
	    axis : {
	    	x: {
	            type: 'category', // this needed to load string x value
	        	label: {
	                text: x_label,
	                position: 'outer-center'
	            },
	            tick : {
	            	values: [9, 15, 21, 3],
	            	count: 4,
	            	format : function(values){
	            		var hour = data[0][values+1];
		    			if( hour < 12){
		    				return parseInt(hour) + ' AM';
		    			}else{
		    				return (parseInt(hour) - 12) + ' PM'
		    			}
	            	}
	            }
	        },
	        y : {
	        	label: {
	                text: y_label,
	                position: 'outer-middle'
	            },
	            tick : {
	            	format: function (d) { 
						if( format == '$'){
							return format + " " + d;

						}else{
							return d + " "+format; 	
						}
						
					}
	            }
	        }
	    },
	    tooltip: {
	    	format: {
	    		title: function (x) { 
	    			var hour = data[0][x+1];
	    			if( hour < 12){
	    				return parseInt(hour) + ' AM';
	    			}else{
	    				return (parseInt(hour) - 12) + ' PM'
	    			}
	    		}
			}
	    },
	    size:{
	    	height: height
	    },
	    color: {
	        pattern: ['#33CCCC', '#FF6633', '#086A87', '#0DA290', '#3fbf72', '#ff4949']
	    },
	    point: {
	    	focus: {
	    		r: 3
	    	},
			r: 3
		},
	    grid: {
	        x: {
	            show: true
	        },
	        y: {
	            show: true
	        }
	    }
	});
}

/** 
 * combo chart function
 */

function comboChart( _id, chart1, chart2, data){

}

function stackedChart(_id, _values, _groups, cat, format){
	var chart = c3.generate({
	bindto: '#'+_id,
    data: {
        columns: _values,
        type: 'bar',
        groups: _groups
    },
    color: {
        pattern: ['#33CCCC', '#FF6633', '#086A87', '#0DA290', '#3fbf72', '#ff4949']
    },
    size:{
    	height: 450
    },
    axis : {
	    rotated: true,
	    x: {
            type: 'category',
            categories: cat,

        },
        y : {
        tick: {
				format: function (d) { 
					if( format == '%'){
						return d + " "+format; 	
					}else{
						return format + " " + d;
					}
					
				}
            }
        }

	},
    grid: {
    	x: {
            show: true
        },
        y: {
            lines: [{value:0}],
            show: true
        }
    }
});
}