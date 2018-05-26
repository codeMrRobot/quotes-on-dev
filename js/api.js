(function( $ ) {
  var $content = $('.hentry');
  $('#new-quote-button').on('click', function(e){
    e.preventDefault();
  
     $content.empty();
     $.ajax({
        method: 'GET',
        url: api_vars.root_url + '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1' 
     })
     .done(function(data)) {
       
      

     });
  
})(jQuery);

  


