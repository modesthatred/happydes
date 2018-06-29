$(document).ready(function () {
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
        prevArrow: '<div class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="16.813" height="31.91" viewBox="0 0 16.813 31.91"><path d="M.967 31.907c-.253 0-.506-.097-.7-.292-.386-.39-.386-1.02 0-1.41l14.148-14.252L.268 1.7C-.12 1.313-.12.68.268.29c.386-.388 1.013-.388 1.4 0L16.514 15.25c.386.39.386 1.02 0 1.41L1.667 31.615c-.193.195-.446.292-.7.292z" class="cls-1"/></svg></div>',
        nextArrow: '<div class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="16.813" height="31.91" viewBox="0 0 16.813 31.91"><path d="M.967 31.907c-.253 0-.506-.097-.7-.292-.386-.39-.386-1.02 0-1.41l14.148-14.252L.268 1.7C-.12 1.313-.12.68.268.29c.386-.388 1.013-.388 1.4 0L16.514 15.25c.386.39.386 1.02 0 1.41L1.667 31.615c-.193.195-.446.292-.7.292z" class="cls-1"/></svg></div>',
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: 1,
        responsive: [{
          breakpoint: 1300,
          settings: {
              arrows: false
          }
        }]
    });

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
});
