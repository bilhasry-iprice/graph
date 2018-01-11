
/**
 * bar chart function
 */

function barChart( _id, _values, format, cat, x_label, y_label){

	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	        columns : _values,
	        type: 'bar'
	    },
	    size:{
	    	height: 500
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
	            }
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

	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	        columns : _values,
	        type: 'donut'
	    },
	    size:{
	    	height: 450
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
	            show: true
	        }
	    }
	});
}

/**
 * horizontal chart function
 */

function horizontalChart( _id, _values, format, x_label, y_label){
	var chart = c3.generate({
		bindto: '#'+_id,
	    data: {
	    	x : 'x',
	        columns : _values,
	        type: 'bar'
	    },
	    size:{
	    	height: 450
	    },
	    color: {
	        pattern: ['#11C1EA', '#FF6633', '#0D97B7', '#0B829E', '#086A87', '#08586B']
	    },
	    axis : {
	    	rotated: true,
	    	y : {
            	tick: {
					format: function (d) { 
						if( format == '%'){
							return d + " "+format; 	
						}else{
							return format + " " + d;
						}
						
					}
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

function splineChart( _id, data, x_label, y_label){
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
	                text: 'X Label',
	                position: 'outer-center'
	            }
	        },
	        y : {
	        	label: {
	                text: 'X Label',
	                position: 'inner-middle'
	            }
	        }
	    },
	    size:{
	    	height: 450
	    },
	    color: {
	        pattern: ['#33CCCC', '#FF6633', '#086A87', '#0DA290', '#3fbf72', '#ff4949']
	    },
	    point: {
		  r: 3, 
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