$(document).ready(function(){

	var data_list 	= new Array();
	var filename	= 'q3-2017.json';
	var data 		= document.getElementById('data');
	var up 			= true;
	var config 		= '';
	var filter 		= new Array();
	var filterList	= new Array();
	var year = 2017;
	var x	= 0;
	var y	= 0;	
	var curr = new Array();
	var list = '';
	var lang = 'en';
	var container = document.getElementById('container');
	var trans = '';


	if( $(window).width() < 768){
		container.style.width = $(window).width() + 'px';	
		var topLeft = document.createElement('div');
		
		container.appendChild(topLeft);
		topLeft.classList.add('top-left');
		topLeft.style.width = $('.sort-by:first-child').width() +'px';
		topLeft.style.height = $('.sort-by:first-child').height() +'px';

		$(container).scroll(function(){

			x = container.scrollLeft;
			y = container.scrollTop;

			if( (y > 10 ) || (x > 10)){
				$('.swipe-left').animate({
					opacity : 0
				}, 1000, function(){
					$('.swipe-left').remove(); 	
				}); 
			}

			$('.sort-by').each(function(i){
				if (i === 0) {
					this.style.transform = translate(x, y);
				}
				else{
					this.style.transform = translate(0, y);	
				}
			});

			if( x > 0 ){
				$('.category-item:first-child label').each(function(){
					this.style.width = '0px';
				});
				TweenMax.to($('.sort-by:first-child'), 0.5, { width: '100px' }, 1);
				$('.category-item:first-child').each(function(){
					TweenMax.to($(this), 0.5, { width: '100px' }, 1);
				});

				TweenMax.to($('.infographic-data-wrapper'), 0.5, { width: '720px' }, 1);
				TweenMax.to($('.row-wrapper'), 0.5, { width: '720px' }, 1);

			}else{
				$('.category-item:first-child label').each(function(){
					this.style.width = 'calc(100% - 60px)';
				});
				TweenMax.to($('.sort-by:first-child'), 0.5, { width: '210px' }, 1);

				$('.category-item:first-child').each(function(){
					TweenMax.to($(this), 0.5, { width: '210px' }, 1);
				});
				TweenMax.to($('.infographic-data-wrapper'), 0.5, { width: '840px' }, 1);
				TweenMax.to($('.row-wrapper'), 0.5, { width: '840px' }, 1);
			}

			$('.category-item:first-child').each(function(){
				this.style.transform = translate(x, 0);
			});
		});

	}
	


	function translate( x, y) {
		return 'translate(' + x + 'px, ' + y + 'px)';
	}

	$('.q-button').click(function(e){
		$('.q-button').removeClass('q-active');

		var q = $(e.currentTarget).attr('data-attr');
		var filename = q + '-' + year + '.json';

		$(e.currentTarget).addClass('q-active');
		data_list = new Array();
		$.getJSON('data/'+filename, function(result){
			config = result.config;
	        $.each(result.data, function(i, field){
	        	
	        	data_list.push(field);
	    		
	        });

	        curr = sortBy( data_list, true, 'traffics');

	        generateVList(curr);
	        animate();
	        
	    });
	});
	$.getJSON('data/'+filename, function(result){
		config = result.config;
        $.each(result.data, function(i, field){
        	
        	data_list.push(field);
    		
        });

        curr = sortBy( data_list, true, 'traffics');

        generateVList(curr);
        animate();
        
    });


	function Filter( filter ){
		generateVList(data_list);
		$('.row').css('display', 'none');		

		filterList = [];
		$('.row').each(function(){
			var key = $(this).attr('data-key');
			switch( filter.length ){
				case 1 : if( $(this).hasClass(filter[0])){
							filterList.push(data_list[key]);
						}
					break;
				case 2 : if( $(this).hasClass(filter[0]) && 
							 $(this).hasClass(filter[1]) 
							){
							filterList.push(data_list[key]);
						}
					break;
				case 3 : if( $(this).hasClass(filter[0]) && 
							 $(this).hasClass(filter[1]) && 
							 $(this).hasClass(filter[2])
						   ){
							filterList.push(data_list[key]);
						}
					break;
				default : 	filterList.push(data_list[key]);
							
					break;
			}
		});
		curr = filterList;
		generateVList(filterList);
		animate();


	}

	$('.sort_by').on('change', function(){

		filter 		= new Array();
		$('.sort_by').each(function(){
			if( $(this).val() != ''){
				filter.push($(this).val());	
			}
		});

		Filter(filter);
	});

    $('.sort-by').on('click', function(e){
		
		var sort = 'up';
		var _el = $(e.target).attr('data-attr');

		if( _el !== undefined){
			if( $(e.target).hasClass('active')){
				if( up ){
					up = false;
					sort = 'down';
				}else{
					up = true;
					sort = 'up';
				}
			}else{
				up = true;
				sort = 'up';
			}

			$('.active').removeClass('active');
			
			$(this).addClass('active');

			$('.active').removeClass('up');
			$('.active').removeClass('down');
			
			$(this).addClass(sort);
			
			var arrSort = sortBy(curr, up, _el);

			generateVList(arrSort);
			animate();			
		}

		// execute only for mobile
		if( $(window).width() < 768){
			$('.category-item:first-child').each(function(){
				this.style.transform = translate(x, 0);
			});
			if( x > 0){
				$('.sort-by:first-child').css( 'width', '100px');
				$('.category-item:first-child').each(function(){
					this.style.width = '100px';
				});

				$('.category-item:first-child label').each(function(){
					this.style.width = '0px';
				});
			}else{
				$('.sort-by:first-child').css( 'width', '210px');
				$('.category-item:first-child').each(function(){
					this.style.width = '210px';
				});
			}
		}
	});

    function sortBy( arr, order, property){
    	var arrSort = arr.slice(0);
    	arrSort.sort(function(a,b) {
    		if( property != 'app'){
				if( ! order) {//ascending
					return a[property] - b[property];
				} else { // descending
					return b[property] - a[property];
				}
			}else{
				if( ! order) {//ascending
					return b[property] - a[property];
				} else { // descending
					return a[property] - b[property];
				}
			}
		});

    	return arrSort;
    }
    

	function animate(){

		var obj = $('.percent');
	    obj.each(function () {
	      var w = $(this).attr('data-width');
	      TweenMax.to($(this), 0.5, { width: w+'%' }, 1);
	    });
		
	}

    function generateVList(data) {

	    var bigAssList = [];

	    for (var i = 0; i < data.length; i++) {
	    	var html = '';

	    	var iema 		= data[i].iema_winner ? 'iema' : '';
	    	var verified 	= data[i].verified ? 'verified' : '';

			var _wTraffics 	= data[i].traffics / parseInt(config.max_traffics) * 100; 
			var _wApp = 1 / data[i].app * 100 ; 
			var _wTwitter 	= data[i].twitter / config.max_twitter * 100; 
			var _wInstagram = data[i].instagram / config.max_instagram * 100; 
			var _wFacebook 	= data[i].facebook / config.max_facebook * 100; 
			var _wEmployees = data[i].employees / config.max_employees * 100; 


	    	html += '<div class="category-item col bg__grey ' + iema +' ' + verified + '">';
	    	html += '<span><a href="' + data[i].url + '" class="color__black" target="_blank" rel="noopener">';
	    	html += '<img src="assets/img/'+ data[i].logodesktop + '"/>';
	    	html += '<label>'+data[i].name+'</label></a></span>';
	    	html += '</div>'

	    	html += '<div class="category-item col bg__grey ">';
	    	html += '<span><p class="percent animate-width" data-width="'+_wTraffics+'">'+data[i].traffics.toLocaleString()+'</p></span>';
	    	html += '</div>';

	    	html += '<div class="category-item col bg__grey ">';
	    	html += '<span><p class="percent animate-width" data-width="'+_wApp+'">'+  (data[i].app == 99 ? 'n/a' : data[i].app.toLocaleString()) +'</p></span>';
	    	html += '</div>';

	    	html += '<div class="category-item col bg__grey ">';
	    	html += '<span><p class="percent animate-width" data-width="'+_wTwitter+'">'+ (data[i].twitter == 0 ? 'n/a' : data[i].twitter.toLocaleString()) +'</p></span>';
	    	html += '</div>';

	    	html += '<div class="category-item col bg__grey ">';
	    	html += '<span><p class="percent animate-width" data-width="'+_wInstagram+'">'+ (data[i].instagram == 0 ? 'n/a' : data[i].instagram.toLocaleString()) +'</p></span>';
	    	html += '</div>';

	    	html += '<div class="category-item col bg__grey ">';
	    	html += '<span><p class="percent animate-width" data-width="'+_wFacebook+'">'+ (data[i].facebook == 0 ? 'n/a' : data[i].facebook.toLocaleString()) +'</p></span>';
	    	html += '</div>';

	    	html += '<div class="category-item col bg__grey ">';
	    	html += '<span><p class="percent animate-width" data-width="'+_wEmployees+'">'+ (data[i].employees == 0 ? 'n/a' : data[i].employees.toLocaleString()) +'</p></span>';
	    	html += '</div>';

	    	var _el = document.createElement('div');
			_el.setAttribute('class', 'row  '+ data[i].category + ' ' + data[i].location + ' ' + data[i].type);
			_el.setAttribute('data-order', i+1);
			_el.setAttribute('data-key', data[i].key);


	    	_el.innerHTML = html;
			bigAssList.push(_el);
	    }

	    var _width = $(window).width();
	    var itemH = 35, _h = 52; 

	    list = new VirtualList({
	      w: $('#data').width(),
	      h: _h * data.length,
	      items: bigAssList,
	      itemHeight: itemH,
	      cache: true
	    });
	    $('#data').html('');
	    $('#data').append(list.container);
	    
	}

	function getLang(){

		
		var query = window.location.search.substring(1);
		var vars = query.split("&");

		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == 'lang'){
				lang = pair[1];
			}
		}
		$.getJSON('data/translation.json', function(result){
			
			switch( lang ){
				case 'id' :  trans = result.id;

					break;
				case 'th' :  trans = result.th;
							
					break;
				case 'vn' :  trans = result.vn;
							
					break;
				case 'my' :  trans = result.my;
					break;
				default   :  trans = result.en;
					break;
			}  

			translateLang(trans);


		});
		
	}

	function translateLang(trans){
		$('.filterYear').html(trans.filterYear);
		$('.filterQuartal').html(trans.filterQuartal);
		$('.verifiedText').html(trans.verifiedText);
		$('.awardText').html(trans.awardText);
		$('.merchantTitle').html(trans.merchantTitle);
		$('.monthlyTitle').html(trans.monthlyTitle);
		$('.employeeTitle').html( trans.employeeTitle );
		$('.filterResultsBy').html( trans.filterResultsBy );
		$('.filter').find('select').each(function(){
			$(this).empty();
			if( $(this).hasClass('business_model')){
				$(this).append('<option value="">'+trans.businessTitle+'</option>');
				$.each(trans.options.business_model, function(key, value){
					$('.business_model').append('<option value="'+key+'">'+value+'</option>')
				});
			}else if( $(this).hasClass('store_type')){
				$(this).append('<option value="">'+trans.storeTitle+'</option>');
				$.each(trans.options.store_type, function(key, value){
					$('.store_type').append('<option value="'+key+'">'+value+'</option>')
				});
			}else if( $(this).hasClass('store_origin')){
				$(this).append('<option value="">'+trans.originTitle+'</option>');
				$.each(trans.options.store_origin, function(key, value){
					$('.store_origin').append('<option value="'+key+'">'+value+'</option>')
				});
			}
		});
	}
	getLang();
    
});