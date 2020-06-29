var thim_scroll = true;
var woof_js_after_ajax_done;
var can_escape = true;
//if (typeof LearnPress == 'undefined') {
//	LearnPress = {};
//}
(function ($) {
	"use strict";
	if (typeof LearnPress != 'undefined') {
		if (typeof LearnPress.load_lesson == 'undefined') {
			LearnPress.load_lesson = function (a, b) {
				LearnPress.$Course && LearnPress.$Course.loadLesson(a, b);
			}
		}
	}

	$.avia_utilities = $.avia_utilities || {};
	$.avia_utilities.supported = {};
	$.avia_utilities.supports = (function () {
		var div = document.createElement('div'),
			vendors = ['Khtml', 'Ms', 'Moz', 'Webkit', 'O'];
		return function (prop, vendor_overwrite) {
			if (div.style.prop !== undefined) {
				return "";
			}
			if (vendor_overwrite !== undefined) {
				vendors = vendor_overwrite;
			}
			prop = prop.replace(/^[a-z]/, function (val) {
				return val.toUpperCase();
			});

			var len = vendors.length;
			while (len--) {
				if (div.style[vendors[len] + prop] !== undefined) {
					return "-" + vendors[len].toLowerCase() + "-";
				}
			}
			return false;
		};
	}());

	/* Smartresize */
	(function ($, sr) {
		var debounce = function (func, threshold, execAsap) {
			var timeout;
			return function debounced() {
				var obj = this, args = arguments;

				function delayed() {
					if (!execAsap)
						func.apply(obj, args);
					timeout = null;
				}

				if (timeout)
					clearTimeout(timeout);
				else if (execAsap)
					func.apply(obj, args);
				timeout = setTimeout(delayed, threshold || 100);
			};
		};
		// smartresize
		jQuery.fn[sr] = function (fn) {
			return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
		};
	})(jQuery, 'smartresize');

	//Back To top
	var back_to_top = function () {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 400) {
				jQuery('#back-to-top').addClass('active');
			} else {
				jQuery('#back-to-top').removeClass('active');
			}
		});
		jQuery('#back-to-top').on('click', function () {
			jQuery('html, body').animate({scrollTop: '0px'}, 800);
			return false;
		});
	};

	//// stick header
	$(document).ready(function () {
		var $header = $('#masthead.header_default');
		var $content_pusher = $('#wrapper-container .content-pusher');
		$header.imagesLoaded(function () {
			var height_sticky_header = $header.outerHeight(true);
			$content_pusher.css({"padding-top": height_sticky_header + 'px'});
			$(window).resize(function () {
				var height_sticky_header = $header.outerHeight(true);
				$content_pusher.css({"padding-top": height_sticky_header + 'px'});
			});
		});
	});

	var thim_TopHeader = function () {
		var header = $('#masthead'),
			height_sticky_header = header.outerHeight(true),
			content_pusher = $('#wrapper-container .content-pusher'),
			top_site_main = $('#wrapper-container .top_site_main');

		//header_overlay
		if (header.hasClass('header_overlay')) {
			//header overlay
			header.imagesLoaded(function () {
				top_site_main.css({"padding-top": height_sticky_header + 'px'});
				$(window).resize(function () {
					var height_sticky_header = header.outerHeight(true);
					top_site_main.css({"padding-top": height_sticky_header + 'px'});
				});
			});
		} else {
			//Header default
			header.imagesLoaded(function () {
				content_pusher.css({"padding-top": height_sticky_header + 'px'});
				$(window).resize(function () {
					var height_sticky_header = header.outerHeight(true);
					content_pusher.css({"padding-top": height_sticky_header + 'px'});
				});
			});
		}
	};

	var thim_SwitchLayout = function () {
		var cookie_name = 'course_switch',
			archive = $('#thim-course-archive');
		if (archive.length > 0) {

			var data_cookie = archive.data('cookie') ? archive.data('cookie') : 'grid-layout';

			//Check grid-layout
			if (( !jQuery.cookie(cookie_name) && data_cookie != 'list-layout' ) || jQuery.cookie(cookie_name) == 'grid-layout') {
				if (archive.hasClass('thim-course-list')) {
					archive.removeClass('thim-course-list').addClass('thim-course-grid');
				}
				$('.thim-course-switch-layout > a.switchToGrid').addClass('switch-active');
			} else {
				if (archive.hasClass('thim-course-grid')) {
					archive.removeClass('thim-course-grid').addClass('thim-course-list');
				}
				$('.thim-course-switch-layout > a.switchToList').addClass('switch-active');
			}

			$(document).on('click', '.thim-course-switch-layout > a', function (event) {
				var elem = $(this),
					archive = $('#thim-course-archive');
				event.preventDefault();
				if (!elem.hasClass('switch-active')) {
					$('.thim-course-switch-layout > a').removeClass('switch-active');
					elem.addClass('switch-active');
					if (elem.hasClass('switchToGrid')) {
						archive.fadeOut(300, function () {
							archive.removeClass('thim-course-list').addClass(' thim-course-grid').fadeIn(300);
							jQuery.cookie(cookie_name, 'grid-layout', {expires: 3, path: '/'});
						});
					} else {
						archive.fadeOut(300, function () {
							archive.removeClass('thim-course-grid').addClass('thim-course-list').fadeIn(300);
							jQuery.cookie(cookie_name, 'list-layout', {expires: 3, path: '/'});
						});
					}
				}
			});
		}

	};

	var thim_Shop_SwitchLayout = function () {
		var cookie_name = 'product_list',
			archive = $('#thim-product-archive');
		if (archive.length > 0) {
			//Check grid-layout
			if (!jQuery.cookie(cookie_name) || jQuery.cookie(cookie_name) == 'grid-layout') {
				if (archive.hasClass('thim-product-list')) {
					archive.removeClass('thim-product-list').addClass('thim-product-grid');
				}
				$('.thim-product-switch-layout > a.switch-active').removeClass('switch-active');
				$('.thim-product-switch-layout > a.switchToGrid').addClass('switch-active');
			} else {
				if (archive.hasClass('thim-product-grid')) {
					archive.removeClass('thim-product-grid').addClass('thim-product-list');
				}
				$('.thim-product-switch-layout > a.switch-active').removeClass('switch-active');
				$('.thim-product-switch-layout > a.switchToList').addClass('switch-active');
			}

			$(document).on('click', '.thim-product-switch-layout > a', function (event) {
				var elem = $(this),
					archive = $('#thim-product-archive');

				event.preventDefault();
				if (!elem.hasClass('switch-active')) {
					$('.thim-product-switch-layout > a').removeClass('switch-active');
					elem.addClass('switch-active');
					if (elem.hasClass('switchToGrid')) {
						archive.fadeOut(300, function () {
							archive.removeClass('thim-product-list').addClass(' thim-product-grid').fadeIn(300);
							jQuery.cookie(cookie_name, 'grid-layout', {expires: 3, path: '/'});
						});
					} else {
						archive.fadeOut(300, function () {
							archive.removeClass('thim-product-grid').addClass('thim-product-list').fadeIn(300);
							jQuery.cookie(cookie_name, 'list-layout', {expires: 3, path: '/'});
						});
					}
				}
			});
		}

	};

	var thim_Blog_SwitchLayout = function () {
		var cookie_name = 'blog_layout',
			archive = $('#blog-archive'),
			switch_layout = archive.find('.switch-layout');
		if (archive.length > 0) {
			//Check grid-layout
			if (!jQuery.cookie(cookie_name) || jQuery.cookie(cookie_name) == 'grid-layout') {
				if (archive.hasClass('blog-list')) {
					archive.removeClass('blog-list').addClass('blog-grid');
				}
				switch_layout.find('> a.switch-active').removeClass('switch-active');
				switch_layout.find('> a.switchToGrid').addClass('switch-active');
			} else {
				if (archive.hasClass('blog-grid')) {
					archive.removeClass('blog-grid').addClass('blog-list');
				}
				switch_layout.find('> a.switch-active').removeClass('switch-active');
				switch_layout.find('> a.switchToList').addClass('switch-active');
			}

			$(document).on('click', '#blog-archive .switch-layout > a', function (event) {
				var elem = $(this),
					archive = $('#blog-archive');

				event.preventDefault();
				if (!elem.hasClass('switch-active')) {
					switch_layout.find('>a').removeClass('switch-active');
					elem.addClass('switch-active');
					if (elem.hasClass('switchToGrid')) {
						archive.fadeOut(300, function () {
							archive.removeClass('blog-list').addClass('blog-grid').fadeIn(300);
							jQuery.cookie(cookie_name, 'grid-layout', {expires: 3, path: '/'});
						});
					} else {
						archive.fadeOut(300, function () {
							archive.removeClass('blog-grid').addClass('blog-list').fadeIn(300);
							jQuery.cookie(cookie_name, 'list-layout', {expires: 3, path: '/'});
						});
					}
				}
			});
		}

	};

	var thim_Menu = function () {
		//Add class for masthead
		var $header = $('#masthead.sticky-header'),
			off_Top = ( $('.content-pusher').length > 0 ) ? $('.content-pusher').offset().top : 0,
			menuH = $header.outerHeight(),
			latestScroll = 0;
		if ($(window).scrollTop() > 2) {
			$header.removeClass('affix-top').addClass('affix');
		}
		$(window).scroll(function () {
			var current = $(this).scrollTop();
			if (current > 2) {
				$header.removeClass('affix-top').addClass('affix');
			} else {
				$header.removeClass('affix').addClass('affix-top');
			}

			if (current > latestScroll && current > menuH + off_Top) {
				if (!$header.hasClass('menu-hidden')) {
					$header.addClass('menu-hidden');
				}
			} else {
				if ($header.hasClass('menu-hidden')) {
					$header.removeClass('menu-hidden');
				}
			}

			latestScroll = current;
		});

		//Show submenu when hover
		$('.wrapper-container:not(.mobile-menu-open) .site-header .navbar-nav >li,.wrapper-container:not(.mobile-menu-open) .site-header .navbar-nav li,.site-header .navbar-nav li ul li').on({
			'mouseenter': function () {
				$(this).children('.sub-menu').stop(true, false).fadeIn(250);
			},
			'mouseleave': function () {
				$(this).children('.sub-menu').stop(true, false).fadeOut(250);
			}
		});

		if ($(window).width() > 768) {
			//Magic Line
			var menu_active = $('#masthead .navbar-nav>li.menu-item.current-menu-item,#masthead .navbar-nav>li.menu-item.current-menu-parent, #masthead .navbar-nav>li.menu-item.current-menu-ancestor');
			if (menu_active.length > 0) {
				menu_active.before('<span id="magic-line"></span>');
				var menu_active_child = menu_active.find('>a,>span.disable_link,>span.tc-menu-inner'),
					menu_left = menu_active.position().left,
					menu_child_left = parseInt(menu_active_child.css('padding-left')),
					magic = $('#magic-line');
				magic.width(menu_active_child.width()).css("left", Math.round(menu_child_left + menu_left)).data('magic-width', magic.width()).data('magic-left', magic.position().left);
			} else {
				var first_menu = $('#masthead .navbar-nav>li.menu-item:first-child');
				first_menu.before('<span id="magic-line"></span>');
				var magic = $('#magic-line');
				magic.data('magic-width', 0);
			}

			var nav_H = parseInt($('.site-header .navigation').outerHeight());
			magic.css('bottom', nav_H - (nav_H - 90) / 2 - 64);

			$('#masthead .navbar-nav>li.menu-item').on({
				'mouseenter': function () {
					var elem = $(this).find('>a,>span.disable_link,>span.tc-menu-inner'),
						new_width = elem.width(),
						parent_left = elem.parent().position().left,
						left = parseInt(elem.css('padding-left'));
					if (!magic.data('magic-left')) {
						magic.css('left', Math.round(parent_left + left));
						magic.data('magic-left', 'auto');
					}
					magic.stop().animate({
						left : Math.round(parent_left + left),
						width: new_width
					});
				},
				'mouseleave': function () {
					magic.stop().animate({
						left : magic.data('magic-left'),
						width: magic.data('magic-width')
					});
				}
			});
		}

		//Update position for sub-menu
		$('.header_v1 .menu-item.widget_area:not(.dropdown_full_width),.header_v1 .menu-item.multicolumn:not(.dropdown_full_width),.header_v1 .navbar-nav>li.tc-menu-layout-column,.header_v1 .navbar-nav>li.tc-menu-layout-builder').each(function () {
			var elem = $(this),
				elem_Left = elem.offset().left,
				sub_menu = elem.find('>.sub-menu');
			if (sub_menu.length > 0) {
				var left = ( elem.width() - sub_menu.width() ) / 2;
				if (Math.abs(left) > elem_Left) {
					sub_menu.css('left', elem_Left * Math.abs(left) / left);
				} else {
					sub_menu.css('left', left);
				}
			}
		});

	};

	/* ****** jp-jplayer  ******/
	var thim_post_audio = function () {
		$('.jp-jplayer').each(function () {
			var $this = $(this),
				url = $this.data('audio'),
				type = url.substr(url.lastIndexOf('.') + 1),
				player = '#' + $this.data('player'),
				audio = {};
			audio[type] = url;
			$this.jPlayer({
				ready              : function () {
					$this.jPlayer('setMedia', audio);
				},
				swfPath            : 'jplayer/',
				cssSelectorAncestor: player
			});
		});
	};

	var thim_post_gallery = function () {
		$('article.format-gallery .flexslider').imagesLoaded(function () {
			$('.flexslider').flexslider({
				slideshow     : true,
				animation     : 'fade',
				pauseOnHover  : true,
				animationSpeed: 400,
				smoothHeight  : true,
				directionNav  : true,
				controlNav    : false
			});
		});
	};

	/* ****** PRODUCT QUICK VIEW  ******/
	var thim_quick_view = function () {
		$(document).on('click', '.quick-view', function (e) {
			/* add loader  */
			$('.quick-view a').css('display', 'none');
			$(this).append('<a href="javascript:;" class="loading dark"></a>');
			var product_id = $(this).attr('data-prod');
			var data = {action: 'jck_quickview', product: product_id};
			$.post(ajaxurl, data, function (response) {
				$.magnificPopup.open({
					mainClass: 'my-mfp-zoom-in',
					items    : {
						src : response,
						type: 'inline'
					},
					callbacks: {
						open: function () {
							$('body').addClass('thim-popup-active');
							$.magnificPopup.instance.close = function () {
								$('body').removeClass('thim-popup-active');
								$.magnificPopup.proto.close.call(this);
							};
						},
					}
				});
				$('.quick-view a').css('display', 'inline-block');
				$('.loading').remove();
				$('.product-card .wrapper').removeClass('animate');
				setTimeout(function () {
					if (typeof wc_add_to_cart_variation_params !== 'undefined') {
						$('.product-info .variations_form').each(function () {
							$(this).wc_variation_form().find('.variations select:eq(0)').change();
						});
					}
				}, 600);
			});
			e.preventDefault();
		});
	};

	var thim_miniCartHover = function () {
		jQuery(document).on('mouseenter', '.site-header .minicart_hover', function () {
			jQuery(this).next('.widget_shopping_cart_content').slideDown();
		}).on('mouseleave', '.site-header .minicart_hover', function () {
			jQuery(this).next('.widget_shopping_cart_content').delay(100).stop(true, false).slideUp();
		});
		jQuery(document)
			.on('mouseenter', '.site-header .widget_shopping_cart_content', function () {
				jQuery(this).stop(true, false).show();
			})
			.on('mouseleave', '.site-header .widget_shopping_cart_content', function () {
				jQuery(this).delay(100).stop(true, false).slideUp();
			});
	};

	var thim_carousel = function () {
		if (jQuery().owlCarousel) {
			$(".thim-gallery-images").owlCarousel({
				autoPlay   : false,
				singleItem : true,
				stopOnHover: true,
				pagination : true,
				autoHeight : false
			});

			$('.thim-carousel-wrapper').each(function () {
				var item_visible = $(this).data('visible') ? parseInt($(this).data('visible')) : 4,
					item_desktopsmall = $(this).data('desktopsmall') ? parseInt($(this).data('desktopsmall')) : item_visible,
					itemsTablet = $(this).data('itemtablet') ? parseInt($(this).data('itemtablet')) : 2,
					itemsMobile = $(this).data('itemmobile') ? parseInt($(this).data('itemmobile')) : 1,
					pagination = $(this).data('pagination') ? true : false,
					navigation = $(this).data('navigation') ? true : false,
					autoplay = $(this).data('autoplay') ? parseInt($(this).data('autoplay')) : false,
					navigation_text = ( $(this).data('navigation-text') && $(this).data('navigation-text') == '2' ) ? [
						"<i class=\'fa fa-long-arrow-left \'></i>",
						"<i class=\'fa fa-long-arrow-right \'></i>"
					] : [
						"<i class=\'fa fa-chevron-left \'></i>",
						"<i class=\'fa fa-chevron-right \'></i>"
					];
				$(this).owlCarousel({
					items            : item_visible,
					itemsDesktop     : [1200, item_visible],
					itemsDesktopSmall: [1024, item_desktopsmall],
					itemsTablet      : [768, itemsTablet],
					itemsMobile      : [480, itemsMobile],
					navigation       : navigation,
					pagination       : pagination,
					lazyLoad         : true,
					autoPlay         : autoplay,
					navigationText   : navigation_text,
				});
			});

			$('.thim-carousel-course-categories .thim-course-slider').each(function () {
				var item_visible = $(this).data('visible') ? parseInt($(this).data('visible')) : 7,
					item_desktopsmall = $(this).data('desktopsmall') ? parseInt($(this).data('desktopsmall')) : 6,
					pagination = $(this).data('pagination') ? true : false,
					navigation = $(this).data('navigation') ? true : false,
					autoplay = $(this).data('autoplay') ? parseInt($(this).data('autoplay')) : false;

				$(this).owlCarousel({
					items            : item_visible,
					itemsDesktopSmall: [1024, item_desktopsmall],
					itemsTablet      : [768, 4],
					itemsMobile      : [480, 2],
					navigation       : navigation,
					pagination       : pagination,
					autoPlay         : autoplay,
					navigationText   : [
						"<i class=\'fa fa-chevron-left \'></i>",
						"<i class=\'fa fa-chevron-right \'></i>"
					],
				});
			});
		}

	};

	var thim_contentslider = function () {
		$('.thim-testimonial-slider').each(function () {
			var elem = $(this),
				item_visible = parseInt(elem.data('visible')),
				autoplay = elem.data('auto') ? true : false,
				mousewheel = elem.data('mousewheel') ? true : false;

			var testimonial_slider = $(this).thimContentSlider({
				items            : elem,
				itemsVisible     : item_visible,
				mouseWheel       : mousewheel,
				autoPlay         : autoplay,
				itemMaxWidth     : 100,
				itemMinWidth     : 100,
				activeItemRatio  : 1.18,
				activeItemPadding: 0,
				itemPadding      : 15
			});

		});
	};

	var thim_course_menu_landing = function () {
		if ($('.thim-course-menu-landing').length > 0) {
			var menu_landing = $('.thim-course-menu-landing'),
				tab_course = $('#course-landing .nav-tabs'),
				tab_active = tab_course.find('>li.active'),
				tab_item = tab_course.find('>li>a'),
				tab_landing = menu_landing.find('.thim-course-landing-tab'),
				tab_landing_item = tab_landing.find('>li>a'),
				landing_Top = ( $('#course-landing').length ) > 0 ? $('#course-landing').offset().top : 0,
				checkTop = ( $(window).height() > landing_Top ) ? $(window).height() : landing_Top;

			$('footer#colophon').addClass('has-thim-course-menu');
			if (tab_active.length > 0) {
				var active_href = tab_active.find('>a').attr('href'),
					landing_active = tab_landing.find('>li>a[href="' + active_href + '"]');

				if (landing_active.length > 0) {
					landing_active.parent().addClass('active');
				}
			}

			tab_landing_item.on('click', function (event) {
				event.preventDefault();
				var href = $(this).attr('href'),
					parent = $(this).parent();

				$('body, html').animate({
					scrollTop: tab_course.offset().top - 50
				}, 800);
				if (!parent.hasClass('active')) {
					tab_landing.find('li.active').removeClass('active');
					parent.addClass('active');
					tab_course.find('>li>a[href="' + href + '"]').trigger('click');
				}
			});

			tab_item.on('click', function () {
				var href = $(this).attr('href'),
					parent_landing = tab_landing.find('>li>a[href="' + href + '"]').parent();

				if (!parent_landing.hasClass('active')) {
					tab_landing.find('li.active').removeClass('active');
					parent_landing.addClass('active');
				}
			});

			$(window).scroll(function () {
				if ($(window).scrollTop() > checkTop) {
					$('body').addClass('course-landing-active');
				} else {
					$('body.course-landing-active').removeClass('course-landing-active');
				}
				;
			})
		}
	};

	var thim_LoginPopup = function () {
		if ($('#thim-popup-login .thim-login-container').length) {

			var el = $('#thim-popup-login .thim-login-container'),
				el_H = el.outerHeight(),
				win_H = $(window).height();

			if (win_H > el_H) {
				el.css('top', ( win_H - el_H ) / 2);
			}
		}
		$(document).on('click', 'body:not(".loggen-in") .thim-button-checkout', function (e) {
			if ($(window).width() > 767) {
				e.preventDefault();
				if ($('#thim-popup-login').length) {
					$('body').addClass('thim-popup-active');
					$('#thim-popup-login').addClass('active');
				} else {
					var redirect = $(this).data('redirect');
					window.location = redirect;
				}
			} else {
				e.preventDefault();
				var redirect = $(this).data('redirect');
				window.location = redirect;
			}
		});

		$(document).on('click', '#thim-popup-login .close-popup', function (event) {
			event.preventDefault();
			$('body').removeClass('thim-popup-active');
			$('#thim-popup-login').removeClass('active');
		});

		$(document).on('click', '.thim-login-popup .login', function (event) {
			if ($(window).width() > 767) {
				event.preventDefault();
				$('body').addClass('thim-popup-active');
				$('#thim-popup-login').addClass('active');
			}
		});

		$(document).on('click', '#thim-popup-login', function (e) {
			if ($(e.target).attr('id') == 'thim-popup-login') {
				$('body').removeClass('thim-popup-active');
				$('#thim-popup-login').removeClass('active');
			}
		});

		$('#thim-popup-login form[name="loginform"]').submit(function (event) {
			event.preventDefault();

			var form = $(this),
				elem = $('#thim-popup-login .thim-login-container'),
				input_username = elem.find('#thim_login').val(),
				input_password = elem.find('#thim_pass').val(),
				wp_submit = elem.find('#wp-submit').val();

			if (input_username == '' || input_password == '') {
				return;
			}
			elem.addClass('loading');
			elem.append('<div class="cssload-container"><div class="cssload-loading"><i></i><i></i><i></i><i></i></div></div>');
			elem.find('.message').slideDown().remove();

			var data = {
				action: 'thim_login_ajax',
				data  : form.serialize() + '&wp-submit=' + wp_submit,
			};

			$.post(ajaxurl, data, function (response) {
				try {
					var response = JSON.parse(response);
					elem.find('.thim-login').append(response.message);
					if (response.code == '1') {
						if (response.redirect) {
							if (window.location.href == response.redirect) {
								location.reload();
							} else {
								window.location.href = response.redirect;
							}
						} else {
							location.reload();
						}
					}
				} catch (e) {
					return false;
				}
				elem.removeClass('loading');
				elem.find('.cssload-container').remove();
			});

			return false;
		});
	}

	$(function () {
		back_to_top();

		/* Waypoints magic
		 ---------------------------------------------------------- */
		if (typeof jQuery.fn.waypoint !== 'undefined') {
			jQuery('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').waypoint(function () {
				jQuery(this).addClass('wpb_start_animation');
			}, {offset: '85%'});
		}
	});

	function empty(data) {
		if (typeof(data) == 'number' || typeof(data) == 'boolean') {
			return false;
		}
		if (typeof(data) == 'undefined' || data === null) {
			return true;
		}
		if (typeof(data.length) != 'undefined') {
			return data.length === 0;
		}
		var count = 0;
		for (var i in data) {
			if (Object.prototype.hasOwnProperty.call(data, i)) {
				count++;
			}
		}
		return count === 0;
	}

	var windowWidth = window.innerWidth,
		windowHeight = window.innerHeight,
		$document = $(document),
		orientation = windowWidth > windowHeight ? 'landscape' : 'portrait';
	var TitleAnimation = {
		selector   : '.article__parallax',
		initialized: false,
		animated   : false,
		initialize : function () {

			//this.update();
		},
		update     : function () {
			//return;

		}
	};
	/* ====== ON RESIZE ====== */
	$(window).load(function () {
		thim_post_audio();
		thim_post_gallery();
		thim_TopHeader();
		thim_Menu();
		thim_quick_view();
		thim_miniCartHover();
		thim_carousel();
		thim_contentslider();
		thim_SwitchLayout();
		thim_Shop_SwitchLayout();
		thim_Blog_SwitchLayout();
		thim_LoginPopup();

		setTimeout(function () {
			TitleAnimation.initialize();
			thim_course_menu_landing();
		}, 400);
	});

	$(window).on("debouncedresize", function (e) {
		windowWidth = $(window).width();
		windowHeight = $(window).height();
		TitleAnimation.initialize();
	});

	$(window).on("orientationchange", function (e) {
		setTimeout(function () {
			TitleAnimation.initialize();
		}, 300);
	});

	var latestScrollY = $('html').scrollTop() || $('body').scrollTop(),
		ticking = false;

	function updateAnimation() {
		ticking = false;
		TitleAnimation.update();
	}

	function requestScroll() {
		if (!ticking) {
			requestAnimationFrame(updateAnimation);
		}
		ticking = true;
	}

	$(window).on("scroll", function () {
		latestScrollY = $('html').scrollTop() || $('body').scrollTop();
		requestScroll();
	});


	jQuery(function ($) {
		var adminbar_height = jQuery('#wpadminbar').outerHeight();
		jQuery('.navbar-nav li a,.arrow-scroll > a').on('click', function (e) {
			if (parseInt(jQuery(window).scrollTop(), 10) < 2) {
				var height = 47;
			} else height = 0;
			var sticky_height = jQuery('#masthead').outerHeight();
			var menu_anchor = jQuery(this).attr('href');
			if (menu_anchor && menu_anchor.indexOf("#") == 0 && menu_anchor.length > 1) {
				e.preventDefault();
				$('html,body').animate({
					scrollTop: jQuery(menu_anchor).offset().top - adminbar_height - sticky_height + height
				}, 850);
			}
		});
	});

	/* Menu Sidebar */
	jQuery(document).on('click', '.menu-mobile-effect', function (e) {
		e.stopPropagation();
		jQuery('.wrapper-container').toggleClass('mobile-menu-open');
	});

	jQuery(document).on('click', '.mobile-menu-open #main-content', function () {
		jQuery('.wrapper-container.mobile-menu-open').removeClass('mobile-menu-open');
	});

	function mobilecheck() {
		var check = false;
		(function (a) {
			if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
		})(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	}

	if (mobilecheck()) {
		window.addEventListener('load', function () { // on page load
			var main_content = document.getElementById('main-content');
			if (main_content) {
				main_content.addEventListener("touchstart", function (e) {
					jQuery('.wrapper-container').removeClass('mobile-menu-open');
				});
			}
		}, false);
	}
	;

	/* mobile menu */
	if (jQuery(window).width() > 768) {
		jQuery('.navbar-nav>li.menu-item-has-children >a,.navbar-nav>li.menu-item-has-children >span').after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>');
	} else {
		jQuery('.navbar-nav>li.menu-item-has-children:not(.current-menu-parent) >a,.navbar-nav>li.menu-item-has-children:not(.current-menu-parent) >span').after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>');
		jQuery('.navbar-nav>li.menu-item-has-children.current-menu-parent >a,.navbar-nav>li.menu-item-has-children.current-menu-parent >span').after('<span class="icon-toggle"><i class="fa fa-angle-up"></i></span>');
	}
	jQuery('.navbar-nav>li.menu-item-has-children .icon-toggle').on('click', function () {
		if (jQuery(this).next('.sub-menu').is(':hidden')) {
			jQuery(this).next('.sub-menu').slideDown(500, 'linear');
			jQuery(this).html('<i class="fa fa-angle-up"></i>');
		}
		else {
			jQuery(this).next('.sub-menu').slideUp(500, 'linear');
			jQuery(this).html('<i class="fa fa-angle-down"></i>');
		}
	});

})(jQuery);

