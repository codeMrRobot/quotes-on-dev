(function($) {

  var lastPage='';
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    $.ajax( {
      url: '/quotes_on_dev/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function( data ) {

        //returns first post from the array
        var post = data.shift();
        
        //replace current quote with the new quote
        $('.entry-content').html( post.content.rendered );
        $( '.entry-title' ).html( '&mdash; ' + post.title.rendered );

        //if source is available, output it, else output an empty string
        if ( post._qod_quote_source !== '' && post._qod_quote_source_url !== '') {
          $( '.source' ).html(', <a href="' + post._qod_quote_source_url + '">' + post._qod_quote_source + '</a>');
        
        } 
        else if (post._qod_quote_source !== '') {
          $( '.source' ).text(', ' + post._qod_quote_source);
        }

        else {
          $( '.source' ).text('');
        }

        history.pushState(null, null, post.link);
        console.log(post.link);
      }
    
    })
  
  })

  $('#submit-quote').on('click', function(event) {
    event.preventDefault();

    var author = $('#author').val();
    var quote = $('#quote').val();
    var source = $('#source').val();
    var url = $('#url').val();

    var data = {
        title: author,
        content: quote,
        _qod_quote_source: source,
        _qod_quote_source_url: url,
        status: 'publish'
    };

    $.ajax({
        method: 'POST',
        url: qod_vars.rest_url + 'wp/v2/posts',
        data: data,
        beforeSend: function ( xhr ) {
            xhr.setRequestHeader( 'X-WP-Nonce', qod_vars.wpapi_nonce );
        },
        success : function() {
            alert( 'Your quote has been successfully added!' );
        },
        fail : function() {
            alert( ' There was an error while adding your quote. ');
        }

    });

    $('#author').val('');
    $('#quote').val('');
    $('#source').val('');
    $('#url').val('');

});


})(jQuery);

  


