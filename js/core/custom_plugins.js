jQuery(document).ready(function(){ 
	"use strict";

	jQuery.fn.center = function ()
	{
	    this.css("left", (jQuery(window).width() / 2) - (this.outerWidth() / 2));
	    return this;
	}
	
	jQuery.fn.setNav = function(){
		var calScreenWidth = jQuery(window).width();
		var menuLayout = jQuery('#pp_menu_layout').val();
		
		if(calScreenWidth >= 960)
		{
			jQuery('#menu-wrapper .nav li.menu-item').each(function()
			{
				var documentWidth = parseInt(jQuery(document).width());
				var subMenu = jQuery(this).children('ul:first');
				
				if(typeof subMenu.offset() != 'undefined')
				{
					var subMenuPosLeft = subMenu.offset().left;
					var subMenuPosLeftLast = parseInt(subMenuPosLeft+220);
					
					if(parseInt(documentWidth - subMenuPosLeftLast) < 0)
					{
						subMenu.addClass('viewport-flip');
					}
				}
				else
				{
					subMenu.removeClass('viewport-flip');
				}
				
				jQuery(this).children('ul:first').addClass('visible');
				jQuery(this).children('ul:first').addClass('hover');
			});
			
			jQuery('#menu-wrapper .nav li.menu-item').hover(function()
			{
				var documentWidth = parseInt(jQuery(document).width());
				var subMenu = jQuery(this).children('ul:first');
				
				if(typeof subMenu.offset() != 'undefined')
				{
					var subMenuPosLeft = subMenu.offset().left;
					var subMenuPosLeftLast = parseInt(subMenuPosLeft+220);
					
					if(parseInt(documentWidth - subMenuPosLeftLast) < 0)
					{
						subMenu.addClass('viewport-flip');
					}
				}
				else
				{
					subMenu.removeClass('viewport-flip');
				}
				
				jQuery(this).children('ul:first').addClass('visible');
				jQuery(this).children('ul:first').addClass('hover');
			},
			function()
			{	
				jQuery(this).children('ul:first').removeClass('visible');
				jQuery(this).children('ul:first').removeClass('hover');
			});
			
			jQuery('#menu-wrapper .nav li.menu-item').children('ul:first.hover').hover(function()
			{
				jQuery(this).stop().addClass('visible');
			},
			function()
			{	
				jQuery(this).stop().removeClass('visible');
			});
		}
		
		jQuery( window ).resize(function() {
			jQuery('#menu-wrapper .nav li.menu-item ul.sub-menu').removeClass('viewport-flip');
			
			jQuery('#menu-wrapper .nav li.menu-item').each(function()
			{
				var documentWidth = parseInt(jQuery(document).width());
				var subMenu = jQuery(this).children('ul:first');
				
				if(typeof subMenu.offset() != 'undefined')
				{
					var subMenuPosLeft = subMenu.offset().left;
					var subMenuPosLeftLast = parseInt(subMenuPosLeft+220);
					
					if(parseInt(documentWidth - subMenuPosLeftLast) < 0)
					{
						subMenu.addClass('viewport-flip');
					}
				}
				else
				{
					subMenu.removeClass('viewport-flip');
				}
				
				jQuery(this).children('ul:first').addClass('visible');
				jQuery(this).children('ul:first').addClass('hover');
			});
		});
		
		jQuery('body').on('click', '.mobile-main-nav li a, #side-sub-menu li a', function(event) {
		    var jQuerysublist = jQuery(this).parent('li').find('ul.sub-menu:first');
		    var menuContainerClass = jQuery(this).parent('li').parent('#mobile_main_menu.mobile-main-nav').parent('div');
		    
		    var documentScroll = jQuery(document).scrollTop();
			var linkURL = jQuery(this).attr('href');
			var sectionID = jQuery(this).attr('href').substr(1);
			
			if(linkURL.slice(0,1)=='#' && sectionID != '')
			{
				event.preventDefault();
				var topBarHeight = jQuery('.top-menu-bar').height();
				jQuery('#btn-close-mobile-menu').trigger('click');
				
				if(sectionID=='top')
				{
					jQuery('body,html').animate({scrollTop:0},1200);
				}
				else
				{
					if(documentScroll != 0)
					{
						var scrollToPos = parseInt(jQuery('#'+sectionID).offset().top-topBarHeight-32);
					}
					else
					{
						var scrollToPos = parseInt(jQuery('#'+sectionID).offset().top-topBarHeight+82);
					}
				
					jQuery('body,html').animate({
					    scrollTop: scrollToPos
					}, 1200);
				}
				
				jQuery('#menu-wrapper div .nav li').removeClass('current-menu-item');
				jQuery(this).parent('li').addClass('current-menu-item');
				
				if(jQuery(window).width() < 960)
				{
					jQuery('body').removeClass('js-nav');
				}
			}
		    
		    if(jQuerysublist.length>0)
		    {
			    event.preventDefault();
		    }
		    
		    var menuLevel = 'top_level';
		    var parentMenu = '';
		    var menuClickedId = jQuery(this).attr('id');
		    
		    if(jQuery(this).parent('li').parent('ul').attr('id')=='mobile_main_menu')
		    {
			    menuLevel = 'parent_level';
		    }
		    else
		    {
			    parentMenu = jQuery(this).parent('li').attr('id');
		    }
	
		    if(jQuerysublist.length>0)
		    {
			    jQuery('#mobile_main_menu.mobile-main-nav').addClass('mobile-nav-out');
			    jQuery('.mobile-menu-wrapper div #side-sub-menu').removeClass('mobile-sub-nav-in');
			    jQuery('.mobile-menu-wrapper div #side-sub-menu').addClass('mobile-nav-out');
			    
			    if(jQuery('#pp_menu_layout').val() == 'full-burger-menu')
			    {
				    jQuery('.mobile-menu-wrapper .logo-container').fadeOut('slow');
				    jQuery('.mobile-menu-wrapper .social-profile-wrapper').fadeOut('slow');
			    }
			    
			    setTimeout(function() {
			    	jQuery('#mobile_main_menu.mobile-main-nav').css('display', 'none');
			    	jQuery('.mobile-menu-wrapper div #side-sub-menu').remove();
			    
			        var subMenuHTML = '<li><a href="javascript:;" id="mobile-back-btn" class="'+menuLevel+'" data-parent="'+parentMenu+'">'+avantePluginParams.backTitle+'</a></li>';
			        subMenuHTML += jQuerysublist.html();
			        
			    	menuContainerClass.append('<ul id="side-sub-menu" class="nav '+menuLevel+'"></ul>');
			    	menuContainerClass.find('#side-sub-menu').html(subMenuHTML);
			    	menuContainerClass.find('#side-sub-menu').addClass('mobile-sub-nav-in');
			    }, 200);
		    }
		});
		
		jQuery('body').on('click', '#mobile-back-btn.parent_level', function() {
			jQuery('.mobile-menu-wrapper div #side-sub-menu').removeClass('mobile-sub-nav-in');
			jQuery('.mobile-menu-wrapper div #side-sub-menu').addClass('mobile-sub-nav-out');
			jQuery('#mobile_main_menu.mobile-main-nav').removeClass('mobile-nav-out');
			
			if(jQuery('#pp_menu_layout').val() == 'full-burger-menu')
			{
			    jQuery('.mobile-menu-wrapper .logo-container').fadeIn('slow');
			    jQuery('.mobile-menu-wrapper .social-profile-wrapper').fadeIn('slow');
			}
			
			setTimeout(function() {
				jQuery('.mobile-menu-wrapper div #side-sub-menu').remove();
				jQuery('#mobile_main_menu.mobile-main-nav').css('display', 'block');
				jQuery('#mobile_main_menu.mobile-main-nav').addClass('mobile-nav-in');
			}, 200);
		});
		
		jQuery('body').on('click', '#mobile-back-btn.top_level', function() {
			event.preventDefault();
			jQuery('.mobile-menu-wrapper div #side-sub-menu').addClass('mobile-sub-nav-out');
			var parentMenuId = jQuery(this).data('parent');
			
			setTimeout(function() {
				jQuery('.mobile-menu-wrapper div #side-sub-menu').remove();
				var menuLevel = 'top_level';
				var parentMenu = '';
	
				if(jQuery('#mobile_main_menu.mobile-main-nav li#'+parentMenuId).parent('ul.sub-menu:first').parent('li').parent('ul#main_menu').length == 1)
				{
					menuLevel = 'parent_level';
				}
				else
				{
					parentMenu = jQuery('#mobile_main_menu.mobile-main-nav li#'+parentMenuId).parent('ul.sub-menu:first').parent('li').attr('id');
				}
				
				var subMenuHTML = '<li><a href="javascript:;" id="mobile-back-btn" class="'+menuLevel+'" data-parent="'+parentMenu+'">'+avantePluginParams.backTitle+'</a></li>';
				subMenuHTML+= jQuery('#mobile_main_menu.mobile-main-nav li#'+parentMenuId).parent('ul.sub-menu:first').html();
				jQuery('.mobile-menu-wrapper div').append('<ul id="side-sub-menu" class="nav '+menuLevel+'"></ul>');
				    
				jQuery('.mobile-menu-wrapper div #side-sub-menu').html(subMenuHTML);
				jQuery('.mobile-menu-wrapper div #side-sub-menu').addClass('mobile-nav-in');
			}, 200);
		});
	}
});

function adjustIframes()
{
  jQuery('iframe').each(function(){
  
    var
    $this       = jQuery(this),
    proportion  = $this.data( 'proportion' ),
    w           = $this.attr('width'),
    actual_w    = $this.width();
    
    if ( ! proportion )
    {
        proportion = $this.attr('height') / w;
        $this.data( 'proportion', proportion );
    }
  
    if ( actual_w != w )
    {
        $this.css( 'height', Math.round( actual_w * proportion ) + 'px !important' );
    }
  });
}

function is_touch_device() {
  return 'ontouchstart' in window // works on most browsers 
      || 'onmsgesturechange' in window; // works on ie10
}

function triggerClick(element) {
    if(document.createEvent) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(evt);
    }
    else {
        element.click();
    }
}