(function ($) {
	var thim_quiz_index = function () {
		var question_index = $('.single-quiz .index-question'),
			quiz_total_text = $('.single-quiz .quiz-total .quiz-text');
		if (question_index.length > 0) {
			quiz_total_text.html(question_index.html());
		}
	};


	$(window).load(function () {
		$('.article__parallax').each(function (index, el) {
			$(el).parallax("50%", 0.4);
		});
		$('.images_parallax').parallax_images({
			speed: 0.5
		});

		$(window).resize(function () {
			$('.images_parallax').each(function (index, el) {
				$(el).imagesLoaded(function () {
					var parallaxHeight = $(this).find('img').height();
					$(this).height(parallaxHeight);
				});
			});
		}).trigger('resize');

		thim_quiz_index();

		//Add class for profile tab
		var $profile_list = $('.profile-tabs .nav-tabs>li ');
		if ($profile_list.length > 0) {
			$profile_list.addClass('thim-profile-list-' + $profile_list.length);
		}
	});

	// Learnpress custom code js
	$(document).ready(function () {
        //Course wishlist
        $(".course-wishlist-box [class*='course-wishlist']").on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($this.hasClass('loading')) return;
            $this.addClass('loading');
            $this.toggleClass('course-wishlist');
            $this.toggleClass('course-wishlisted');
            $class = $this.attr('class');
            if ($this.hasClass('course-wishlisted')) {
                $.ajax({
                    type    : "POST",
                    url     : window.location.href,
                    dataType: 'html',
                    data    : {
                        //action   : 'learn_press_toggle_course_wishlist',
                        'lp-ajax': 'toggle_course_wishlist',
                        course_id: $this.data('id'),
                        nonce    : $this.data('nonce')
                    },
                    success : function () {
                        $this.removeClass('loading')
                    },
                    error   : function () {
                        $this.removeClass('loading')
                    }
                });
            }
            if ($this.hasClass('course-wishlist')) {
                $.ajax({
                    type    : "POST",
                    url     : window.location.href,
                    dataType: 'html',
                    data    : {
                        //action   : 'learn_press_toggle_course_wishlist',
                        'lp-ajax': 'toggle_course_wishlist',
                        course_id: $this.data('id'),
                        nonce    : $this.data('nonce')
                    },
                    success : function () {
                        $this.removeClass('loading')
                    },
                    error   : function () {
                        $this.removeClass('loading')
                    }
                });
            }
        });

		$('.video-container').on('click', '.beauty-intro .btns', function () {
			var iframe = '<iframe src="' + $(this).closest(".video-container").find(".yt-player").attr('data-video') + '" height= "' + $('.parallaxslider').height() + '"></iframe>';
			$(this).closest(".video-container").find(".yt-player").replaceWith(iframe);
			//debug >HP
			$(this).closest(".video-container").find('.hideClick:first').css('display', 'none');
		});

		if (!$('.add-review').length) {
			return;
		}
		var $star = $('.add-review .filled');
		var $review = $('#review-course-value');
		$star.find('li').on('mouseover',
			function () {
				$(this).nextAll().find('span').removeClass('fa-star').addClass('fa-star-o');
				$(this).prevAll().find('span').removeClass('fa-star-o').addClass('fa-star');
				$(this).find('span').removeClass('fa-star-o').addClass('fa-star');
				$review.val($(this).index() + 1);
			}
		);

		//Replace placeholder input password & login
		$('.login-username [name="log"]').attr('placeholder', thim_js_translate.login);
		$('.login-password [name="pwd"]').attr('placeholder', thim_js_translate.password);


		$(window).scroll(function (event) {
			if (thim_scroll && thim_scroll === false) {
				event.preventDefault();
			}
		});
	});

	$(document).on('click', '#course-review-load-more', function () {
		var $button = $(this);
		if (!$button.is(':visible')) return;
		$button.addClass('loading');
		var paged = parseInt($(this).attr('data-paged')) + 1;
		$.ajax({
			type    : "POST",
			dataType: 'html',
			url     : window.location.href,
			data    : {
				action: 'learn_press_load_course_review',
				paged : paged
			},
			success : function (response) {
				var $content = $(response),
					$new_review = $content.find('.course-reviews-list>li');
				$('#course-reviews .course-reviews-list').append($new_review);
				if ($content.find('#course-review-load-more').length) {
					$button.removeClass('loading').attr('data-paged', paged);
				} else {
					$button.remove();
				}
			}
		});
	});


	$(document).on('click', '.single-lp_course .course-meta .course-review .value', function () {
		var review_tab = $('.course-tabs a[href="#tab-course-review"]');
		if (review_tab.length > 0) {
			review_tab.trigger('click');
			$('body, html').animate({
				scrollTop: review_tab.offset().top - 50
			}, 800);
		}
	});

	//Widget live search course
	var search_timer = false;

	function thimlivesearch(contain) {
		var input_search = contain.find('.courses-search-input'),
			list_search = contain.find('.courses-list-search'),
			keyword = input_search.val(),
			loading = contain.find('.fa-search,.fa-times');

		if (keyword) {
			if (keyword.length < 1) {
				return;
			}
			loading.addClass('fa-spinner fa-spin');
			$.ajax({
				type   : 'POST',
				data   : 'action=courses_searching&keyword=' + keyword + '&from=search',
				url    : ajaxurl,
				success: function (html) {
					var data_li = '';
					var items = jQuery.parseJSON(html);
					if (!items.error) {
						$.each(items, function (index) {
							if (index == 0) {
								if (this['guid'] != '#') {
									data_li += '<li class="ui-menu-item' + this['id'] + ' ob-selected"><a class="ui-corner-all" href="' + this['guid'] + '">' + this['title'] + '</a></li>';
								} else {
									data_li += '<li class="ui-menu-item' + this['id'] + ' ob-selected">' + this['title'] + '</li>';
								}

							} else {
								data_li += '<li class="ui-menu-item' + this['id'] + '"><a class="ui-corner-all" href="' + this['guid'] + '">' + this['title'] + '</a></li>';
							}
						});
						list_search.addClass('search-visible').html('').append(data_li);
					}
					thimsearchHover();
					loading.removeClass('fa-spinner fa-spin');
				},
				error  : function (html) {
				}
			});
		}
	}

	function thimsearchHover() {
		$('.courses-list-search li').on('mouseenter', function () {
			$('.courses-list-search li').removeClass('ob-selected');
			$(this).addClass('ob-selected');
		});
	}

	$(document).ready(function () {

		$(document).on('click', '.thim-course-search-overlay .search-toggle', function (e) {
			e.stopPropagation();
			var parent = $(this).parent();
			$('body').addClass('thim-search-active');
			setTimeout(function () {
				parent.find('.thim-s').focus();
			}, 500);

		});
		$(document).on('click', '.search-popup-bg', function () {
			var parent = $(this).parent();
			window.clearTimeout(search_timer);
			parent.find('.courses-list-search').empty();
			parent.find('.thim-s').val('');
			$('body').removeClass('thim-search-active');
		});

		$(document).on('keyup', '.courses-search-input', function (event) {
			clearTimeout($.data(this, 'search_timer'));
			var contain = $(this).parents('.courses-searching'),
				list_search = contain.find('.courses-list-search'),
				item_search = list_search.find('>li');
			if (event.which == 13) {
				event.preventDefault();
				$(this).stop();
			} else if (event.which == 38) {
				if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15) {
					var selected = item_search.filter(".ob-selected");
					if (item_search.length > 1) {
						item_search.removeClass("ob-selected");
						// if there is no element before the selected one, we select the last one
						if (selected.prev().length == 0) {
							selected.siblings().last().addClass("ob-selected");
						} else { // otherwise we just select the next one
							selected.prev().addClass("ob-selected");
						}
					}
				}
			} else if (event.which == 40) {
				if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15) {
					var selected = item_search.filter(".ob-selected");
					if (item_search.length > 1) {
						item_search.removeClass("ob-selected");

						// if there is no element before the selected one, we select the last one
						if (selected.next().length == 0) {
							selected.siblings().first().addClass("ob-selected");
						} else { // otherwise we just select the next one
							selected.next().addClass("ob-selected");
						}
					}
				}
			} else if (event.which == 27) {
				if ($('body').hasClass('thim-search-active')) {
					$('body').removeClass('thim-search-active');
				}
				list_search.html('');
				$(this).val('');
				$(this).stop();
			} else {
				var search_timer = setTimeout(function () {
					thimlivesearch(contain);
				}, 500);
				$(this).data('search_timer', search_timer);
			}
		});
		$(document).on('keypress', '.courses-search-input', function (event) {
			var item_search = $(this).parents('.courses-searching').find('.courses-list-search>li');

			if (event.keyCode == 13) {
				var selected = $(".ob-selected");
				if (selected.length > 0) {
					var ob_href = selected.find('a').first().attr('href');
					window.location.href = ob_href;
				}
				event.preventDefault();
			}
			if (event.keyCode == 27) {
				if ($('body').hasClass('thim-search-active')) {
					$('body').removeClass('thim-search-active');
				}
				$('.courses-list-search').html('');
				$(this).val('');
				$(this).stop();
			}
			if (event.keyCode == 38) {
				var selected = item_search.filter(".ob-selected");
				// if there is no element before the selected one, we select the last one
				if (item_search.length > 1) {
					item_search.removeClass("ob-selected");
					if (selected.prev().length == 0) {
						selected.siblings().last().addClass("ob-selected");
					} else { // otherwise we just select the next one
						selected.prev().addClass("ob-selected");
					}
				}
			}
			if (event.keyCode == 40) {
				var selected = item_search.filter(".ob-selected");
				if (item_search.length > 1) {
					item_search.removeClass("ob-selected");
					// if there is no element before the selected one, we select the last one
					if (selected.next().length == 0) {
						selected.siblings().first().addClass("ob-selected");
					} else { // otherwise we just select the next one
						selected.next().addClass("ob-selected");
					}
				}
			}
		});

		$(document).on('click', '.courses-list-search, .courses-search-input', function (event) {
			event.stopPropagation();
		});

		$(document).on('click', 'body', function () {
			if (!$('body').hasClass('course-scroll-remove')) {
				$('body').addClass('course-scroll-remove');
			}
		});

		$(window).scroll(function () {
			if ($('body').hasClass('course-scroll-remove') && $(".courses-list-search li").length > 0) {
				$(".courses-searching .courses-list-search").empty();
				$(".courses-searching .thim-s").val('');
			}
		});

		$(document).on('focus', '.courses-search-input', function () {
			if ($('body').hasClass('course-scroll-remove')) {
				$('body').removeClass('course-scroll-remove');
			}
		});

		//Prevent search result
		$(document).on('click', '#popup-header .search-visible', function (e) {
			var href = $(e.target).attr('href');
			if (!href) {
				$('#popup-header .search-visible').removeClass('search-visible');
			}

		});

		$(document).on('click', '#popup-header button', function (e) {
			$('#popup-header .thim-s').trigger('focus');

		});

		$(document).on('focus', '#popup-header .thim-s', function () {
			var link = $('#popup-header .courses-list-search a');
			console.log($(this).val(), link.length);
			if ($(this).val() != '' && link.length > 0) {
				$('#popup-header .courses-list-search').addClass('search-visible');
			}
		});


		//Widget icon box
		$(".wrapper-box-icon").each(function () {
			var $this = $(this);
			if ($this.attr("data-icon")) {
				var $color_icon = $(".boxes-icon", $this).css('color');
				var $color_icon_change = $this.attr("data-icon");
			}
			if ($this.attr("data-icon-border")) {
				var $color_icon_border = $(".boxes-icon", $this).css('border-color');
				var $color_icon_border_change = $this.attr("data-icon-border");
			}
			if ($this.attr("data-icon-bg")) {
				var $color_bg = $(".boxes-icon", $this).css('background-color');
				var $color_bg_change = $this.attr("data-icon-bg");
			}


			if ($this.attr("data-btn-bg")) {
				var $color_btn_bg = $(".smicon-read", $this).css('background-color');
				var $color_btn_border = $(".smicon-read", $this).css('border-color');
				var $color_btn_bg_text_color = $(".smicon-read", $this).css('color');

				var $color_btn_bg_change = $this.attr("data-btn-bg");
				if ($this.attr("data-text-readmore")) {
					var $color_btn_bg_text_color_change = $this.attr("data-text-readmore");
				} else {
					$color_btn_bg_text_color_change = $color_btn_bg_text_color;
				}

				$(".smicon-read", $this).on({
					'mouseenter': function () {
						if ($("#style_selector_container").length > 0) {
							if ($(".smicon-read", $this).css("background-color") != $color_btn_bg)
								$color_btn_bg = $(".smicon-read", $this).css('background-color');
						}
						$(".smicon-read", $this).css({
							'background-color': $color_btn_bg_change,
							'border-color'    : $color_btn_bg_change,
							'color'           : $color_btn_bg_text_color_change
						});
					},
					'mouseleave': function () {
						$(".smicon-read", $this).css({
							'background-color': $color_btn_bg,
							'border-color'    : $color_btn_border,
							'color'           : $color_btn_bg_text_color
						});
					}
				});

			}

			$(".boxes-icon", $this).on({
				'mouseenter': function () {
					if ($this.attr("data-icon")) {
						$(".boxes-icon", $this).css({'color': $color_icon_change});
					}
					if ($this.attr("data-icon-bg")) {
						/* for select style*/
						if ($("#style_selector_container").length > 0) {
							if ($(".boxes-icon", $this).css("background-color") != $color_bg)
								$color_bg = $(".boxes-icon", $this).css('background-color');
						}

						$(".boxes-icon", $this).css({'background-color': $color_bg_change});
					}
					if ($this.attr("data-icon-border")) {
						$(".boxes-icon", $this).css({'border-color': $color_icon_border_change});
					}
				},
				'mouseleave': function () {
					if ($this.attr("data-icon")) {
						$(".boxes-icon", $this).css({'color': $color_icon});
					}
					if ($this.attr("data-icon-bg")) {
						$(".boxes-icon", $this).css({'background-color': $color_bg});
					}
					if ($this.attr("data-icon-border")) {
						$(".boxes-icon", $this).css({'border-color': $color_icon_border});
					}
				}
			});

		});
		/* End Icon Box */

		//Background video
		$('.bg-video-play').on("click", function () {
			var elem = $(this),
				video = $(this).parents('.thim-widget-icon-box').find('.full-screen-video'),
				player = video.get(0);
			if (player.paused) {
				player.play();
				elem.addClass('bg-pause');
			} else {
				player.pause();
				elem.removeClass('bg-pause');
			}
		});


		//wpcf7-form-submit
		$(document).on('click', '.wpcf7-form-control.wpcf7-submit', function () {
			var elem = $(this),
				form = elem.parents('.wpcf7-form');
			form.addClass('thim-sending');
			$(document).on('invalid.wpcf7', function (event) {
				form.removeClass('thim-sending');
			});
			$(document).on('spam.wpcf7', function (event) {
				form.removeClass('thim-sending');
				setTimeout(function () {
					if ($('.wpcf7-response-output').length > 0) {
						$('.wpcf7-response-output').hide();
					}
				}, 4000);
			});
			$(document).on('mailsent.wpcf7', function (event) {
				form.removeClass('thim-sending');
				setTimeout(function () {
					if ($('.wpcf7-response-output').length > 0) {
						$('.wpcf7-response-output').hide();
					}
				}, 4000);

			});
			$(document).on('mailfailed.wpcf7', function (event) {
				form.removeClass('thim-sending');
				setTimeout(function () {
					if ($('.wpcf7-response-output').length > 0) {
						$('.wpcf7-response-output').hide();
					}
				}, 4000);
			});
		});
	});

	//Include plugin event file events.js
	jQuery(document).ready(function () {
		// countdown each
		var counts = $('.tp_event_counter');
		for (var i = 0; i < counts.length; i++) {
			var time = $(counts[i]).attr('data-time');
			time = new Date(time);

			$(counts[i]).countdown({
				labels    : TP_Event.l18n.labels,
				labels1   : TP_Event.l18n.label1,
				until     : time,
				serverSync: TP_Event.current_time
			});
		}

		// owl-carausel
		var carousels = $('.tp_event_owl_carousel');
		for (var i = 0; i < carousels.length; i++) {
			var data = $(carousels[i]).attr('data-countdown');
			var options = {
				navigation     : true, // Show next and prev buttons
				slideSpeed     : 300,
				paginationSpeed: 400,
				singleItem     : true
			};
			if (typeof data !== 'undefined') {
				data = JSON.parse(data);
				$.extend(options, data);

				$.each(options, function (k, v) {
					if (v === 'true') {
						options[k] = true;
					} else if (v === 'false') {
						options[k] = false;
					}
				});
			}

			if (typeof options.slide === 'undefined' || options.slide === true) {
				$(carousels[i]).owlCarousel(options);
			}
			else {
				$(carousels[i]).removeClass('owl-carousel');
			}
		}
	});

	// Sticky sidebar
	jQuery(document).ready(function () {
		var offsetTop = 20;
		if ($("#wpadminbar").length) {
			offsetTop += $("#wpadminbar").outerHeight();
		}
		if ($("#masthead.sticky-header").length) {
			offsetTop += $("#masthead.sticky-header").outerHeight();
		}
		jQuery("#sidebar.sticky-sidebar").theiaStickySidebar({
			"containerSelector"     : "",
			"additionalMarginTop"   : offsetTop,
			"additionalMarginBottom": "0",
			"updateSidebarHeight"   : false,
			"minWidth"              : "768",
			"sidebarBehavior"       : "modern"
		});
	});

	// Prevent search when no content submited
	jQuery(document).ready(function () {
		$(".courses-searching form").submit(function () {
			var input_search = $(this).find("input[name='s']");
			if ($.trim(input_search.val()) === "") {
				input_search.focus();
				return false;
			}
		});

		$('form#bbp-search-form').submit(function () {
			if ($.trim($("#bbp_search").val()) === "") {
				$("#bbp_search").focus();
				return false;
			}
		});

		$("form.search-form").submit(function () {
			var input_search = $(this).find("input[name='s']");
			if ($.trim(input_search.val()) === "") {
				input_search.focus();
				return false;
			}
		});

		//Register form untispam
		$('.thim-login form#registerform').submit(function (event) {
			var elem = $(this),
				input_username = elem.find('#user_login'),
				input_email = elem.find('#user_email'),
				input_captcha = $('.thim-login-captcha .captcha-result'),
				input_pass = elem.find('#password'),
				input_rppass = elem.find('#repeat_password');

			var email_valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

			if ($('#registerform #check_spam_register').val() != '') {
				event.preventDefault();
			}

			if (input_captcha.length > 0) {
				var captcha_1 = parseInt(input_captcha.data('captcha1')),
					captcha_2 = parseInt(input_captcha.data('captcha2'));

				if (captcha_1 + captcha_2 != parseInt(input_captcha.val())) {
					input_captcha.addClass('invalid').val('');
					event.preventDefault();
				}
			}

			if (input_username.length > 0 && input_username.val() == '') {
				input_username.addClass('invalid');
				event.preventDefault();
			}

			if (input_email.length > 0 && ( input_email.val() == '' || !email_valid.test(input_email.val()) )) {
				input_email.addClass('invalid');
				event.preventDefault();
			}

			if (input_pass.val() !== input_rppass.val() || input_pass.val() == '') {
				input_pass.addClass('invalid');
				input_rppass.addClass('invalid');
				event.preventDefault();
			}
		});

		//Validate login submit
		$('.thim-login form#loginform').submit(function (event) {
			var elem = $(this),
				input_username = elem.find('#thim_login'),
				input_captcha = $('.thim-login-captcha .captcha-result'),
				input_pass = elem.find('#thim_pass');

			if (input_username.length > 0 && input_username.val() == '') {
				input_username.addClass('invalid');
				event.preventDefault();
			}

			if (input_pass.length > 0 && input_pass.val() == '') {
				input_pass.addClass('invalid');
				event.preventDefault();
			}

			if (input_captcha.length > 0) {
				var captcha_1 = parseInt(input_captcha.data('captcha1')),
					captcha_2 = parseInt(input_captcha.data('captcha2'));

				if (captcha_1 + captcha_2 != parseInt(input_captcha.val())) {
					input_captcha.addClass('invalid').val('');
					event.preventDefault();
				}
			}
		});

		//Validate lostpassword submit
		$('.thim-login form#lostpasswordform').submit(function (event) {
			var elem = $(this),
				input_username = elem.find('#user_login');

			if (input_username.length > 0 && input_username.val() == '') {
				input_username.addClass('invalid');
				event.preventDefault();
			}
		});


		$('.thim-login #thim_login, .thim-login #thim_pass, .thim-login #user_login').on('focus', function () {
			$(this).removeClass('invalid');
		});

		//My account login
		$('#customer_login .login').submit(function (event) {
			var elem = $(this),
				input_username = elem.find('#username'),
				input_pass = elem.find('#password');

			if (input_pass.length > 0 && input_pass.val() == '') {
				input_pass.addClass('invalid');
				event.preventDefault();
			}

			if (input_username.length > 0 && input_username.val() == '') {
				input_username.addClass('invalid');
				event.preventDefault();
			}
		});

		//My account register
		$('#customer_login .register').submit(function (event) {
			var elem = $(this),
				input_username = elem.find('#reg_username'),
				input_email = elem.find('#reg_email'),
				input_pass = elem.find('#reg_password'),
				input_captcha = $('#customer_login .register .captcha-result'),
				valid_email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

			if (input_captcha.length > 0) {
				var captcha_1 = parseInt(input_captcha.data('captcha1')),
					captcha_2 = parseInt(input_captcha.data('captcha2'));

				if (captcha_1 + captcha_2 != parseInt(input_captcha.val())) {
					input_captcha.addClass('invalid').val('');
					event.preventDefault();
				}
			}

			if (input_pass.length > 0 && input_pass.val() == '') {
				input_pass.addClass('invalid');
				event.preventDefault();
			}

			if (input_username.length > 0 && input_username.val() == '') {
				input_username.addClass('invalid');
				event.preventDefault();
			}

			if (input_email.length > 0 && ( input_email.val() == '' || !valid_email.test(input_email.val()) )) {
				input_email.addClass('invalid');
				event.preventDefault();
			}
		});

		//Validate comment form submit
		$('form#commentform').submit(function (event) {
			var elem = $(this),
				comment = elem.find('#comment[aria-required="true"]'),
				author = elem.find('#author[aria-required="true"]'),
				url = elem.find('#url[aria-required="true"]'),
				email = elem.find('#email[aria-required="true"]'),
				valid_email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

			if (author.length > 0 && author.val() == '') {
				author.addClass('invalid');
				event.preventDefault();
			}

			if (comment.length > 0 && comment.val() == '') {
				comment.addClass('invalid');
				event.preventDefault();
			}

			if (url.length > 0 && url.val() == '') {
				url.addClass('invalid');
				event.preventDefault();
			}

			if (email.length > 0 && ( email.val() == '' || !valid_email.test(email.val()) )) {
				email.addClass('invalid');
				event.preventDefault();
			}
		});

		$('#customer_login .register, #reg_username, #reg_email, #reg_password, .thim-login-captcha .captcha-result, #registerform input, #thim_login, #thim_pass, #comment, #author, #email').on('focus', function () {
			if ($(this).hasClass('invalid')) {
				$(this).removeClass('invalid');
			}
		});

		$('input.wpcf7-text, textarea.wpcf7-textarea').on('focus', function () {
			if ($(this).hasClass('wpcf7-not-valid')) {
				$(this).removeClass('wpcf7-not-valid');
			}
		});

		$('.thim-language').on({
			'mouseenter': function () {
				$(this).children('.list-lang').stop(true, false).fadeIn(250);
			},
			'mouseleave': function () {
				$(this).children('.list-lang').stop(true, false).fadeOut(250);
			}
		});

		$('#toolbar .menu li.menu-item-has-children').on({
			'mouseenter': function () {
				$(this).children('.sub-menu').stop(true, false).fadeIn(250);
			},
			'mouseleave': function () {
				$(this).children('.sub-menu').stop(true, false).fadeOut(250);
			}
		});

		//Widget gallery-posts
		$(window).load(function () {
			if ($('.thim-widget-gallery-posts .wrapper-gallery-filter').length > 0) {
				$('.thim-widget-gallery-posts .wrapper-gallery-filter').isotope({filter: '*'});
			}
		});

		$(document).on('click', '.filter-controls .filter', function (e) {
			e.preventDefault();
			var filter = $(this).data('filter'),
				filter_wraper = $(this).parents('.thim-widget-gallery-posts').find('.wrapper-gallery-filter');
			$('.filter-controls .filter').removeClass('active');
			$(this).addClass('active');
			filter_wraper.isotope({filter: filter});
		});

		$(document).on('click', '.thim-gallery-popup', function (e) {
			e.preventDefault();
			var elem = $(this),
				post_id = elem.attr('data-id'),
				data = {action: 'thim_gallery_popup', post_id: post_id};
			elem.addClass('loading');
			$.post(ajaxurl, data, function (response) {
				elem.removeClass('loading');
				$('.thim-gallery-show').append(response);
				if ($('.thim-gallery-show img').length > 0) {
					$('.thim-gallery-show').magnificPopup({
						mainClass   : 'my-mfp-zoom-in',
						type        : 'image',
						delegate    : 'a',
						showCloseBtn: false,
						gallery     : {
							enabled: true
						},
						callbacks   : {
							open: function () {
								$('body').addClass('thim-popup-active');
								$.magnificPopup.instance.close = function () {
									$('.thim-gallery-show').empty();
									$('body').removeClass('thim-popup-active');
									$.magnificPopup.proto.close.call(this);
								};
							},
						}
					}).magnificPopup('open');
				} else {
					$.magnificPopup.open({
						mainClass   : 'my-mfp-zoom-in',
						items       : {
							src : $('.thim-gallery-show'),
							type: 'inline'
						},
						showCloseBtn: false,
						callbacks   : {
							open: function () {
								$('body').addClass('thim-popup-active');
								$.magnificPopup.instance.close = function () {
									$('.thim-gallery-show').empty();
									$('body').removeClass('thim-popup-active');
									$.magnificPopup.proto.close.call(this);
								};
							},
						}
					});
				}

			});

		});

		$('.widget-button.custom_style').each(function () {
			var elem = $(this),
				old_style = elem.attr('style'),
				hover_style = elem.data('hover');
			elem.on({
				'mouseenter': function () {
					elem.attr('style', hover_style);
				},
				'mouseleave': function () {
					elem.attr('style', old_style);
				}
			})
		});

	});

	$(window).load(function () {
		thim_min_height_carousel($('.thim-carousel-instructors .instructor-item'));
		thim_min_height_carousel($('.thim-owl-carousel-post:not(.layout-3) .image'));
		thim_min_height_carousel($('.thim-course-carousel .course-thumbnail'));
		thim_min_height_carousel($('.thim-row-bg-border-top .thim-bg-border-top'));
		thim_min_height_carousel($('.thim-testimonial-carousel-kindergarten .item'));

		thim_min_height_carousel($('.thim-grid-posts .item-post .article-wrapper, .thim-grid-posts .item-post .article-image'));

		thim_min_height_carousel($('.thim-widget-carousel-categories .item .image, .thim-widget-carousel-categories .item .content-wrapper'));

		thim_min_height_content_area();
		if ($(window).width() > 767) {
			thim_min_height_carousel($('body.thim-demo-university-4 .thim-about-eduma, body.thim-demo-university-4 .thim-video-popup .video-info'));
		}

		if ($(window).width() > 767 && $(window).width() < 1200) {
			if ($('body.thim-demo-university-4 .thim-icon-our-programs').length) {
				var min_height = parseInt($('body.thim-demo-university-4 .thim-icon-our-programs').outerHeight() / 3);
				$('body.thim-demo-university-4 #sb_instagram .sbi_photo').css('min-height', min_height);
			}

		}

		$(window).resize(function () {
			$('.thim-carousel-instructors .instructor-item').css('min-height', '');
			$('.thim-owl-carousel-post:not(.layout-3) .image').css('min-height', '');
			$('.thim-course-carousel .course-thumbnail').css('min-height', '');
			$('body.thim-demo-university-4 .thim-about-eduma, body.thim-demo-university-4 .thim-video-popup .video-info').css('min-height', '');
			if ($(window).width() < 767 || $(window).width() > 1200) {
				$('body.thim-demo-university-4 #sb_instagram .sbi_photo').css('min-height', '');
			}
		});
	});

	function thim_min_height_carousel($selector) {
		var min_height = 0;
		$selector.each(function (index, val) {
			if ($(this).outerHeight() > min_height) {
				min_height = $(this).outerHeight();
			}
			if (index + 1 == $selector.length) {
				$selector.css('min-height', min_height);
			}
		});
	}

	function thim_min_height_content_area() {
		var content_area = $('#main-content .content-area'),
			footer = $('#main-content .site-footer'),
			winH = $(window).height();
		if (content_area.length > 0 && footer.length > 0) {
			content_area.css('min-height', winH - footer.height());
		}
	}


	//Widget counter box
	(function (a) {
		a.fn.countTo = function (g) {
			g = g || {};
			return a(this).each(function () {
				function e(a) {
					a = b.formatter.call(h, a, b);
					f.html(a);
				}

				var b = a.extend({}, a.fn.countTo.defaults, {
					from           : a(this).data("from"),
					to             : a(this).data("to"),
					speed          : a(this).data("speed"),
					refreshInterval: a(this).data("refresh-interval"),
					decimals       : a(this).data("decimals")
				}, g), j = Math.ceil(b.speed / b.refreshInterval), l = (b.to - b.from) / j, h = this, f = a(this), k = 0, c = b.from, d = f.data("countTo") || {};
				f.data("countTo", d);
				d.interval && clearInterval(d.interval);
				d.interval =
					setInterval(function () {
						c += l;
						k++;
						e(c);
						"function" == typeof b.onUpdate && b.onUpdate.call(h, c);
						k >= j && (f.removeData("countTo"), clearInterval(d.interval), c = b.to, "function" == typeof b.onComplete && b.onComplete.call(h, c));
					}, b.refreshInterval);
				e(c);
			});
		};
		a.fn.countTo.defaults = {
			from       : 0, to: 0, speed: 1E3, refreshInterval: 100, decimals: 0, formatter: function (a, e) {
				return a.toFixed(e.decimals);
			}, onUpdate: null, onComplete: null
		};
	})(jQuery);

	jQuery(window).load(function () {

		if (jQuery().waypoint) {
			jQuery('.counter-box').waypoint(function () {
				jQuery(this).find('.display-percentage').each(function () {
					var percentage = jQuery(this).data('percentage');
					jQuery(this).countTo({from: 0, to: percentage, refreshInterval: 40, speed: 2000});
				});
			}, {
				triggerOnce: true,
				offset     : '80%'
			});
		}

	});

	$(document).ready(function () {
		$('.thim-search-light-style').append('<a class="thim-button-down thim-click-to-bottom" href="#"><i class="fa fa-chevron-down"></i></a>');
		$(document).on('click', '.thim-button-down', function (e) {
			e.preventDefault();
			if ($('#wpadminbar').length > 0) {
				var height = parseInt($('#wpadminbar').outerHeight()) + parseInt($('.thim-search-light-style').outerHeight());
			} else {
				var height = parseInt($('.thim-search-light-style').outerHeight());
			}
			$('body, html').animate({
				'scrollTop': height
			}, 600);
		});

		$(document).on('click', 'body.page-template-landing-page .current_page_item>a, .thim-top-landing .widget-button', function (e) {
			if ($('.thim-top-landing').length > 0) {
				e.preventDefault();
				if ($('#wpadminbar').length > 0) {
					var height = parseInt($('#wpadminbar').outerHeight()) + parseInt($('.thim-top-landing').outerHeight());
				} else {
					var height = parseInt($('.thim-top-landing').outerHeight());
				}
				$('body, html').animate({
					'scrollTop': height
				}, 600);
			}
		});

	});
	$(document).ready(function () {
		//Shop filter color
		$('.woof_list input[data-tax="pa_color"]').each(function () {
			$(this).css('background-color', $(this).attr('name'));
		});
		$('.woof_list input.woof_radio_term[name="pa_color"]').each(function () {
			$(this).css('background-color', $(this).data('slug'));
		});
	});

	woof_js_after_ajax_done = function () {
		$('.woof_list input[data-tax="pa_color"]').each(function () {
			$(this).css('background-color', $(this).attr('name'));
		});
		$('.woof_list input.woof_radio_term[name="pa_color"]').each(function () {
			$(this).css('background-color', $(this).data('slug'));
		});

		if ($('#thim-product-archive').hasClass('thim-product-list')) {
			$('.thim-product-switch-layout>a.switchToGrid.switch-active').removeClass('switch-active');
			$('.thim-product-switch-layout>a.switchToList').addClass('switch-active');
		} else {
			$('.thim-product-switch-layout>a.switchToList.switch-active').removeClass('switch-active');
			$('.thim-product-switch-layout>a.switchToGrid').addClass('switch-active');
		}

	}

	//Code for timetable widget
	$(document).ready(function () {

		//Add class for nav-tabs single course
		var tab_course = $('.course-tabs .nav-tabs>li').length;
		if (tab_course > 0) {
			$('.course-tabs .nav-tabs>li').addClass('thim-col-' + tab_course);
		}

		$('.thim-widget-timetable .timetable-item ').each(function () {
			var elem = $(this),
				old_style = elem.attr('style'),
				hover_style = elem.data('hover');
			elem.on({
				'mouseenter': function () {
					elem.attr('style', hover_style);
				},
				'mouseleave': function () {
					elem.attr('style', old_style);
				}
			})
		});

		//Resize window when click certificate tab on page profile
		$('.profile-tabs a[href^=#user_certificates]').on('click', function () {
			$(window).resize();
			if ($('.canvas-container').length > 0) {
				$('.canvas-container').trigger('click');
			}
		});

		if (typeof LP != 'undefined') {
			LP.Hook.addAction('learn_press_receive_message', function () {
				var lesson_title = $('.course-item.item-current .course-item-title').text(),
					lesson_index = $('.course-item.item-current .index').text();
				$('#popup-header .popup-title').html('<span class="index">' + lesson_index + '</span>' + lesson_title);
			});
		}

		$('.thim-video-popup .button-popup').on('click', function (e) {
			e.preventDefault();
			$.magnificPopup.open({
				items       : {
					src : $('.video-content'),
					type: 'inline'
				},
				showCloseBtn: false,
				callbacks   : {
					open: function () {
						$('body').addClass('thim-popup-active');
						$.magnificPopup.instance.close = function () {
							$('body').removeClass('thim-popup-active');
							$.magnificPopup.proto.close.call(this);
						};
					},
				}
			});
		});

		$('.mc4wp-form #mc4wp_email').on('focus', function () {
			$(this).parents('.mc4wp-form').addClass('focus-input');
		}).on('focusout', function () {
			$(this).parents('.mc4wp-form.focus-input').removeClass('focus-input');
		});

		$(document).on('click', '.button-retake-course, .button-finish-course', function () {
			$('.thim-box-loading-container.visible').removeClass('visible');
		});

		$(document).on('click', '.button-load-item', function () {
			$('#course-curriculum-popup').addClass('loading');
			$('.thim-box-loading-container').addClass('visible');
		});

		//Thim simple slider
		$('.thim-event-simple-slider').thim_simple_slider({
			item        : 3,
			itemActive  : 1,
			itemSelector: '.item-event',
			align       : 'right',
			pagination  : true,
			navigation  : true,
			height      : 392,
			activeWidth : 1170,
			itemWidth   : 800,
			prev_text   : '<i class="fa fa-long-arrow-left"></i>',
			next_text   : '<i class="fa fa-long-arrow-right"></i>'
		});

		$('.width-navigation .menu-main-menu>li.menu-item').last().addClass('last-menu-item');


		//add mac-os to body class
		if (navigator.userAgent.indexOf('Mac') > 0) {
			$('body').addClass('mac-os');
		}

		//Set padding for demo vc RTL
		setTimeout(function () {
			$(window).trigger('resize');
		}, 1000);
		$(window).resize(function () {
			var get_padding1 = parseFloat($('body.rtl .vc_row-has-fill[data-vc-full-width="true"]').css('left')),
				get_padding2 = parseFloat($('body.rtl .vc_row-no-padding[data-vc-full-width="true"]').css('left'));
			if (get_padding1 != 'undefined') {
				$('body.rtl .vc_row-has-fill[data-vc-full-width="true"]').css({'right': get_padding1, 'left': ''});
			}
			if (get_padding2 != 'undefined') {
				$('body.rtl .vc_row-no-padding[data-vc-full-width="true"]').css({'right': get_padding2, 'left': ''});
			}
		});


		//Course archive search filter
		var search_time_out = null;
		$(document).on('keyup', 'body:not(.course-filter-active) .course-search-filter', function (event) {
			if (event.ctrlKey) {
				return;
			}
			if (( event.keyCode >= 48 && event.keyCode <= 90 ) || event.keyCode == 8 || event.keyCode == 32) {
				var elem = $(this),
					keyword = elem.val();

				if (search_time_out != null) clearTimeout(search_time_out);
				search_time_out = setTimeout(function () {
					elem.attr('disabled', 'disabled');
					search_time_out = null;
					$('body').addClass('course-filter-active').append('<div class="filter-loading"><div class="cssload-container"><div class="cssload-loading"><i></i><i></i><i></i><i></i></div></div></div>');
					var url_ajax = window.location.protocol + "//" + window.location.host + window.location.pathname;
					url_ajax = url_ajax.replace(/\/page\/[0-9]+\/?/, '/');
					var archive = elem.parents('#lp-archive-courses');
					$.ajax({
						type    : 'POST',
						dataType: 'html',
						url     : url_ajax + '?s=' + keyword + '&ref=course',
						success : function (html) {
							var archive_html = $(html).find('#lp-archive-courses').html();
							archive.html(archive_html);
							$('.course-search-filter').val(keyword).trigger('focus');
							$('body').removeClass('course-filter-active');
							$('.filter-loading').remove();
						},
						error   : function () {
							$('body').removeClass('course-filter-active');
							$('.filter-loading').remove();
						}
					});

				}, 1000);
			}
		});

		$(document).on('click', '.button-load-item', function () {
			can_escape = false;
		});

		$(document).on('keydown', function (event) {
			if (event.keyCode == 27) {
				if (typeof can_escape !== 'undefined') {
					if (can_escape === false) {
						event.preventDefault();
					}
				}
			}

		});

		//Add view password into checkbox field
		$('.login-password').append('<span id="show_pass"><i class="fa fa-eye"></i></span>');
		$(document).on('click', '#show_pass', function () {
			var el = $(this),
				thim_pass = el.parents('.login-password').find('>input');
			if (el.hasClass('active')) {
				thim_pass.attr('type', 'password');
			} else {
				thim_pass.attr('type', 'text');
			}
			el.toggleClass('active');
		});

	});

})(jQuery);
