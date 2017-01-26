// fuse.js search
var exampleList =  [
     {
        title: "Old Man's War",
        author: {
          firstName: "John",
          lastName: "Scalzi"
        }
     },
     {
        title: "The Lock Artist",
        author: {
          firstName: "Steve",
          lastName: "Hamilton"
        }
     },
     {
        title: "HTML5",
        author: {
          firstName: "Remy",
          lastName: "Sharp"
        }
     },
     {
        title: "Right Ho Jeeves",
        author: {
          firstName: "P.D",
          lastName: "Woodhouse"
        }
     },
     {
        title: "The Code of the Wooster",
        author: {
          firstName: "P.D",
          lastName: "Woodhouse"
        }
     },
     {
        title: "Thank You Jeeves",
        author: {
          firstName: "P.D",
          lastName: "Woodhouse"
        }
     },
     {
        title: "The DaVinci Code",
        author: {
          firstName: "Dan",
          lastName: "Brown"
        }
     },
     {
        title: "Angels & Demons",
        author: {
          firstName: "Dan",
          lastName: "Brown"
        }
     },
     {
        title: "The Silmarillion",
        author: {
          firstName: "J.R.R",
          lastName: "Tolkien"
        }
     },
     {
        title: "Syrup",
        author: {
          firstName: "Max",
          lastName: "Barry"
        }
     },
     {
        title: "The Lost Symbol",
        author: {
          firstName: "Dan",
          lastName: "Brown"
        }
     },
     {
        title: "The Book of Lies",
        author: {
          firstName: "Brad",
          lastName: "Meltzer"
        }
     },
     {
        title: "Lamb",
        author: {
          firstName: "Christopher",
          lastName: "Moore"
        }
     },
     {
        title: "Fool",
        author: {
          firstName: "Christopher",
          lastName: "Moore"
        }
     },
     {
        title: "Incompetence",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
     },
     {
        title: "Fat",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
     },
     {
        title: "Colony",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
     },
     {
        title: "Backwards, Red Dwarf",
        author: {
          firstName: "Rob",
          lastName: "Grant"
        }
     },
     {
        title: "The Grand Design",
        author: {
          firstName: "Stephen",
          lastName: "Hawking"
        }
     },
     {
        title: "The Book of Samson",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
     },
     {
        title: "The Preservationist",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
     },
     {
        title: "Fallen",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
     },
     {
        title: "Monster 1959",
        author: {
          firstName: "David",
          lastName: "Maine"
        }
     }
 ];

var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "title",
        "author.firstName"
    ]
};
var fuse = new Fuse(exampleList, options); // "list" is the item array
var $searchInput = $('.search_bar');
$searchInput.keypress(function(event){
    if (event.which == 13) {
        var result = fuse.search($searchInput.val());
        console.log(result);
        //reset
        $searchInput.val('');
        //prevent
        //http://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false
        return false;
    }
});


// search bar toogle
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
