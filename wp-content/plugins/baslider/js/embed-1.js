"use strict";
(function($) {
	$(document).ready(function(){
        
        var sliders = $(".slider_instance");

        $.each(sliders, function(){
			var id = $(this).attr('id');
            
            var options = $(this).data('slider-options')
            
            if(typeof options == 'undefined'){
                
                options = window['nextcodeslider_' + id]

                var json_str = options.replace(/&quot;/g, '"');
                json_str = json_str.replace(/“/g, '"');
                json_str = json_str.replace(/”/g, '"');
                json_str = json_str.replace(/″/g, '"');
                json_str = json_str.replace(/„/g, '"');

                json_str = json_str.replace(/«&nbsp;/g, '"');
                json_str = json_str.replace(/&nbsp;»/g, '"');

                options = jQuery.parseJSON(json_str);
            }
            this.removeAttribute('data-slider-options');
            
            function convertStrings(obj) {

                $.each(obj, function(key, value) {
                    if (typeof(value) == 'object' || typeof(value) == 'array') {
                        convertStrings(value)
                    } else if (!isNaN(value)) {
                        if (obj[key] === "")
                            delete obj[key]
                        else
                            obj[key] = Number(value)
                    } else if (value == "true") {
                        obj[key] = true
                    } else if (value == "false") {
                        obj[key] = false
                    }
                });

            }
            convertStrings(options)
            
            if(options.navigation && !options.navigation.enable)   options.navigation = false;
            if(options.pagination && !options.pagination.enable)   options.pagination = false;
            if(options.keyboard && !options.keyboard.enable)  options.keyboard = false;
            if(options.autoplay && !options.autoplay.enable) options.autoplay = false;
            if(options.hashNavigation && !options.hashNavigation.enable) options.hashNavigation = false;
            if(options.shadow && options.shadow == "off") options.shadow = null;
            
            for(var key in options.slides){
                var slide = options.slides[key]
                if(slide.elements){
                    for (var key2 in slide.elements){
                        delete slide.elements[key2].node
                    }
                }
            }

            var slider = $(this)
            
			if($.isEmptyObject(slider.data())){
				var i = setInterval(function(){
					if(!$.isEmptyObject(slider.data())){
						slider.nextcodeSlider(options);
						clearInterval(i);
					}
				}, 200);
			}
            else
				slider.nextcodeSlider(options);
		})
        
	});
}(jQuery));
