;(function () {

    'use strict';



    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var getHeight = function() {
        var extraHeight = 0;

        if ( isMobile.any() ) extraHeight = 50;

        setTimeout(function(){
            $('#fh5co-main').stop().animate({
                'height': $('.fh5co-tab-content.active').height() + extraHeight
            });
        }, 200);
    };

    var pieChart = function() {
        $('.chart').easyPieChart({
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'butt',
            barColor: '#17e7a4',
            trackColor:	"#000000",
            size: 160,
            animate: 1000
        });
    };

    var tabContainer = function() {
        getHeight();
        $(window).resize(function(){
            getHeight();
        })
    };

    var tabClickTrigger = function() {
        $('.fh5co-tab-menu a').on('click', function(event) {
            if (event.target.hasAttribute("data-tab") || event.target.parentNode.hasAttribute("data-tab")) {

                event.preventDefault();
                var $this = $(this),
                    data = $this.data('tab'),
                    pie = $this.data('pie');

                // add/remove active class
                $('.fh5co-tab-menu li').removeClass('active');
                $this.closest('li').addClass('active');

                $('.fh5co-tab-content.active').addClass('animated fadeOutDown');

                setTimeout(function(){
                    $('.fh5co-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
                    $('.fh5co-tab-content[data-content="'+data+'"]').addClass('animated fadeInUp active');
                    getHeight();
                }, 500);

                if ( pie === 'yes' ) {
                    setTimeout(function(){
                        pieChart();
                    }, 800);
                }
            } else {
                return true;
            }
        })
    };

    // Document on load.
    $(function(){
        tabContainer();
        tabClickTrigger();

    });

    $("#contact-form").submit(function(e) {

        var url = "admin/api/home/contactus"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: $("#contact-form").serialize(), // serializes the form's elements.
            success: function(data)
            {
                alert("Success!");
                $('#name').val("");
                $('#email').val("");
                $('#message').val("");
            },
            error: function (data) {
                alert("Sorry something wrong! Please email to sadovnikov.igor.94@gmail.com")
            }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

    const currentYear = (new Date).getFullYear();

    $("#years-of-experience").html(currentYear - 2013);
    $("#current-year").html(currentYear);

}());
