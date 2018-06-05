/* global api_vars: true */
/* eslint camelcase: off */

(function($) {

  var lastPage='';
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();
    $.ajax( {
      method:'GET',
      url: api_vars.root_url +'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    })
      .done(function( data ) {
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
        
        console.log(post);        
        var slug = post.slug;
        history.pushState(post.content,post.title,slug);
        

      
    
    })
  
  })

  $(window).on('popstate', function() {

    if (window.location.hash.indexOf('qm-overview') === 1) {
      return false;
    }else {
      window.location.replace(lastPage);
    }
  
  });


//**  Submit button **/

  $('#submit-quote').on('click', function(event) {
    event.preventDefault();

    var name = $('#quote-author').val();
    var contentForm = $('#quote-content').val();
    var sourceForm = $('#quote-source').val();
    var sourceUrl = $('#quote-source-url').val();

      $.ajax({
        method: 'post',
        url: api_vars.root_url + 'wp/v2/posts/',
        data: {
            title: name,
            content: contentForm,
            _qod_quote_source: sourceForm,
            _qod_quote_source_url: sourceUrl,
            status: 'pending'
        },
        
        beforeSend: function(xhr) {
          xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
        }
       
      }).success( function() {
        alert('thank you for submitting');
      }).always(function() {
        $('#submit-form').trigger('reset');
      
      }).fail(function() {
        alert('failed, please try again');
      })

    });
  
  })(jQuery);

  


