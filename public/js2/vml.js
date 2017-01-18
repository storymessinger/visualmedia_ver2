// index page nav toggle
function indexPageNav_toggle(){
    console.log('aaaaa');
    var $indexPage = $('.indexPage-nav');
    var $Btn = $('.indexPage-nav-btn');
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


// Youtube Fluid video
// Find all YouTube videos
var $allVideos = $("iframe[src^='//www.youtube.com']");
var $fluidEl = $(".fluidEl");
// Figure out and save aspect ratio for each video
$allVideos.each(function() {
    console.log('hi');
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



function init(){
    indexPageNav_toggle();
    student_touch();
    sidebar_btn();
    sidebar_open();
}

// initiate all the function statements
init();
