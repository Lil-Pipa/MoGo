$(function(){
    
    /* fixed header */
    var menu = $("#menu"),
        headerH = $("#header").innerHeight(),
        scrollOffset = $(window).scrollTop();
        
    checkScroll(scrollOffset);

    $(window).on("scroll", function(){
        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });    

    function checkScroll(scrollOffset){
        if ( scrollOffset >= headerH ){
            menu.addClass("fixed");
        }
        else{
            menu.removeClass("fixed");
        }
    }



    /* toggle menu */

    var navList = $("#nav-list"),
        nav = $("#nav"),
        icon = $("#nav__icon");
        windowWidth = $(window).width();

    menuType();

    $(window).on('resize', function(){
        menuType();
    });

    function menuType(){
        windowWidth = $(window).width();

        if( windowWidth <= 770 ){
            $(navList).removeClass("nav");
            $(navList).addClass("nav--mobile");
            $(nav).addClass("nav-toggle");
            $(icon).addClass("nav__icon--mobile");
        }
        else{            
            $(navList).addClass("nav");
            $(navList).removeClass("nav--mobile");
            $(nav).removeClass("nav-toggle");
            $(icon).removeClass("nav__icon--mobile");
        }
    }
    /* скрываем меню после клика */
    $('#nav-list a').on('click', function(){
        $('#nav-toggle__check').prop('checked', false);
    });


    /* theme changer */
    let page = document.querySelector(".page");

    let themeButton = document.querySelector('.theme-button');
    themeButton.onclick = function() {
        page.classList.toggle('light-theme');
        page.classList.toggle('dark-theme');
    };


    /* active nav */
    $("#nav-list a").on("click", function(){

        var $this = $(this);
        
        $("#nav-list a").removeClass("active");
        $this.addClass("active");

    })

    /* подсвечиваем ссылку в меню при прокрутке */
    jQuery(window).scroll(function(){
        var $sections = $('section');
        $sections.each(function(i, el){
            var top  = $(el).offset().top-170;
            var bottom = top +$(el).height()+500;
            var scroll = $(window).scrollTop();
            var id = $(el).attr('id');
            if( scroll > top && scroll < bottom){
                $('a.active').removeClass('active');
                $('a[href="#'+id+'"]').addClass('active');

            }
        });
    });


    /* slider */
    var slideNow = 1,
        slideCount = $('#slidewrapper').children().length, /* количество элементов слайдера */
        translateWidth = 0, /* расстояние, на которое смещается наш slidewrapper */
        slideInterval = 5000; /* интервал прокрутки в мс */


    /* далее */
    function nextSlide() {
        if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
            $('#slidewrapper').css('transform', 'translate(0, 0)');
            slideNow = 1;
        } else {
            translateWidth = -$('#viewport').width() * (slideNow);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow++;
        }
    }

    /* назад */
    function prevSlide() {
        if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
            translateWidth = -$('#viewport').width() * (slideCount - 1);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = slideCount;
        } else {
            translateWidth = -$('#viewport').width() * (slideNow - 2);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow--;
        }
    }

    $('#next-btn').click(function() {
        nextSlide();
    });

    $('#prev-btn').click(function() {
        prevSlide();
    });

    /* после загрузки документа вызываем функцию следующий слайдер с интервалом */
    $(document).ready(function () {
        setInterval(nextSlide, slideInterval);
    });

    
});

