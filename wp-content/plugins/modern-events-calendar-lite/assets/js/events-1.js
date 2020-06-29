// Set datepicker default value.
var datepicker_format = 'yy-mm-dd';

jQuery(document).ready(function($)
{
    // Image picker on terms menu
    $('.mec_upload_image_button').click(function(event)
    {
        event.preventDefault();
        
        var frame;
        if(frame)
        {
            frame.open();
            return;
        }

        frame = wp.media();
        frame.on('select', function()
        {
            // Grab the selected attachment.
            var attachment = frame.state().get('selection').first();

            $('#mec_thumbnail_img').html('<img src="'+attachment.attributes.url+'" />');
            $('#mec_thumbnail').val(attachment.attributes.url);
            
            $('.mec_remove_image_button').toggleClass('mec-util-hidden');
            
            frame.close();
        });
        
        frame.open();
    });
    
    // Image remover on terms menu
    $('.mec_remove_image_button').click(function(event)
    {
        event.preventDefault();
        
        $('#mec_thumbnail_img').html('');
        $('#mec_thumbnail').val('');
        
        $('.mec_remove_image_button').toggleClass('mec-util-hidden');
    });
    
    // Image picker on add event menu for location
    $('.mec_location_upload_image_button').click(function(event)
    {
        event.preventDefault();
        
        var frame;
        if(frame)
        {
            frame.open();
            return;
        }

        frame = wp.media();
        frame.on('select', function()
        {
            // Grab the selected attachment.
            var attachment = frame.state().get('selection').first();

            $('#mec_location_thumbnail_img').html('<img src="'+attachment.attributes.url+'" />');
            $('#mec_location_thumbnail').val(attachment.attributes.url);
            
            $('.mec_location_remove_image_button').toggleClass('mec-util-hidden');
            
            frame.close();
        });
        
        frame.open();
    });
    
    // Image remover on add event menu for location
    $('.mec_location_remove_image_button').click(function(event)
    {
        event.preventDefault();
        
        $('#mec_location_thumbnail_img').html('');
        $('#mec_location_thumbnail').val('');
        
        $('.mec_location_remove_image_button').toggleClass('mec-util-hidden');
    });
    
    // Image picker on add event menu for organizer
    $('.mec_organizer_upload_image_button').click(function(event)
    {
        event.preventDefault();
        
        var frame;
        if(frame)
        {
            frame.open();
            return;
        }

        frame = wp.media();
        frame.on('select', function()
        {
            // Grab the selected attachment.
            var attachment = frame.state().get('selection').first();

            $('#mec_organizer_thumbnail_img').html('<img src="'+attachment.attributes.url+'" />');
            $('#mec_organizer_thumbnail').val(attachment.attributes.url);
            
            $('.mec_organizer_remove_image_button').toggleClass('mec-util-hidden');
            
            frame.close();
        });
        
        frame.open();
    });
    
    // Image remover on add event menu for organizer
    $('.mec_organizer_remove_image_button').click(function(event)
    {
        event.preventDefault();
        
        $('#mec_organizer_thumbnail_img').html('');
        $('#mec_organizer_thumbnail').val('');
        
        $('.mec_organizer_remove_image_button').toggleClass('mec-util-hidden');
    });
    
    // Image remover on frontend event submission menu
    $('#mec_fes_remove_image_button').click(function(event)
    {
        event.preventDefault();
        
        $('#mec_fes_thumbnail_img').html('');
        $('#mec_fes_thumbnail').val('');
        $('#mec_featured_image_file').val('');
        
        $('#mec_fes_remove_image_button').addClass('mec-util-hidden');
    });
    
    // Location Image remover on frontend event submission menu
    $('#mec_fes_location_remove_image_button').click(function(event)
    {
        event.preventDefault();
        
        $('#mec_fes_location_thumbnail_img').html('');
        $('#mec_fes_location_thumbnail').val('');
        $('#mec_fes_location_thumbnail_file').val('');
        
        $('#mec_fes_location_remove_image_button').addClass('mec-util-hidden');
    });
    
    // Organizer Image remover on frontend event submission menu
    $('#mec_fes_organizer_remove_image_button').click(function(event)
    {
        event.preventDefault();
        
        $('#mec_fes_organizer_thumbnail_img').html('');
        $('#mec_fes_organizer_thumbnail').val('');
        $('#mec_fes_organizer_thumbnail_file').val('');
        
        $('#mec_fes_organizer_remove_image_button').addClass('mec-util-hidden');
    });
    
    if ( typeof mec_admin_localize !== 'undefined' ) {
        var date_splite = mec_admin_localize.datepicker_format.split( '&' );
        
        if ( date_splite[0] !== undefined && date_splite.length == 2 ) {
            datepicker_format = date_splite[0];
        }
    } else if ( typeof mecdata !== 'undefined' ) {
        var date_splite = mecdata.datepicker_format.split( '&' );
        
        if ( date_splite[0] !== undefined && date_splite.length == 2 ) {
            datepicker_format = date_splite[0];
        }
    }

    if ($.fn.datepicker) {
        $('#mec_start_date').datepicker(
        {
            changeYear: true,
            changeMonth: true,
            dateFormat: datepicker_format,
            gotoCurrent: true,
            yearRange: 'c-3:c+5',
        });
        
        $('#mec_end_date').datepicker(
        {
            changeYear: true,
            changeMonth: true,
            dateFormat: datepicker_format,
            gotoCurrent: true,
            yearRange: 'c-3:c+5',
        });
        
        $('#mec_date_repeat_end_at_date').datepicker(
        {
            changeYear: true,
            changeMonth: true,
            dateFormat: datepicker_format,
            gotoCurrent: true,
            yearRange: 'c-3:c+5',
        });
        
        $('.mec_date_picker_dynamic_format').datepicker(
        {
            changeYear: true,
            changeMonth: true,
            dateFormat: datepicker_format,
            gotoCurrent: true,
            yearRange: 'c-3:c+5',
        });

        $('.mec_date_picker').datepicker(
        {
            changeYear: true,
            changeMonth: true,
            dateFormat: 'yy-mm-dd',
            gotoCurrent: true,
            yearRange: 'c-3:c+5',
        });
    }
    
    $('#mec_location_id').on('change', function()
    {
        mec_location_toggle();
    });
    
    $('#mec_organizer_id').on('change', function()
    {
        mec_organizer_toggle();
        var mec_organizer_val = parseInt($(this).val());
        var mec_additional_organizer = $(this).parent().parent().find('#mec-additional-organizer-wrap');

        if(mec_organizer_val != 1) mec_additional_organizer.show();
        else mec_additional_organizer.hide();
    });
    
    mec_location_toggle();
    mec_organizer_toggle();
    
    $('#mec_repeat').on('change', function()
    {
        mec_repeat_toggle();
    });
    
    mec_repeat_toggle();
    
    $('#mec_repeat_type').on('change', function()
    {
        mec_repeat_type_toggle();
    });
    
    mec_repeat_type_toggle();
    
    $('#mec_bookings_limit_unlimited').on('change', function()
    {
        mec_bookings_unlimited_toggle();
    });
    
    $('#mec_add_in_days').on('click', function()
    {
        var start = $('#mec_exceptions_in_days_start_date').val();
        if(start === '') return false;

        var end = $('#mec_exceptions_in_days_end_date').val();
        if(end === '') return false;

        var value = start + ':' + end;
        var label = start + ' - ' + end;
        
        var key = $('#mec_new_in_days_key').val();
        var html = $('#mec_new_in_days_raw').html().replace(/:i:/g, key).replace(/:val:/g, value).replace(/:label:/g, label);
        
        $('#mec_in_days').append(html);
        $('#mec_new_in_days_key').val(parseInt(key)+1);
    });
    
    $('#mec_add_not_in_days').on('click', function()
    {
        var date = $('#mec_exceptions_not_in_days_date').val();
        if(date === '') return false;
        
        var key = $('#mec_new_not_in_days_key').val();
        var html = $('#mec_new_not_in_days_raw').html().replace(/:i:/g, key).replace(/:val:/g, date);
        
        $('#mec_not_in_days').append(html);
        $('#mec_new_not_in_days_key').val(parseInt(key)+1);
    });
    
    $('#mec_add_ticket_button').on('click', function()
    {
        var key = $('#mec_new_ticket_key').val();
        var html = $('#mec_new_ticket_raw').html().replace(/:i:/g, key);
        
        $('#mec_tickets').append(html);
        $('#mec_new_ticket_key').val(parseInt(key)+1);

        $('.mec_add_price_date_button').off('click').on('click', function()
        {
            mec_handle_add_price_date_button(this);
        });
    });

    $('.mec_add_price_date_button').off('click').on('click', function()
    {
        mec_handle_add_price_date_button(this);
    });

    $('#mec_add_hourly_schedule_day_button').on('click', function()
    {
        var key = $('#mec_new_hourly_schedule_day_key').val();
        var html = $('#mec_new_hourly_schedule_day_raw').html().replace(/:d:/g, key).replace(/:dd:/g, parseInt(key)+1);

        $('#mec_meta_box_hourly_schedule_days').append(html);
        $('#mec_new_hourly_schedule_day_key').val(parseInt(key)+1);

        mec_hourly_schedule_listeners();
    });

    mec_hourly_schedule_listeners();
    
    $('#mec_add_fee_button').on('click', function()
    {
        var key = $('#mec_new_fee_key').val();
        var html = $('#mec_new_fee_raw').html().replace(/:i:/g, key);
        
        $('#mec_fees_list').append(html);
        $('#mec_new_fee_key').val(parseInt(key)+1);
    });

    $('#mec_add_ticket_variation_button').on('click', function()
    {
        var key = $('#mec_new_ticket_variation_key').val();
        var html = $('#mec_new_ticket_variation_raw').html().replace(/:i:/g, key);

        $('#mec_ticket_variations_list').append(html);
        $('#mec_new_ticket_variation_key').val(parseInt(key)+1);
    });
    
    $('.mec-form-row.mec-available-color-row span').on('click', function()
    {
        $('.mec-form-row.mec-available-color-row span').removeClass('color-selected');
        $(this).addClass('color-selected');
    });

    $('#mec_reg_form_field_types button').on('click', function()
    {
        var type = $(this).data('type');

        if (type == 'mec_email') {
            if ($('#mec_reg_form_fields').find('input[value="mec_email"][type="hidden"]').length) {
                return false;
            }
        }

        if (type == 'name') {
            if ($('#mec_reg_form_fields').find('input[value="name"][type="hidden"]').length) {
                return false;
            }
        }
        
        var key  = $('#mec_new_reg_field_key').val();
        var html = $('#mec_reg_field_'+type).html().replace(/:i:/g, key);

        $('#mec_reg_form_fields').append(html);
        $('#mec_new_reg_field_key').val(parseInt(key)+1);

        // Set onclick listener for add option fields
        mec_reg_fields_option_listeners();
    });

    // Set onclick listener for add option fields
    mec_reg_fields_option_listeners();

    // Advanced Reapiting
    $('#mec-advanced-wraper ul > ul > li').click(function()
    {
        if($(this).attr('class') == '') $(this).attr('class', 'mec-active');
        else $(this).attr('class', '');
        $('#mec_date_repeat_advanced').val($('#mec-advanced-wraper div:first-child > ul').find('.mec-active').find('span').text().slice(0, -1));
    });
});

