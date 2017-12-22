$(document).ready(function(){

	var data_list 	= new Array();
	var data 		= document.getElementById('data');
	var up 			= true;
	var config 		= '';
	var filter 		= new Array();
	var filterList	= new Array();
	var x	= 0;
	var y	= 0;	

	var container = document.getElementById('container');
	if( $(window).width() < 768){
		container.style.width = $(window).width() + 'px';	
		var topLeft = document.createElement('div');
		console.log($('.sort-by:first-child').width());
		container.appendChild(topLeft);
		topLeft.classList.add('top-left');
		topLeft.style.width = $('.sort-by:first-child').width() +'px';
		topLeft.style.height = $('.sort-by:first-child').height() +'px';
	}
	

	$(container).scroll(function(){

		x = container.scrollLeft;
		y = container.scrollTop;

		;

		$('.sort-by').each(function(i){
			if (i === 0) {
				this.style.transform = translate(x, y);
			}
			else{
				this.style.transform = translate(0, y);	
			}
		});

		$('.category-item:first-child').each(function(){
			this.style.transform = translate(x, 0);
		});
	});

	function translate( x, y) {
		return 'translate(' + x + 'px, ' + y + 'px)';
	}

	$.getJSON('data.json', function(result){
		config = result.config;
        $.each(result.data, function(i, field){
        	
        	data_list.push(field);
    		
        });

        var data = bubbleSort( data_list, 'traffics', true);

        generateVList(data);
        animate();
        
    });

    $('.sort-by').on('click', function(e){
		
		var sort = 'up';
		var _el = $(e.target).attr('data-attr');

		if( $(e.target).hasClass('active')){
			if( up ){
				up = false;
				sort = 'down';
			}else{
				up = true;
				sort = 'up';
			}
		}

		$('.active').removeClass('active');
		
		$(this).addClass('active');

		$('.active').removeClass('up');
		$('.active').removeClass('down');
		
		$(this).addClass(sort);
		
		if( _el !== undefined){
			
			data_list = bubbleSort( data_list, _el, up);

			generateVList(data_list);
			animate();			
		}

		$('.category-item:first-child').each(function(){
			this.style.transform = translate(x, 0);
		});
	});

	function bubbleSort(arr, _el, up){
    	var len = arr.length;
    	
		if( up ){
    		for (var i = len-1; i>=0; i--){
	    		for(var j = 1; j<=i; j++){

	    			if(arr[j-1][_el]<arr[j][_el]){
	    				var temp = arr[j-1];
	    				arr[j-1] = arr[j];
	    				arr[j] = temp;
	    			}
	    		}
	    	}
    	}else{
    		for (var i = len-1; i>=0; i--){
	    		for(var j = 1; j<=i; j++){

	    			if(arr[j-1][_el]>arr[j][_el]){
	    				var temp = arr[j-1];
	    				arr[j-1] = arr[j];
	    				arr[j] = temp;
	    			}
	    		}
	    	}
    	}
    	
    	return arr;
	}

	function animate(){

		var obj = $('[class*="category-item"]');
	    obj.each(function () {
	      var w = $(this).find('p').attr('data-width');
	      TweenMax.to($(this).find('p'), 1, { width: w+'%' }, 1);
	    });
		
	}

    function processData(i, field, config){
    	var html = '';

    	var iema 		= field.iema_winner ? 'iema' : '';
    	var verified 	= field.verified ? 'verified' : '';

		var _wTraffics 	= field.traffics / parseInt(config.max_traffics) * 100; 
		var _wApp 		= field.app / parseInt(config.max_app) * 100; 
		var _wTwitter 	= field.twitter / config.max_twitter * 100; 
		var _wInstagram = field.instagram / config.max_instagram * 100; 
		var _wFacebook 	= field.facebook / config.max_facebook * 100; 
		var _wEmployees = field.employees / config.max_employees * 100; 


    	html += '<div class="category-item col bg__grey ' + iema +' ' + verified + '">';
    	html += '<span><a href="' + field.url + '" class="color__black" target="_blank" rel="noopener">';
    	html += '<img src="assets/img/'+ field.logodesktop + '"/><label>'+field.name+'</label></a></span>';
    	html += '</div>'

    	html += '<div class="category-item col bg__grey ">';
    	html += '<span><p class="animate-width" data-width="'+_wTraffics+'">'+field.traffics.toLocaleString()+'</p></span>';
    	html += '</div>';

    	html += '<div class="category-item col bg__grey ">';
    	html += '<span><p class="animate-width" data-width="'+_wApp+'">'+  (field.app == 0 ? 'n/a' : field.app.toLocaleString()) +'</p></span>';
    	html += '</div>';

    	html += '<div class="category-item col bg__grey ">';
    	html += '<span><p class="animate-width" data-width="'+_wTwitter+'">'+ (field.twitter == 0 ? 'n/a' : field.twitter.toLocaleString()) +'</p></span>';
    	html += '</div>';

    	html += '<div class="category-item col bg__grey ">';
    	html += '<span><p class="animate-width" data-width="'+_wInstagram+'">'+ (field.instagram == 0 ? 'n/a' : field.instagram.toLocaleString()) +'</p></span>';
    	html += '</div>';

    	html += '<div class="category-item col bg__grey ">';
    	html += '<span><p class="animate-width" data-width="'+_wFacebook+'">'+ (field.facebook == 0 ? 'n/a' : field.facebook.toLocaleString()) +'</p></span>';
    	html += '</div>';

    	html += '<div class="category-item col bg__grey ">';
    	html += '<span><p class="animate-width" data-width="'+_wEmployees+'">'+ (field.employees == 0 ? 'n/a' : field.employees.toLocaleString()) +'</p></span>';
    	html += '</div>';

    	return html;
		
    }

    function generateVList(data) {

	    var bigAssList = [];

	    var link = window.location.href;
	    var urlImgs = 'imgs/';

	    if(link.indexOf('/en') > 0) {
	      urlImgs = '../imgs/';
	    }

	    for (var i = 0; i < data.length; i++) {

	    	var _el = document.createElement('div');
			_el.setAttribute('class', 'row mb__10 '+ data[i].category + ' ' + data[i].location + ' ' + data[i].type);
			_el.setAttribute('data-order', i+1);
			_el.setAttribute('data-key', data[i].key);

	    	html = processData(i, data[i], config);

	    	_el.innerHTML = html;
			bigAssList.push(_el);
	    }

	    var _width = $(window).width();
	    var itemH = 35, _h = 48; 

	    var list = new VirtualList({
	      w: $('#data').width(),
	      h: _h * data.length,
	      items: bigAssList,
	      itemHeight: itemH,
	      cache: true
	    });
	    $('#data').html('');
	    $('#data').append(list.container);
	    
	}
    
});