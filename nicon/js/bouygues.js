
(function ($) {
    $(document).ready(function () {
       

 $("select").msDropdown({roundedBorder:false});


		
		
			// PAGE FILIALE DETAIL (Editoriale)					
		
			/* BX SLIDER  */
			$('.bxslider').bxSlider({
				
				//pager: false,
				infiniteLoop: false,
								
				nextSelector: '#slider-next',
				prevSelector: '#slider-prev',
				nextText: '<img src="/images/metiers-fleche-suivant.png" />',
				prevText: '<img src="/images/metiers-fleche-precedent.png" />',
			  
				pager: ($(".bxslider>li").length > 1) ? true: false,	
		
				slideWidth: 793, 
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				slideMargin: 0
				
			});
				
		
			// ACCORDION
		
			/*$( "#accordion" ).accordion({
				
				active: false,
				
				collapsible: true,
				heightStyle: "content",
				
				navigation: true,
				
				//header: "h3",
				
		        header: 'div.menuitem'
				 
			});*/
		
		
		
		
    });

	
	
	
   
})(jQuery);
