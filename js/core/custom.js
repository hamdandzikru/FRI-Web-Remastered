jQuery(document).ready(function(){ 
	"use strict";

	jQuery(document).setNav();
	
	var moduloThumbnail = false;
	if(avanteParams.lightboxthumbnails == 'thumbnail')
	{
		moduloThumbnail = true;
	}
	
	var lightboxTimer = avanteParams.lightboxthumbnails;
	
	// create instance of ModuloBox
	var mobx = '';
	
	mobx = new ModuloBox({
	    // options
	    mediaSelector : '.tg_gallery_lightbox, .woocommerce-product-gallery__image a',
	    scrollToZoom  : true,
	    controls : ['zoom', 'play', 'fullScreen', 'share', 'close'],
	    shareButtons  : ['facebook', 'googleplus', 'twitter', 'pinterest', 'linkedin'],
	    slideShowInterval : parseInt(lightboxTimer),
	    countTimer: true,
	    thumbnails: moduloThumbnail,
	    videoAutoPlay: true,
	    thumbnailSizes : {
		    1920 : {          // browser width in 'px'
		        width  : 110, // thumbnail width in 'px' - 0 in width will hide thumbnails
		        height : 80,  // thumbnail height in 'px' - 0 in height will hide thumbnails
		        gutter : 10   // gutter width in 'px' between thumbnails
		    },
		    1280 : {
		        width  : 90,
		        height : 65,
		        gutter : 10
		    },
		    680 : {
		        width  : 70,
		        height : 50,
		        gutter : 8
		    },
		    480 : {
		        width  : 60,
		        height : 44,
		        gutter : 5
		    }
		}
	});
	
	// initialize the instance	
	mobx.init();
	
	jQuery(window).resize(function(){
		//Resize main menu
		jQuery(document).setNav();
		
		if(jQuery(this).width() < 768)
		{
			//Remove sticky sidebar for mobile & tablet devices
		    jQuery("#page-content-wrapper .sidebar-wrapper").trigger("sticky_kit:detach");
		}
		else
		{
			//Calculate wrapper padding top value
			if(avanteParams.headercontent == 'menu')
			{
				jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.main-menu-wrapper').height())+'px');
			}
			else
			{
				jQuery('#wrapper').css('paddingTop', parseInt(jQuery('#elementor-header').height())+'px');
			}
			
			//Reset menu padding top and bottom
			jQuery('#menu-wrapper div .nav > li > a').attr('style', '');
			jQuery('#menu-wrapper div .nav > li > a').attr('style', '');
		}
		
		//Calculate revolution slider height
		if(jQuery('.page_slider.menu_transparent').find('.rev_slider_wrapper').length > 0)
		{
			var sliderHeight = jQuery('.page_slider.menu_transparent').find('.rev_slider_wrapper').height();
			var topBarHeight = jQuery('.top-menu-bar').height();
			
			if(jQuery('.above-top-menu-bar').length > 0)
			{
				topBarHeight+= jQuery('.above-top-menu-bar').height();
			}
			
			if(jQuery('.page_slider.menu_transparent').find('.rev_slider_wrapper.fullscreen-container').length > 0)
			{
				var topBarHeight = 55;
			}
	
			jQuery('#page-content-wrapper').css('marginTop', sliderHeight-topBarHeight+'px');
		}
	});
    
    jQuery('#menu_expand_wrapper a').on( 'click', function(){
    	jQuery('#menu-wrapper').fadeIn();
	    jQuery('#custom_logo').animate({'left': '15px', 'opacity': 1}, 400);
	    jQuery('#menu_close').animate({'left': '-10px', 'opacity': 1}, 400);
	    jQuery(this).animate({'left': '-60px', 'opacity': 0}, 400);
	    jQuery('#menu-border-wrapper select').animate({'left': '0', 'opacity': 1}, 400).fadeIn();
    });
	
	jQuery('#menu_close').on( 'click', function(){
		jQuery('#custom_logo').animate({'left': '-200px', 'opacity': 0}, 400);
	    jQuery(this).stop().animate({'left': '-200px', 'opacity': 0}, 400);
	    jQuery('#menu_expand_wrapper a').animate({'left': '20px', 'opacity': 1}, 400);
	    jQuery('#menu-border-wrapper select').animate({'left': '-200px', 'opacity': 0}, 400).fadeOut();
	    jQuery('#menu-wrapper').fadeOut();
	});
    
    //Add to top button when scrolling
    jQuery(window).scroll(function() {
	 	var calScreenWidth = jQuery(window).width();
		
		if(jQuery(this).scrollTop() > 200) {
		    jQuery('#go-to-top').stop().css({opacity: 1, "visibility": "visible"}).animate({"visibility": "visible"}, {duration:1000});
		    jQuery('.icon-scroll').hide();
		} else if(jQuery(this).scrollTop() == 0) {
		    jQuery('#go-to-top').stop().css({opacity: 0, "visibility": "hidden"}).animate({"visibility": "hidden"}, {duration:1500});
		    jQuery('.icon-scroll').show();
		}
	});
 
	jQuery('#go-to-top').on( 'click', function() {
		jQuery('body,html').animate({scrollTop:0},800);
	});
	
	jQuery('#single-course-enroll').on( 'click', function() {
		jQuery('.lp-course-buttons form.purchase-course').trigger('submit');
		jQuery('.lp-course-buttons form.enroll-course').trigger('submit');	
	});
	
	var isDisableDragging = jQuery('#pp_enable_dragging').val();
	
	if(isDisableDragging!='')
	{
		jQuery("img").mousedown(function(){
		    return false;
		});
	}
	
	if(avanteParams.topbar==0)
	{
		var topBarHeight = jQuery('.main-menu-wrapper').height();
	}
	else
	{
		var topBarHeight = parseInt(jQuery('.main-menu-wrapper').height()-jQuery('.main-menu-wrapper .above-top-menu-bar').height());
	}
	
	var logoHeight = jQuery('#custom_logo img').height();
	var logoTransHeight = jQuery('#custom_logo_transparent img').height();
	var logoMargin = parseInt(jQuery('#custom_logo').css('marginTop'));
	var logoTransMargin = parseInt(jQuery('#custom_logo_transparent').css('marginTop'));
	var menuPaddingTop = parseInt(jQuery('#menu-wrapper div .nav li > a').css('paddingTop'));
	var menuPaddingBottom = parseInt(jQuery('#menu-wrapper div .nav li > a').css('paddingBottom'));
	var SearchPaddingTop = parseInt(jQuery('.top-menu-bar #searchform button').css('paddingTop'));
	var menuLayout = avanteParams.menulayout;
	var fixedMenu = avanteParams.fixedmenu;

	if(menuLayout != 'leftmenu' || jQuery(window).width()<=768)
	{
		//Calculate wrapper padding top value
		if(avanteParams.headercontent == 'menu')
		{
			jQuery('#wrapper').css('paddingTop', parseInt(jQuery('.main-menu-wrapper').height())+'px');
		}
		else
		{
			jQuery('#wrapper').css('paddingTop', parseInt(jQuery('#elementor-header').height())+'px');
			setTimeout(function () { jQuery('#wrapper').css('paddingTop', parseInt(jQuery('#elementor-header').height())+'px'); }, 200);
			setTimeout(function () { jQuery('#wrapper').css('paddingTop', parseInt(jQuery('#elementor-header').height())+'px'); }, 1000);
		}
	}
	
	if(menuLayout != 'leftmenu' || jQuery(window).width()<=960)
	{	
		jQuery(window).scroll(function(){
			if(fixedMenu==1 && jQuery('html').data('style') != 'fullscreen'  && jQuery('html').data('style') != 'fullscreen_white')
			{
				if(jQuery(this).scrollTop() >= 100){
					jQuery('.extend_top-contact-info').hide();
					
					jQuery('.main-menu-wrapper').addClass('scroll');
					jQuery('.top-menu-bar').addClass('scroll');
					
					if(jQuery('.top-menu-bar').hasClass('hasbg'))
					{
					    jQuery('.top-menu-bar').removeClass('hasbg');
					    jQuery('.top-menu-bar').data('hasbg', 1);
					    
					    jQuery('#custom_logo').removeClass('hidden');
					    jQuery('#custom_logo_transparent').addClass('hidden');
					}
			    }
			    else if(jQuery(this).scrollTop() < 100)
			    {
			    	jQuery('.extend_top-contact-info').show();
				    
				    jQuery('#custom_logo img').removeClass('zoom');
				    jQuery('#custom_logo img').css('maxHeight', '');
					jQuery('#custom_logo_transparent img').removeClass('zoom');
				    
				    jQuery('#custom_logo').css('marginTop', parseInt(logoMargin)+'px');
					jQuery('#custom_logo_transparent').css('marginTop', parseInt(logoTransMargin)+'px');
					
					jQuery('#menu-wrapper div .nav > li > a').css('paddingTop', menuPaddingTop+'px');
					jQuery('#menu-wrapper div .nav > li > a').css('paddingBottom', menuPaddingBottom+'px');
					
					if(jQuery('.top-menu-bar').data('hasbg')==1)
					{
					    jQuery('.top-menu-bar').addClass('hasbg');
					    jQuery('#custom_logo').addClass('hidden');
					    jQuery('#custom_logo_transparent').removeClass('hidden');
					}
					
					jQuery('.main-menu-wrapper').removeClass('scroll');
					jQuery('.top-menu-bar').removeClass('scroll');
			    }
		   }
		   else
		   {
			   if(jQuery(this).scrollTop() >= 100)
			   {
			   		jQuery('.main-menu-wrapper').addClass('nofixed');
			   }
			   else
			   {
			   		jQuery('.main-menu-wrapper').removeClass('nofixed');
			   }
		   }
		});
	} //If not left menu layout
	
	
	//script for Elementor header
	jQuery(window).scroll(function(){
		if(fixedMenu==1)
		{
			if(jQuery(this).scrollTop() >= 100){
				jQuery('#elementor-header').removeClass('visible');
				jQuery('#elementor-sticky-header').addClass('visible');
		    }
		    else if(jQuery(this).scrollTop() < 100)
		    {
				jQuery('#elementor-header').addClass('visible');
				jQuery('#elementor-sticky-header').removeClass('visible');
			}
	   }
	});
	
	jQuery(document).mouseenter(function()
	{	
	    jQuery('body').addClass('hover');	
	});	
	
	jQuery(document).mouseleave(function()
	{	
	    jQuery('body').removeClass('hover');	
	});	
	
	jQuery('#post_more_close').on( 'click', function(){
		jQuery('#post_more_wrapper').animate({ right: '-380px' }, 300);
		
		return false;
	});
	
	jQuery('#mobile-nav-icon, #elementor_mobile_nav, .elementor_mobile_nav').on( 'click', function() {
		jQuery('body').toggleClass('js-nav');
		jQuery('body').toggleClass('modalview');
		jQuery('#btn-close-mobile-menu').addClass('open');
		
		if(is_touch_device())
		{
			jQuery('body.js-nav').css('overflow', 'auto');
		}
	});
	
	jQuery('#btn-close-mobile-menu').on( 'click', function() {
		jQuery('body').removeClass('js-nav');
		setTimeout(function () { jQuery('body').toggleClass('modalview'); }, 400);
		jQuery(this).removeClass('open');
	});
	
	jQuery('.mobile-menu-close a, #mobile-menu-close').on( 'click', function() {
		jQuery('body').removeClass('js-nav');
		setTimeout(function () { jQuery('body').toggleClass('modalview'); }, 400);
		jQuery('#btn-close-mobile-menu').removeClass('open');
	});
		
	jQuery('.post_share').on( 'click', function() {
		var targetShareID = jQuery(this).attr('data-share');
		var targetParentID = jQuery(this).attr('data-parent');
		
		jQuery(this).toggleClass('visible');
		jQuery('#'+targetShareID).toggleClass('slideUp');
		jQuery('#'+targetParentID).toggleClass('sharing');
		
		return false;
	});
	
	
	if(jQuery('.page_slider.menu_transparent').find('.rev_slider_wrapper').length > 0)
	{
		var sliderHeight = jQuery('.page_slider.menu_transparent').find('.rev_slider_wrapper').height();
		var topBarHeight = jQuery('.top-menu-bar').height();
		
		if(jQuery('.above-top-menu-bar').length > 0)
		{
			topBarHeight+= jQuery('.above-top-menu-bar').height();
		}
		
		if(jQuery('.page_slider.menu_transparent').find('.rev_slider_wrapper.fullscreen-container').length > 0)
		{
			var topBarHeight = 55;
		}

		jQuery('#page-content-wrapper').css('marginTop', sliderHeight-topBarHeight+'px');
	}
    
    jQuery('#demo_apply').on( 'click', function(){
    	jQuery('#ajax_loading').addClass('visible');
    	jQuery('body').addClass('loading');
    	jQuery("form#form_option").submit();
    });
    
    jQuery('#option_wrapper').mouseenter(function()
	{	
	    jQuery('body').addClass('overflow_hidden');	
	});	
	
	jQuery('#option_wrapper').mouseleave(function()
	{	
	    jQuery('body').removeClass('overflow_hidden');	
	});	
	
	var calScreenHeight = jQuery(window).height()-108;
	var miniRightPos = 800;
	
	jQuery('#overlay-background').on( 'click', function(){
		if(!jQuery('body').hasClass('js-nav'))
		{
			jQuery('#overlay-background').removeClass('visible');
			jQuery('#overlay-background').removeClass('share_open');
			jQuery('#fullscreen_share_wrapper').css('visibility', 'hidden');
		}
	});
    
    if(jQuery('.one.fullwidth.slideronly').length > 0)
	{
		jQuery('body').addClass('overflow_hidden');
	}
	
	// Find all YouTube & Vimeo videos
	jQuery('iframe[src*="youtube.com"]').each(function() {
		jQuery(this).wrap('<div class="video-container"></div>');
	});
	
	jQuery('iframe[src*="vimeo.com"]').each(function() {
		jQuery(this).wrap('<div class="video-container"></div>');
	});
	
	jQuery(".input-wrapper input").focusout(function(){
		if(jQuery(this).val() != "")
		{
			jQuery(this).addClass("has-content");
		} else {
			jQuery(this).removeClass("has-content");
		}
	});
	
	jQuery(window).scroll(function() {
	    var oVal;
	    oVal = jQuery(window).scrollTop() / 300;
	    if(oVal>1)
	    {
		    oVal = 1;
	    }
	    oVal = parseFloat(1-oVal);
	    
	    jQuery('#page-header.hasbg .page-title-wrapper .page-title-inner').css('opacity', oVal);
	    
	    var posVal = -(jQuery(window).scrollTop() * 0.005);
	    jQuery('#page-header.hasbg .page-title-wrapper .page-title-inner').css({'transform':'translate(0px,'+posVal+'px)'});
	});
	
	if(!is_touch_device())
	{
		jQuery('.stellar').each(function() {
			jQuery(this).attr('data-stellar-ratio', '1.2');
		});
		
		jQuery(window).stellar({
			positionProperty: 'transform',
			responsive: true,
			parallaxBackgrounds: false,
			horizontalScrolling: false,
			hideDistantElements: false,
		});
	}
	
	var isFooterReveal = avanteParams.footerreveal;;
	
	if(isFooterReveal!='')
	{
		var bumpIt = function() {
			if(jQuery(window).width() > 1024)
			{
				jQuery('#wrapper').css('margin-bottom', parseInt(jQuery('#footer-wrapper').height()));
			}
			else
			{
				jQuery('#wrapper').css('margin-bottom', 0);
			}
	    },
	    didResize = false;
	    
	    setInterval(function() {
			bumpIt();
		}, 250);
		
		jQuery(window).resize(function() {
		  didResize = true;
		});
		setInterval(function() {
		  if(didResize) {
		    didResize = false;
		    bumpIt();
		  }
		}, 250);
	}
	
	setTimeout(function () { jQuery('#elementor-header').addClass('visible'); }, 200);
	
	jQuery("body.single-lp-course .video-grid-wrapper").each(function() {
		var video = this.getElementsByClassName("video-card")[0];
		var id = jQuery(video).data('video-id');
		
		var play = document.createElement("div");
		var outline = document.createElement("div");
		var ring = document.createElement("div");
		var fill = document.createElement("div");
		var mask = document.createElement("div");
		var wipe = document.createElement("div");
		var wrap = document.createElement("div");

		var iframe = jQuery(this).find('.video-iframe-wrapper').html();

		TweenMax.set(play, {
			css:{
				width: 0,
				height: 0,
				"border-top": "10px solid transparent",
				"border-bottom": "10px solid transparent",
				"border-left": "14px solid white",
				"z-index": 2,
				position: 'absolute',
				top: "50%",
				left: "50%",
				marginLeft: "-4px",
				marginTop: "-9px"
			}
		});
		TweenMax.set(outline, {
			css:{
				width: 65,
				height: 65,
				border: "3px solid white",
				"border-radius": "999px",
				"z-index": 2,
				position: 'absolute',
				top: "50%",
				left: "50%",
				y: "-50%",
				x: "-50%"
			}
		});
		TweenMax.set(ring, {
			css:{
				width: 65,
				height: 65,
				border: "1px solid white",
				"border-radius": "999px",
				"z-index": 2,
				position: 'absolute',
				top: "50%",
				left: "50%",
				y: "-50%",
				x: "-50%"
			}
		});
		TweenMax.set(fill, {
			css:{
				width: 65,
				opacity: 0,
				height: 65,
				"background-color": "white",
				"border-radius": "999px",
				"z-index": 2,
				position: 'absolute',
				top: "50%",
				left: "50%",
				y: "-50%",
				x: "-50%"
			}
		});
		TweenMax.set(mask, {
			css:{
				width: 600,
				height: 600,
				scale: 1,
				opacity: 0,
				backgroundColor: "#fff",
				"border-radius": "300px",
				"z-index": 3,
				position: 'absolute',
				top: "50%",
				left: "50%",
				y: "-50%",
				x: "-50%"
			}
		});
		TweenMax.set(wipe, {
			css:{
				width: "100%",
				height: "100%",
				opacity: 0,
				backgroundColor: "#fff",
				"z-index": 5,
				position: 'absolute',
				top: "0",
				right: "0"
			}
		});
		TweenMax.set(wrap, {
			css:{
				width: "100%",
				height: "100%",
				autoAlpha: 0,
				"z-index": 4,
				position: 'absolute',
				top: "0",
				left: "0"
			}
		});
		
		video.appendChild(play);
		video.appendChild(outline);
		video.appendChild(ring);
		video.appendChild(fill);
		video.appendChild(mask);
		video.appendChild(wipe);
		jQuery(wrap).html(iframe);
		jQuery(wrap).attr('class', 'video-iframe-container');
		video.appendChild(wrap);
		
		
		
		jQuery(video).on("mouseenter", function(event) {
			TweenLite.killTweensOf([fill, outline, ring]);
			TweenLite.to(fill, 0.4, {opacity: 0.2, ease:"cubic-bezier(0.39, 0.575, 0.565, 1)"});	
			TweenLite.to(outline, 0.4, {scale: 0.9, ease:"cubic-bezier(0.39, 0.575, 0.565, 1)"});
			TweenLite.fromTo(ring, 0.7, {
				scale: 1, 
				opacity: 0.5
			},
			{
				scale: 2, 
				opacity: 0, 
				ease:"cubic-bezier(0.165, 0.84, 0.44, 1)"
			});
			TweenLite.to(play, 0.2, { 
				x: 8, 
				opacity: 0, 
				ease: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
				onComplete: function() {
					TweenLite.set(play,{
						x:-12, 
						onComplete: function() {
							TweenLite.to(play, 0.4, {
								x: 0,
								opacity: 1,
								ease: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
							});
						}
					});
				}
			});
		});
		
		jQuery(video).on("mouseleave", function(event) {
			TweenLite.killTweensOf([fill, outline]);
			TweenLite.to(fill, 0.4, {opacity: 0, ease:"cubic-bezier(0.39, 0.575, 0.565, 1)"});
			TweenLite.to(outline, 0.4, {scale: 1, ease:"cubic-bezier(0.39, 0.575, 0.565, 1)"});
		
		});
		
		jQuery(video).on("click", function(event) {
			event.preventDefault();
			
			TweenLite.fromTo(mask, 0.35, {
				opacity: 1,
				scale: 0
			},
			{
				scale: 1,
				ease: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
				onComplete: function() {
					TweenLite.set(mask, {
						opacity: 0,
						scale: 0,
						delay: 0.5,
						onComplete: function() {
							TweenLite.fromTo(wipe, 0.4, {
								width: "100%",
							},{
								width: 0,
								ease: "cubic-bezier(.42,0,.58,1)"			 
							});
						}
					});
				
					TweenLite.set(wipe, {
						opacity: 1,
					});
					
					TweenLite.set(wrap, {
						autoAlpha: 1,
					});
		
				}
			});
		});
	});
	
	//Apply all entrance animation
	jQuery('.smoove').each(function() {
		var minWidth = 1;
		if(typeof jQuery(this).attr('data-minwidth') != 'undefined')
		{
			minWidth = jQuery(this).attr('data-minwidth');
		}
		
		var offset = '20%';
		if(typeof jQuery(this).attr('data-offset') != 'undefined')
		{
			offset = jQuery(this).attr('data-offset');
		}
		
		jQuery(this).smoove({
			min_width : parseInt(minWidth),
			offset : offset
		});
	});
	
	jQuery('.widget_nav_menu ul > li.menu-item-has-children').on( 'click', function(){
		var parentMenu = jQuery(this);
		
		parentMenu.toggleClass('active');
		
		
		return false;
	});
	
	jQuery('li.widget_search').each(function() {
		var widgetWidth = jQuery(this).width();
		
		jQuery(this).find('form.search-form').width(widgetWidth);
	});
	
	jQuery(window).resize(function() {
		jQuery('li.widget_search').each(function() {
			var widgetWidth = jQuery(this).width();
			
			jQuery(this).find('form.search-form').width(widgetWidth);
		});
	});
	
	jQuery('li.widget_search form').focusin(function(){
		jQuery(this).addClass('focus');
	});
	
	jQuery('li.widget_search form').focusout(function(){
		jQuery(this).removeClass('focus');
	});
});

jQuery(window).on('resize load',adjustIframes);