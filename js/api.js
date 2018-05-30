(function($) {
  $('#new-quote-button').on('click', function(event) {
      event.preventDefault();
      
      /**
       * source https://css-tricks.com/using-the-wp-api-to-fetch-posts/ 05/26/2018
       */
      $.ajax({
          method: 'GET',
          url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
          success: function ( data ) {
              var quote = data[0].content.rendered;
              var author = data[0].title.rendered;
              var quote_Source = data[0]._qod_quote_source;
              var quote_Source_url = data[0]._qod_quote_source_url;

              $( '#quote-author' ).text(author);
              $( '#quote-text' ).html(quote);

              if (quote_Source) {
                  if (quote_Source_url) {
                      $('#quote-source').html(', <a href="' + quote_Source_url + '" target="_blank">' + quote_Source + '</a>');
                  }
                  else {
                      $('#quote-source').text(', ' + quote_Source);
                  }
              }
              else {
                  $('#quote-source').html('');
              }
          },
          cache: false
      });

  });

  





})(jQuery);

  


