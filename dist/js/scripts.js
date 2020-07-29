$(document).ready(function() {
    $('.grid').isotope({
        layoutMode: 'packery',
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: 455
        },
        packery: {
            gutter: 10
        }
    });

    $('select').styler();

    $('.image-link').magnificPopup({
        type:'image',
        gallery:     {
            enabled : true
        },
        removalDelay : 300,
        mainClass : 'mfp-fade'
    });

    $('.flowing-scroll').on( 'click', function(){
        var el = $(this);
        var dest = el.attr('href');
        if(dest !== undefined && dest !== '') {
            $('html').animate({
                    scrollTop: $(dest).offset().top
                }, 1000
            );
        }
        return false;
    });
});


