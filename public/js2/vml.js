function searchBar_Toggle(){
    var $searchBtn = $('.search_btn');
    var $searchInput = $('.search_bar');
    $searchBtn.on('click', function(){
        $searchInput.focus();
    });
}

// index page nav toggle
function indexPageNav_toggle(){
    var $indexPage = $('.indexPage-nav');
    var $Btn = $('.menu_btn');
    $Btn.on('click', function(){
        $indexPage.toggleClass('invisible');
    });
}

// student member function
function student_touch() {
    var $student_card = $('.card');
    $student_card.on('mouseenter',function(){
        $(this).addClass('member_touch');
    });
    $student_card.on('mouseleave',function(){
        $(this).removeClass('member_touch');
    });
}


// sidebar btn function
function sidebar_btn_new(){
    var $menuList = $('.menuList');
    // first, set the display to none
    $menuList.css('display','none');

    // when you click the menu, you toggleClass
    // depending on the togglebtn, you change the display css
    var $menus = $('.menu')
        .on('click', function(){
            $(this).toggleClass('active');
            var $target = $(".item_" + $(this).text());
            $target.toggleClass('open');
            if($target.hasClass('open')){
                $target.css('display','unset');
            } else {
                $target.css('display','none');
            }
        });
}

// sidebar hide toggle
function sidebar_open() {
    var $sidebar = $('.sidebar');
    var $make_dimmer= $('.make_dimmer');
    // Pressing sidebar btn toggles(open/close) sidebar
    var $openBtn= $('.sidebar_btn')
        .on('click',function(){
            console.log('open');
            $sidebar.toggleClass('open');
            $make_dimmer.toggleClass('dimmer');
        });
    // when sidebar is open >> Pressing content wiil close sidebar
    $make_dimmer.on('click', function(){
        console.log('dimmer');
        $sidebar.toggleClass('open');
        $make_dimmer.toggleClass('dimmer');
    });
}

// IIFE
// this makes vidoe fluid-!
//
(function(){
    console.log('hi');
    // Youtube Fluid video
    // Find all YouTube videos
    // var $allVideos = $("iframe[src^='https://www.youtube.com']");
    var $allVideos = $("iframe");
    var $fluidEl = $(".videoWrapper");
    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {
        console.log('inside');
      $(this)
        .data('aspectRatio', this.height / this.width)
        // and remove the hard coded width/height
        .removeAttr('height')
        .removeAttr('width');
    });
    // When the window is resized
    $(window).resize(function() {
      var newWidth = $fluidEl.width();
      // Resize all videos according to their own aspect ratio
      $allVideos.each(function() {
        var $el = $(this);
        $el
          .width(newWidth)
          .height(newWidth * $el.data('aspectRatio'));
      });
    // Kick off one resize to fix all videos on page load
    }).resize();
}());


function init(){
    indexPageNav_toggle();
    student_touch();
    // sidebar_btn();
    sidebar_btn_new();
    sidebar_open();
    searchBar_Toggle();
}

// initiate all the function statements
init();
