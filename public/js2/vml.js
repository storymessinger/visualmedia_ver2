// sidebar btn function
function sidebar_btn() {
    var $item_projects = $('.item_projects');
    var $item_publications= $('.item_publications');
        // first, set the display to none
    $item_projects.css('display','none');
    $item_publications.css('display','none');

    // when you click the btn, you toggleClass
    // depending on the toggle, you change the display css
    var $btn_projects = $('.projects')
        .on('click', function(){
            $('.projects').toggleClass('active');
            $item_projects.toggleClass('open');
            if($item_projects.hasClass('open')){
                $item_projects.css('display','unset');
            } else {
                $item_projects.css('display','none');
            }
        });
    var $btn_publications = $('.publications')
        .on('click', function(){
            $('.publications').toggleClass('active');
            $item_publications.toggleClass('open');
            if($item_publications.hasClass('open')){
                $item_publications.css('display','unset');
            } else {
                $item_publications.css('display','none');
            }
        });
}

// sidebar hide toggle
function sidebar_hide() {
    var $sidebar = $('.sidebar');
    var $hideBtn= $('.sidebar_hide_btn')
        .on('click',function(){
            $sidebar.toggleClass('hide');
        });
}

// Very nice implementation of deboucing. Wihtout this, a function such as resize is run a lot of times within a short time
// By implementing this function factory, you do not have to keep track of global timeoutID's, because this ID is within this scope
// http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
function debouncer( func , in_timeout ) {
   var timeoutID;
   var timeout = in_timeout || 200;
   return function () {
      var scope = this;
      var args = arguments;
      console.log(Array.prototype.slice.call( args ));
      clearTimeout( timeoutID );
      timeoutID = setTimeout( function () {
          func.apply( scope , Array.prototype.slice.call( args ) );
      } , timeout );
  };
}

// Automatically resize the sidebar when window widht goes below 992px(sm-md)
$(window).resize(debouncer(function() {
// $(window).on('resize', debouncer(function() {  -- also possible
    var $sidebar = $('.sidebar');
    if($(window).width() < 991) {
        $sidebar.addClass('hide');
    }else{
        $sidebar.removeClass('hide');
    }
    console.log('loaded');
}, 300));


sidebar_btn();
sidebar_hide();
