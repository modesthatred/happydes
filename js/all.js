jQuery(document).ready(function ($) {
    var body = $( 'body' );

    // for burger-menu
    $('.x-burger-menu').on('click', function() {
        $(this).toggleClass('header-bottom__burger-menu--active');
        $('.x-menu', $(this)).toggleClass('header-bottom__menu--active');
    });

    // for input-number

    $('input[type="tel"]').mask('+7 (999) 999-99-99');

    // for slider

    $('.x-slider').slick({
        infinite: true,
        speed: 300,
        variableWidth: false,
        draggable: true,
        useCSS: true,
        dots: true,
        arrow: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: 1
    });

    $('.x-resume-slider').slick({
        infinite: true,
        speed: 300,
        variableWidth: false,
        draggable: true,
        useCSS: true,
        dots: true,
        arrow: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: 1
    });

    // for less-more (project-page)
    var $projectInfoContext = $('.x-project-info');
    var moreHeight1 = $('.x-text', $projectInfoContext).outerHeight();
    var lessHeight1 = 210;
    $('.x-text', $projectInfoContext).css('height', lessHeight1);

    $('.x-more-less', $projectInfoContext).on('click', function() {
        var lessClass = 'project-description__button--less';
        var moreClass = 'project-description__button--more';
        var textClass = 'project-description__text--fade';
        toggleLessMore.call(this, $projectInfoContext, lessClass, moreClass, textClass, lessHeight1, moreHeight1);
    });

    // for less-more (resume-page)
    var $resumePageContext = $('.x-resume-first-screen');
    var moreHeight2 = $('.x-text', $resumePageContext).outerHeight();
    var lessHeight2 = $('.x-contact-item', $resumePageContext).outerHeight();
    $('.x-text', $resumePageContext).css('height', lessHeight2);

    $('.x-more-less', $resumePageContext).on('click', function() {
        var lessClass = 'resume-text-block__button--less';
        var moreClass = 'resume-text-block__button--more';
        var textClass = 'resume-text-block--fade';
        toggleLessMore.call(this, $resumePageContext, lessClass, moreClass, textClass, lessHeight2, moreHeight2);
    });

    function toggleLessMore(context, lessClass, moreClass, textClass, lessHeight, moreHeight) {
        $('.x-text', context).toggleClass(textClass);
        if ($(this).hasClass(lessClass)) {
            $(this).removeClass(lessClass);
            $(this).addClass(moreClass);
            $('.x-text', context).animate({
                height: lessHeight
            }, 500);
        } else {
            $(this).removeClass(moreClass);
            $(this).addClass(lessClass);
            $('.x-text', context).animate({
                height: moreHeight
            }, 500);
        }
    }

    // for instagram
    var token = '281996503.6885368.8a3f2b0d96be4e82a6807bf3eb5aaccd', // я уже давал ссылку чуть выше
        userId = 281996503, // ID пользователя, можно выкопать в исходном HTML, можно использовать спец. сервисы либо просто смотрите следующий пример :)
        count = 4; // ну это понятно - сколько фоток хотим вывести

    $.ajax({
        url: 'https://api.instagram.com/v1/users/' + userId + '/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token, count: count}, // передаем параметры, которые мы указывали выше
        success: function(result){
            for( x in result.data ){
                $('.x-instagram-list').append('<li class="instagram-list__item x-instagram-item" style="background-image: url('+result.data[x].images.low_resolution.url+')" data-url="'+result.data[x].link+'"></li>'); // result.data[x].images.low_resolution.url - это URL картинки среднего разрешения, 306х306
                // result.data[x].images.thumbnail.url - URL картинки 150х150
                // result.data[x].images.standard_resolution.url - URL картинки 612х612
                // result.data[x].link - URL страницы данного поста в Инстаграм
            }

            $('.x-instagram-item').on('click', function() {
                window.open($(this).data('url'));
                return false;
            });
        },
        error: function(result){
            console.log(result); // пишем в консоль об ошибках
        }
    });

    // filter for portfolio-page
    var $filterButton = $('.x-filter-button', $catalogContext);
    var $filterButtonAll = $('.x-filter-button-all', $catalogContext);
    var filterButtonActiveClass = 'ui-custom-button--transparent-active';
    var $catalogItem = $('.x-catalog-item', $catalogContext);
    var catalogItemActiveClass = 'catalog-list__item--active';

    checkFilterValues();

    $filterButtonAll.on('click', function() {
        $(this).addClass(filterButtonActiveClass);
        $filterButton.removeClass(filterButtonActiveClass);
        checkFilterValues();
    });

    $filterButton.on('click', function() {
        $(this).toggleClass(filterButtonActiveClass);
        if ($filterButton.hasClass(filterButtonActiveClass)) {
            $filterButtonAll.removeClass(filterButtonActiveClass);
        } else {
            $filterButtonAll.addClass(filterButtonActiveClass);
        }
        checkFilterValues();
    });

    function checkFilterValues() {
        var filterValues = [];
        if ($filterButtonAll.hasClass(filterButtonActiveClass)) {
            filterValues.push($filterButtonAll.data('text'));
        }

        $filterButton.each(function() {
            if ($(this).hasClass(filterButtonActiveClass)) {
                filterValues.push($(this).data('text'));
            }
        });

        if (filterValues[0] === 'все') {
            $catalogItem.addClass(catalogItemActiveClass);
            addMarginClass();
            return;
        } else {
            $catalogItem.removeClass(catalogItemActiveClass);
        }

        $catalogItem.each(function() {
            var type = $(this).data('type');

            for (var i = 0; i < filterValues.length; i++) {
                if (~type.indexOf(filterValues[i])) {
                    $(this).addClass(catalogItemActiveClass);

                    break;
                } else {
                    $(this).removeClass(catalogItemActiveClass);

                }
            }

        });
        addMarginClass();
    }

    function addMarginClass() {
        var marginClass = 'catalog-list__item--mr0';

        $('.' + catalogItemActiveClass).removeClass(marginClass);
        $('.' + catalogItemActiveClass).filter(function(index) {
            if ($(document).width() >= 1024) {
                return index % 3 === 2;
            } else {
                return index % 2 === 1;
            }

        }).addClass(marginClass);
    }

    // scroll for portfolio-page
    var $catalogContext = $('.x-catalog');
    var $catalogList = $('.x-catalog-list', $catalogContext);

    $catalogList.css('height', $(document).height() - $('.x-header').height() - $('.x-footer').outerHeight() - 30);
    var currentScroll = 0;
    var maxScroll = $catalogList.prop('scrollHeight') - $catalogList.height();

    $(window).on('wheel', function(e) {
        if (currentScroll >= 0 && currentScroll <= maxScroll) {
            currentScroll += e.originalEvent.deltaY;

            if (currentScroll > maxScroll) {
                currentScroll = maxScroll;
            } else if (currentScroll < 0) {
                currentScroll = 0;
            }
        }

        $catalogList.scrollTop(currentScroll);
    });
});