function mec_location_toggle()
{
    if(jQuery('#mec_location_id').val() != '0') jQuery('#mec_location_new_container').hide();
    else jQuery('#mec_location_new_container').show();
}

function mec_organizer_toggle()
{
    if(jQuery('#mec_organizer_id').val() != '0') jQuery('#mec_organizer_new_container').hide();
    else jQuery('#mec_organizer_new_container').show();
}

function mec_repeat_toggle()
{
    if(jQuery('#mec_repeat').is(':checked')) jQuery('.mec-form-repeating-event-row').show();
    else jQuery('.mec-form-repeating-event-row').hide();
}

function mec_repeat_type_toggle()
{
    var repeat_type = jQuery('#mec_repeat_type').val();
    
    if(repeat_type == 'certain_weekdays')
    {
        jQuery('#mec_repeat_interval_container').hide();
        jQuery('#mec_repeat_certain_weekdays_container').show();
        jQuery('#mec_exceptions_in_days_container').hide();
        jQuery('#mec_end_wrapper').show();
        jQuery('#mec-advanced-wraper').hide();
    }
    else if(repeat_type == 'custom_days')
    {
        jQuery('#mec_repeat_interval_container').hide();
        jQuery('#mec_repeat_certain_weekdays_container').hide();
        jQuery('#mec_exceptions_in_days_container').show();
        jQuery('#mec_end_wrapper').hide();
        jQuery('#mec-advanced-wraper').hide();
    }
    else if(repeat_type == 'advanced')
    {
        jQuery('#mec_repeat_interval_container').hide();
        jQuery('#mec_repeat_certain_weekdays_container').hide();
        jQuery('#mec_exceptions_in_days_container').hide();
        jQuery('#mec_end_wrapper').show();
        jQuery('#mec-advanced-wraper').show();
    }
    else if(repeat_type != 'daily' && repeat_type != 'weekly')
    {
        jQuery('#mec_repeat_interval_container').hide();
        jQuery('#mec_repeat_certain_weekdays_container').hide();
        jQuery('#mec_exceptions_in_days_container').hide();
        jQuery('#mec_end_wrapper').show();
        jQuery('#mec-advanced-wraper').hide();
    }
    else
    {
        jQuery('#mec_repeat_interval_container').show();
        jQuery('#mec_repeat_certain_weekdays_container').hide();
        jQuery('#mec_exceptions_in_days_container').hide();
        jQuery('#mec_end_wrapper').show();
        jQuery('#mec-advanced-wraper').hide();
    }
}

