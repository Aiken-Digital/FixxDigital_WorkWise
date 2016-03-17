if ($("aside.article-share").length > 0) {
	$(window).scroll(function() { 
		$("aside.article-share").toggleClass("top", $(window).scrollTop() > 140); 
		var tagsPos = $(".single-article").height() -500;
		console.log(tagsPos +' baby');
		$("aside.article-share").toggleClass("disappear", $(window).scrollTop() > tagsPos); 
	});
};

var urlPerPage = 9;

$(window).resize(function() {
	if ($( window ).width() < 922) {
		urlPerPage = 3;
	} else {
		urlPerPage = 9;
	};
});

$( document ).ready(function() { 

	new WOW().init();
	
	$(".nav_resp li:last-child").click(function() {
		$(".navbar-resp").toggleClass("open")
	});

	var carousel_hero_content = new Swiper (".carousel-hero-content", {
		effect: "fade",
		simulateTouch: false,
		observer: true,
		observeParents: true,

		pagination: '.carousel-hero-content .swiper-pagination',
		paginationClickable: true,

		onSlideChangeStart: function(){ 
	    	carousel_hero_bg.slideTo(carousel_hero_content.activeIndex, 400);
	    }
	});

	var carousel_hero_bg = new Swiper (".carousel-hero", {
		observer: true,
		observeParents: true,

		autoplay: 3000,

	    onSlideChangeStart: function(){ 
	    	carousel_hero_content.slideTo(carousel_hero_bg.activeIndex, 400);
	    }
	});

	var carousel_trending = new Swiper (".carousel-trending", {
	    pagination: '.carousel-trending .swiper-pagination',
		paginationClickable: true,
		autoHeight: true,
	});





	var galleryContent = new Swiper('.gallery-content', {
		observer: true,
		observeParents: true,
		initialSlide: 0,
		onSlideChangeStart: function(){ 
			galleryBig.slideTo(galleryContent.activeIndex, 400);
	    }
	});

	var galleryBig = new Swiper('.gallery-big', {
		observer: true,
		observeParents: true,
		initialSlide: 0,

		onSlideChangeStart: function(){
			galleryThumbs.slideTo(galleryBig.activeIndex, 400);
			galleryContent.slideTo(galleryBig.activeIndex, 400);
		},

		pagination: '.gallery-big .swiper-pagination',
	});

	var galleryThumbs = new Swiper('.gallery-thumbs', {
		centeredSlides: true,
		slidesPerView: 'auto',
		slideToClickedSlide: true,

		onSlideChangeStart: function(){
			galleryBig.slideTo(galleryThumbs.activeIndex, 400);
		},

		onInit: function(){
			var $galleryThumbsDiv = $(".gallery-thumbs");
			if ($galleryThumbsDiv.find(".swiper-slide").length == 2) {
				$galleryThumbsDiv.addClass("two");
			} else if ($galleryThumbsDiv.find(".swiper-slide").length == 3) {
				$galleryThumbsDiv.addClass("three");
			} else if ($galleryThumbsDiv.find(".swiper-slide").length == 4) {
				$galleryThumbsDiv.addClass("four");
			}
		},

		nextButton: '.swiper-parent .swiper-button-next',
		prevButton: '.swiper-parent .swiper-button-prev',
	});




	// PAGE DESCRIPTION: FOR PHASE TWO (HIDE FOR PHASE 1)
	// $(".learnmore").click(function() { 
	// 	$(".page-description-content").toggleClass("show");
	// });

	var descContentArt = new Swiper('.page-description-content-articles', {
		initialSlide: 0,
		slidesPerView: "auto",
		observer: true,
		observeParents: true,

		nextButton: '.swiper-parentContainer .swiper-button-next',
		prevButton: '.swiper-parentContainer .swiper-button-prev',
		pagination: '.swiper-parentContainer .swiper-pagination',

		onInit: function(){
			var $specialSlider = $(".page-description-content-articles");
			if ($specialSlider.find(".swiper-slide").length == 1) {
				$specialSlider.addClass("one");
			} else if ($specialSlider.find(".swiper-slide").length == 2) {
				$specialSlider.addClass("two");
			}
		},
	});





	var urlPage = 1;
	var urlString = '';
	var urlStringQoutes = '';

	$('.loadmore p').click(function(){
		if ($( window ).width() < 922) {
			urlPerPage = 3;
		} else {
			urlPerPage = 9;
		};

		urlPage += 1;
		urlString = '/articles?per_page='+urlPerPage+'&page='+urlPage+'&category=employers';
		urlStringQoutes = '/quotes';

		$.ajax({
			// url: urlStringQoutes
			url: 'assets/js/app_data_qoutes.json',
			type: 'GET',
			dataType: "json",
			
			success: function(data, textStatus, jqXHR) {
				var qoutes = data["Response"]["Rows"];

				var newQoute = '';				
				var chosen = qoutes[Math.floor(Math.random()*qoutes.length)];

				var qouteText = chosen["Text"];
				var qouteType = chosen["Type"];
				var qouteImage = chosen["Image"];
				var qouteVideo = chosen["VideoId"];

				newQoute = "<div class='row dotted qoutes-"+qouteType+" toggle wow fadeInDown'> <div class='col-md-8 col-md-offset-2 col-xs-12'> <p> <span> “ </span> <span class='text'>"+qouteText+"</span> <span> ” </span> </p> </div> </div> ";

				if (qouteType == "image") {
					newQoute = "<div class='row dotted qoutes-"+qouteType+" toggle wow fadeInDown'> <div class='col-md-4 col-md-offset-2 col-xs-12'> <figure> <img src='"+qouteImage+"'> </figure> </div> <div class='col-md-5 col-xs-12 col-xs-offset-0'> <p class='title'> <span>"+qouteText+"</span> </p> </div> </div> ";
				};

				if (qouteType == "video") {
					newQoute = "<div class='row dotted qoutes-"+qouteType+" toggle wow fadeInDown'> <div class='col-md-4 col-md-offset-2 col-xs-12'> <figure> <img src='"+qouteImage+"'> <span class='overlay'> <a href='https://www.youtube.com/embed/"+qouteVideo+"?wmode=transparent'></a> </span> </figure> </div> <div class='col-md-5 col-xs-12 col-xs-offset-0'> <p class='title'> <span>"+qouteText+"</span> </p> </div> </div> ";
				};

				$(".categories .container").append(newQoute);
				


				var newQoute2 = '';
				var chosen2 = qoutes[Math.floor(Math.random()*qoutes.length)];

				if (chosen == chosen2) {
					chosen2 = qoutes[Math.floor(Math.random()*qoutes.length)];
				};

				var qouteText2 = chosen2["Text"];
				var qouteType2 = chosen2["Type"];
				var qouteImage2 = chosen2["Image"];
				var qouteVideo2 = chosen2["VideoId"];

				newQoute2 = "<div class='row dotted qoutes-"+qouteType2+" toggle wow fadeInDown'> <div class='col-md-8 col-md-offset-2 col-xs-12'> <p> <span> “ </span> <span class='text'>"+qouteText2+"</span> <span> ” </span> </p> </div> </div> ";

				if (qouteType2 == "image") {
					newQoute2 = "<div class='row dotted qoutes-"+qouteType2+" toggle wow fadeInDown'> <div class='col-md-4 col-md-offset-2 col-xs-12'> <figure> <img src='"+qouteImage2+"'> </figure> </div> <div class='col-md-5 col-xs-12 col-xs-offset-0'> <p class='title'> <span>"+qouteText2+"</span> </p> </div> </div> ";
				};

				if (qouteType2 == "video") {
					newQoute2 = "<div class='row dotted qoutes-"+qouteType2+" toggle wow fadeInDown'> <div class='col-md-4 col-md-offset-2 col-xs-12'> <figure> <img src='"+qouteImage2+"'> <span class='overlay'> <a href='https://www.youtube.com/embed/"+qouteVideo2+"?wmode=transparent'></a> </span> </figure> </div> <div class='col-md-5 col-xs-12 col-xs-offset-0'> <p class='title'> <span>"+qouteText2+"</span> </p> </div> </div> ";
				};

				$(".divider .container").html(newQoute2);
			},

			error: function() {
				console.log('failed');
			},
		});

		$.ajax({
			// url: urlString
			url: 'assets/js/app_data.json',
			type: 'GET',
			dataType: "json",
			
			success: function(data, textStatus, jqXHR) {
				var appendRowArcticle = '';
				for (var i = 0; i < urlPerPage; i++) {
					var title = data["Response"]["Rows"][i]["Title"];
					var date = data["Response"]["Rows"][i]["Date"];
					var type = data["Response"]["Rows"][i]["Type"];
					var image = data["Response"]["Rows"][i]["Image"];
					var desc = data["Response"]["Rows"][i]["Description"];
					var url = data["Response"]["Rows"][i]["ArticleUrl"];

					var appendArcticle = "<div class='col-md-4 col-xs-12 col-sm-12'> <article> <figure class='"+type+"'> <img src='"+image+"'> <span> <a href='#category-label'> "+type+" </a> </span> </figure> <time datetime='2015-11-27' pubdate> "+date+" </time> <header> <a href='"+url+"'>"+title+"</a> </header> <p>"+desc+"</p> </article> </div>";
					
					if (type == "video") {
						appendArcticle = "<div class='col-md-4 col-xs-12 col-sm-12'> <article> <figure class='"+type+"'> <img src='"+image+"'> <span> <a href='#category-label'> "+type+" </a> </span> <span class='overlay'> <a href='"+url+"'> </a> </span> </figure> <time datetime='2015-11-27' pubdate> "+date+" </time> <header> <a href='"+url+"'>"+title+"</a> </header> <p>"+desc+"</p> </article> </div>";
					};

					// opening row tag
					if (i%3 == 0) {
						appendRowArcticle += "<div class='row content wow fadeInDown'>"+appendArcticle;
					}

					// closing row tag
					else if (i%3 == 2) {
						appendRowArcticle += appendArcticle+"</div>";
					}

					else {
						appendRowArcticle += appendArcticle;
					}
				};

				$(".categories .container").append(appendRowArcticle);
			},

			error: function() {
				console.log('failed');
			},
		});
	});


});