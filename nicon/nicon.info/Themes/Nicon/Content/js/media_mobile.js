(function($) {
  $(document).ready(function(){
      /*filtre theme*/
      $('#edit-field-th-me-tid-wrapper .views-widget').hide();
      $('#edit-field-th-me-tid-wrapper label').addClass('media-collapsible');
      
      $('#edit-field-th-me-tid-wrapper label').click(function(){
          if($(this).hasClass('active')){
            $(this).next('.views-widget').slideUp(500);
            $(this).removeClass('active'); 
          }
          else{
            $(this).next('.views-widget').slideDown(500);
            $(this).addClass('active');
          }
      });
      /*filtre type*/
      $('#edit-field-type-m-dia-value-wrapper .views-widget').hide();
      $('#edit-field-type-m-dia-value-wrapper label').addClass('media-collapsible');
      
      $('#edit-field-type-m-dia-value-wrapper label').click(function(){
          if($(this).hasClass('active')){
            $(this).next('.views-widget').slideUp(500);
            $(this).removeClass('active'); 
          }
          else{
            $(this).next('.views-widget').slideDown(500);
            $(this).addClass('active');
          }
      });
      
  });
})(jQuery);