function mec_in_days_remove(i)
{
    jQuery('#mec_in_days_row'+i).remove();
}

function mec_not_in_days_remove(i)
{
    jQuery('#mec_not_in_days_row'+i).remove();
}

function mec_bookings_unlimited_toggle()
{
    jQuery('#mec_bookings_limit').toggleClass('mec-util-hidden');
}

function mec_hourly_schedule_listeners()
{
    jQuery('.mec-add-hourly-schedule-button').off('click').on('click', function()
    {
        var day = jQuery(this).data('day');
        var key = jQuery('#mec_new_hourly_schedule_key'+day).val();
        var html = jQuery('#mec_new_hourly_schedule_raw'+day).html().replace(/:i:/g, key).replace(/:d:/g, day);

        jQuery('#mec_hourly_schedules'+day).append(html);
        jQuery('#mec_new_hourly_schedule_key'+day).val(parseInt(key)+1);
    });
}

function mec_hourly_schedule_remove(day, i)
{
    jQuery("#mec_hourly_schedule_row"+day+'_'+i).remove();
}

function mec_hourly_schedule_day_remove(day)
{
    jQuery("#mec_meta_box_hourly_schedule_day_"+day).remove();
}

function mec_ticket_remove(i)
{
    jQuery("#mec_ticket_row"+i).remove();
}

