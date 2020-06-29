var scrollbarWidth = 0;
jQuery.getScrollbarWidth = function() {
	if ( !scrollbarWidth ) {
		if ( jQuery.browser.msie ) {
			var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
					.css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body'),
				$textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
					.css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body');
			scrollbarWidth = $textarea1.width() - $textarea2.width();
			$textarea1.add($textarea2).remove();
		} else {
			var $div = jQuery('<div />')
				.css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
				.prependTo('body').append('<div />').find('div')
					.css({ width: '100%', height: 200 });
			scrollbarWidth = 100 - $div.width();
			$div.parent().remove();
		}
	}
	return scrollbarWidth;
};

/* Smartresize */
;(function($,sr){
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
	    var timeout;
	    return function debounced () {
	        var obj = this, args = arguments;
	        function delayed () {
	            if (!execAsap)
	                func.apply(obj, args);
	            timeout = null;
	        };
	        if (timeout)
	            clearTimeout(timeout);
        	else if (execAsap)
	            func.apply(obj, args);

	        timeout = setTimeout(delayed, threshold || 100);
	    };
	}
 	// smartresize 
 	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

/* End Portfolio */
jQuery(document).ready(function() {
	/* Portfolio */
	/********************************
	        CSS3 Animations
	********************************/
	jQuery(".be-animate").appear();
	jQuery(".be-animate").each(function () {

	        var $this = jQuery(this);
	        if ($this.is(':appeared')) {
	            $this.addClass("already-visible");
	            $this.addClass($this.attr('data-animation'));
	            $this.addClass('animated');
	        }
	});
	jQuery(document).on('appear', '.be-animate', function () {
	        var $this = jQuery(this);
	        if ($this.is(':appeared')) {
	            $this.addClass("already-visible");
	            $this.addClass($this.attr('data-animation'));
	            $this.addClass('animated');
	        }
	});

	jQuery(document).on('click', '.slider-popup', function (e) {
		e.preventDefault();
		jQuery('.gallery-slider-content').addClass("add-fix");
		jQuery("html").addClass("overflow-hidden");
		jQuery('.gallery-slider-content').html ('<i class="fa fa-spinner fa-spin"></i>');
		var $this = jQuery(this);
		setTimeout(function () {
	    	jQuery.ajax({
	            type : "GET",
	            url : $this.attr('data-href'),
	            success : function (data) {
	            	jQuery('.gallery-slider-content').html(data);
	            	
	            	jQuery('.carousel-slider').carousel({
				    	interval: false
					});
					jQuery('.carousel-control.left').click(function() {
					  jQuery('.carousel-slider').carousel('prev');
					});
					jQuery('.carousel-control.right').click(function() {
					  jQuery('.carousel-slider').carousel('next');
					});
					jQuery('.carousel-indicators li').bind('click', function(e){
						var index = jQuery(this).index();
						jQuery('.carousel-slider').carousel(index);
					});
					jQuery('.carousel-slider').css({'margin': 0, 'width': jQuery(window).outerWidth(), 'height': jQuery(window).outerHeight()});
					jQuery('.carousel-slider .item').css({'position': 'fixed', 'width': '100%', 'height': '100%'});
					jQuery('.carousel-inner div.item img').each(function() {
						var imgSrc = jQuery(this).attr('src');
						jQuery(this).parent().css({'background': 'url('+imgSrc+') center center no-repeat', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover', 'background-size': 'cover'});
						jQuery(this).remove();
					});
					jQuery(window).on('resize', function() {
						jQuery('.carousel-slider').css({'width': jQuery(window).outerWidth(), 'height': jQuery(window).outerHeight()});
					});
					jQuery(document).keyup(function(e) {
					  	if (e.keyCode == 27) {
					  		jQuery("html").removeClass("overflow-hidden"); 
					  		jQuery('.gallery-slider-content').html("");
					  		jQuery('.gallery-slider-content').removeClass("add-fix");
					  	}
					});
					jQuery(document).on('click', '.close-slider', function (e) {
				    	e.preventDefault();
				    	jQuery("html").removeClass("overflow-hidden"); 
						jQuery('.gallery-slider-content').html("");
						jQuery('.gallery-slider-content').removeClass("add-fix");
				    });
	            }
	        });
	    }, 300);
	});
	jQuery(document).on('mouseup', '#carousel-slider-generic, .carousel-control', function(e) {
		if(jQuery('.gallery_content').hasClass('show')) {
			jQuery('.gallery_content').removeClass('show');
		}
	});
	jQuery(document).on('click', '.single_portfolio_info_close', function (e) {
		e.preventDefault();
	    jQuery(this).closest('.gallery_content').toggleClass('show');
	});
	jQuery('.video-popup').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	jQuery(".image-popup-02").magnificPopup({
		type       : "image",
	  	image: {
	      	titleSrc: function(item) {
	            return 'title';
	      	},
	      	tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
	    },
		key        : "image-key",
		verticalFit: true,
		mainClass  : "image-popup-style", // This same class is used for video popup
		tError     : '<a href="%url%">The image</a> could not be loaded.',
		gallery    : {
			enabled: true,
			tCounter: '%curr% of %total%' // markup of counter
		},
		callbacks  : {
			open : function () {
				this.content.addClass("fadeInLeft");
			},
			close: function () {
				this.content.removeClass("fadeInLeft");
			}
		}
	});

	// Pretty photo
	//jQuery(".image-popup-01").prettyPhoto({hook: 'data-rel'});

	//jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({hook: 'data-rel'});

	/************************************
	    STICKY SIDEBAR
	************************************/
	function be_sticky_sidebar() {
	    if (jQuery(".floting-sidebar").length > 0) {
	    	var $page_content = ".post-formats-wrapper";
	    	var $sidebar = jQuery(".floting-sidebar"), $window = jQuery(window);
	    	var offset = $sidebar.offset();
	    	var $scrollOffset = jQuery(".post-formats-wrapper").offset();
	    	var mgb = 140;
	        $window.scroll(function () {
	        	var $scrollHeight = jQuery(".post-formats-wrapper").height(), $headerHeight = 0;
				if (jQuery('.navigation').hasClass('affix')) {                	
	                $headerHeight = parseInt(jQuery('.navigation').css('height'), 10);
	            } else {
	                $headerHeight = 0;
	            }
	            if ($window.width() > 960) {
	                if ($window.scrollTop() + $headerHeight + 3 > offset.top) {
	                    if ($window.scrollTop() + $headerHeight + $sidebar.height() + mgb < $scrollOffset.top + $scrollHeight) {
	                        $sidebar.stop().animate({
	                            marginTop: $window.scrollTop() - offset.top + $headerHeight
	                        });
	                    } else {
	                    //    $sidebar.stop().animate({
	                    //        marginTop: ($scrollHeight - $sidebar.height() - 80) -30
	                    //    });
	                    }
	                } else {
	                    $sidebar.stop().animate({
	                        marginTop: 0
	                    });
	                }
	            } else {
	                $sidebar.css('margin-top', 0);
	            }
	        });
	    }
	}
	//be_sticky_sidebar();

	function portfolio_layout() {
		var $container = jQuery('.content_portfolio');
	    $container.each(function () {
	        var $this = jQuery(this), $width, $col, $width_unit, $height_unit;
	        var $spacing = 0;
	        if($this.closest('.wapper_portfolio').hasClass('gutter')) {
	        	$spacing = 20;
	        }

	        $this.css({
	            width: '100%'
	        });

	        if($this.find('.item_portfolio').hasClass('five-col')) {
	            $col = 5;
	        } else if($this.find('.item_portfolio').hasClass('four-col')) {
	            $col = 4;
	        } else if($this.find('.item_portfolio').hasClass('three-col')) {
	            $col = 3;
	        }else if($this.find('.item_portfolio').hasClass('two-col')) {
	        	$col = 2;
	        }else {
	        	$col = 1;
	        }
	        
	        if ($col != 1) {
		        if(($this.closest('.portfolio_column').width()+$spacing) < (768-jQuery.getScrollbarWidth())) {
		            $col = 2;
		        }
		        if(($this.closest('.portfolio_column').width()+$spacing) < (480-jQuery.getScrollbarWidth())) {
		            $col = 1;
		            $spacing = 0;
		        }
		    }

	        $width_unit = Math.floor((parseInt($this.closest('.portfolio_column').width(), 10) - ($col-1)*$spacing )/ $col);
	        $height_unit = Math.floor(parseInt($width_unit/1.5, 10));
	    	
	        $this.find('.item_portfolio').css({
	            width: $width_unit
	        });
	        if ($col == 1) {
	            $height_unit = 'auto';
		    }

		    if ($this.closest('.wapper_portfolio').hasClass('multigrid')) {
			    $this.find('.item_portfolio .portfolio-image').css({
		            height: $height_unit
		        });
		    }
	        if($this.closest('.wapper_portfolio').hasClass('multigrid')) {
	            if ($this.find('.item_portfolio').hasClass('height_large') && $col != 1) {
	            	$this.find('.item_portfolio.height_large .portfolio-image').css({
			            height: $height_unit*2+$spacing
			        });
	            }
	            if ($this.find('.item_portfolio').hasClass('item_large') && $col != 1) {
	            	$width = $width_unit*2 +$spacing;
	                $this.find('.item_portfolio.item_large').css({
			            width: $width
			        });
	            }
	        }

	       	$this.imagesLoaded(function () {
	       		$this.css({
		            width: parseInt($this.closest('.portfolio_column').width(), 10)
		        });
	            if($this.closest('.wapper_portfolio').hasClass('gutter')) {
	                $this.isotope({
	                    itemSelector : '.item_portfolio',
	                    masonry: {
	                        columnWidth : $width_unit,
	                        gutter: $spacing
	                    }
	                });
	            }else {
	                $this.isotope({
	                    itemSelector : '.item_portfolio',
	                    masonry: {
	                        columnWidth : $width_unit
	                    }
	                });
	            }

	            if($this.closest('.wapper_portfolio').hasClass('infinite_scroll')) {
					$this.infinitescroll({
				        navSelector: '.loop-pagination', // selector for the paged navigation
				        nextSelector: '.loop-pagination a:first', // selector for the NEXT link (to page 2)
						extraScrollPx: 120,
				        itemSelector: 'li.item_portfolio', // selector for all items you
				        animate: true,
						bufferPx: 40,
						errorCallback: function () {
						},
						infid: 0, //Instance ID
				    	loading: {
				 			finished: undefined,
				            finishedMsg: 'No more pages to load.',
				            img: "http://i.imgur.com/qkKy8.gif",
				            msgText: "<em>Loading the next set of posts...</em>",
							speed: 'fast',
							start: undefined
				        }
				    },
					function(newElements) {
						$this.isotope('appended', jQuery(newElements));
						jQuery(window).trigger('resize');
					});
				}
	        });
	    });
	}
	portfolio_layout();
	jQuery(document).on('click', '.portfolio-tabs li a', function (e) {
		e.preventDefault();
	    var $this = jQuery(this), myClass = $this.attr("data-filter");
	    $this.closest(".portfolio-tabs").find("li a").removeClass("active");
	    $this.addClass("active");
	    $this.closest('.wapper_portfolio').find('.content_portfolio').isotope({ filter: myClass });
	    portfolio_layout();
	});
		jQuery(window).smartresize(function () {
		portfolio_layout();
	});
	/* End Portfilio */
});