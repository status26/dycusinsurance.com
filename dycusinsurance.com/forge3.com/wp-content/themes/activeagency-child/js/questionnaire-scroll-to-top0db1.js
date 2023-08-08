jQuery(document).bind('gform_page_loaded', function(event, form_id, current_page){
	if( jQuery('div.aa-questionnaire').length ) {
	var qt = jQuery('div.aa-questionnaire').offset().top;
    jQuery(document).scrollTop(parseInt(qt)-50);
	}
});