function mec_set_event_color(color)
{
    try
    {
        jQuery("#mec_event_color").wpColorPicker('color', '#'+color);
    }
    catch(e)
    {
        jQuery("#mec_event_color").val(color);
    }
}

function mec_remove_fee(key)
{
    jQuery("#mec_fee_row"+key).remove();
}

function mec_remove_ticket_variation(key)
{
    jQuery("#mec_ticket_variation_row"+key).remove();
}

function mec_reg_fields_option_listeners()
{
    jQuery('button.mec-reg-field-add-option').on('click', function()
    {
        var field_id = jQuery(this).data('field-id');
        var key = jQuery('#mec_new_reg_field_option_key_'+field_id).val();
        var html = jQuery('#mec_reg_field_option').html().replace(/:i:/g, key).replace(/:fi:/g, field_id);

        jQuery('#mec_reg_fields_'+field_id+'_options_container').append(html);
        jQuery('#mec_new_reg_field_option_key_'+field_id).val(parseInt(key)+1);
    });

    if(typeof jQuery.fn.sortable !== 'undefined')
    {
        jQuery("#mec_reg_form_fields").sortable(
        {
            handle: '.mec_reg_field_sort'
        });

        jQuery(".mec_reg_fields_options_container").sortable(
        {
            handle: '.mec_reg_field_option_sort'
        });
    }
}

function mec_reg_fields_option_remove(field_key, key)
{
    jQuery("#mec_reg_fields_option_"+field_key+"_"+key).remove();
}

function mec_reg_fields_remove(key)
{
    jQuery("#mec_reg_fields_"+key).remove();
}

function mec_handle_add_price_date_button(e)
{
    var key = jQuery(e).data('key');
    var p = jQuery('#mec_new_ticket_price_key_'+key).val();
    var html = jQuery('#mec_new_ticket_price_raw_'+key).html().replace(/:i:/g, key).replace(/:j:/g, p);

    jQuery('#mec-ticket-price-dates-'+key).append(html);
    jQuery('#mec_new_ticket_price_key_'+key).val(parseInt(p)+1);
    jQuery('#mec-ticket-price-dates-'+key+' .new_added').datepicker(
    {
        changeYear: true,
        changeMonth: true,
        dateFormat: datepicker_format,
        gotoCurrent: true,
        yearRange: 'c-3:c+5',
    });
}

function mec_ticket_price_remove(ticket_key, price_key)
{
    jQuery("#mec_ticket_price_raw_"+ticket_key+"_"+price_key).remove();
}