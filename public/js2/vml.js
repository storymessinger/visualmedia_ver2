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

student_touch();

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

sidebar_btn();
sidebar_open();
