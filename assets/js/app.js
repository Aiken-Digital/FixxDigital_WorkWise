if ($("aside.article-share").length > 0) {
	$(window).scroll(function() { 
		$("aside.article-share").toggleClass("top", $(window).scrollTop() > 140); 
		var tagsPos = $(".tags").position();
		$("aside.article-share").toggleClass("disappear", $(window).scrollTop() > tagsPos.top); 
	});
};

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


});