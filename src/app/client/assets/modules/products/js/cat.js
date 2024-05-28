$(document).ready(function () {
    $('.time_coundown').each(function (index) {
        var time_end = $(this).attr('data-end');
        var id = $(this).attr('data-id');
        start(time_end, id);
    });
    $("#toc").toc({content: ".boxdesc", headings: "h2,h3,h4"});
    $(".button-select").click(function() {
        $('.fa-angle-down').toggleClass('active');
        $('.title-toc .title').addClass('display');
        $('.mr-1').toggleClass('active');
        $('.list-toc').slideToggle();
    });
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        if (scroll >= 700) {
            $("#left1").addClass("fixtoc");
            $('.fa-angle-down').removeClass('active');
            $('.tablecontent').removeClass('none');
            $(".fa-angle-down").addClass("none");
            $(".mr-1").addClass("none");

        }
        if (scroll < 700) {
            $("#left1").removeClass("fixtoc");
            $('.tablecontent').addClass('none');
            $('.fa-angle-down').removeClass('none');
            $(".mr-1").removeClass("none");
        }
        if (scroll >= 50) {
            $(".breadcrumbs").addClass("fix-breadcums");
        }
        if (scroll < 50) {
            $(".breadcrumbs").removeClass("fix-breadcums");
        }
        if (scroll >= 200) {
            $(".filtersecond").addClass("fix-filter");
        }
        if (scroll < 200) {
            $(".filtersecond").removeClass("fix-filter");
        }
    });

    $('#toc a').on('click',function (e) {
        e.preventDefault();
        let target = $(this).attr('href');
        target = target.replace(/\./g,'\\.');
        $('html, body').animate({
            'scrollTop': $(target).offset().top - 60
        }, 800);
        $('.boxdesc').addClass('display');
    });

    $('.img_org').each(function (index) {
        let w = $(this).width();
        let h = $(this).height();
        $(this).attr('width',w);
        $(this).attr('height',h);
    });

    $('.cat_top').each(function (index) {
        var id_block = $(this).attr('data-id');
        // alert(id_block);
        $('.croll_top_' + id_block).click(function () {
                $('html, body').animate({
                    scrollTop: $("#list_gaming_" + id_block).offset().top - 70
                }, 1500);
            });
    });
    $('.list_banner').owlCarousel({
        margin: 0,
        loop: true,
        nav: true,
        dots: false,
        // lazyLoad: true,
        // responsiveClass: true,
        autoplay:true,
        // smartSpeed: 2000,
        // autoplayTimeout: 400,
        responsive: {
            0: {
                items: 1,
                margin: 0,
                // smartSpeed: 500,
            },
            768: {
                items: 1,
                margin: 0,
                // smartSpeed: 500,
            },
            1000: {
                items: 2,
                margin: 20,
                // smartSpeed: 2000,
            },
            1600: {
                items: 2,
                margin: 20,
                // smartSpeed: 2000,
            }
        }
    });
    $(".list_banner .owl-prev").html('');
    $(".list_banner .owl-next").html('');

    if ($("#boxdesc").height() < 500) {
        $(".gradient").css("display", "none");
        $(".details_click.clickmore").css("display", "none")
    }
    $("#boxdesc").css("max-height", "500px");

    $(".clickmore").click(function () {
        var id = $(this).attr("data-id");
        var less = $(this).attr("data-class");
        if (less == 1) {
            $("#" + id).height("auto").css('max-height','unset');
            $(this).html("Thu gọn <i class=\"fa fa-angle-double-up\"></i>");
            $(this).removeAttr("data-class");
            $('.gradient').css('display','none');
        }
        else {
            var height = $("#" + id).attr("data-height");
            $("#" + id).height(height).css('max-height','500');
            $(this).html("Xem thêm <i class=\"fa fa-angle-double-down\"></i>");
            $(this).attr("data-class", "1");
            $('.gradient').css('display','block');
        }

    });

    $('#keyword_compare').on('keyup',debounce(function(){
        let key = $(this).val();
        let name = $(this).attr('data-name');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/index.php?module=products&view=cat&raw=1&task=ajax_compare_search',
            data: {key,name},
            success: function (data) {
                if(data.error === false){
                    $('.list-compare-search').html(data.html).addClass('active');
                } else{
                    if ($('.alert_error').css('display') == 'none')
                        $('.alert_error').html(data.message).fadeIn().delay(1500).fadeOut();
                }
            }
        });
    }));
});

function debounce(func, wait = 300, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

$(document).on('click','.a_compare',function(){
    if($(this).attr('data-add') == 1){
        if ($('.alert_error').css('display') == 'none')
            $('.alert_error').html('Đã thêm so sánh').fadeIn().delay(1500).fadeOut();
        return;
    }
    let name = $(this).attr('data-name');
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/index.php?module=products&view=cat&raw=1&task=ajax_compare',
        data: {
            id,
            name
        },
        success: function (data) {
            if(data.error === false){
                if(data.cancel == 1){
                    if ($('.alert_error').css('display') == 'none')
                        $('.alert_error').html(data.message).fadeIn().delay(1500).fadeOut();
                }
                $('.compare-container .grid-container').html(data.html);
                $('.btn-compare').removeClass('active');
                $('.compare-container').addClass('active');
                $('.compare'+id).each(function(i,el){
                    $(el).attr('data-add',1);
                    let text =  $(el).children('span').html();
                    if(text === 'So sánh')
                        $(el).children('span').html('Đã thêm so sánh');
                })
                $('#total-compare').html(data.total);
                
            } else{
                if ($('.alert_error').css('display') == 'none')
                    $('.alert_error').html(data.message).fadeIn().delay(1500).fadeOut();
            }
        }
    });
});

$(document).on('click','.btn-compare-less',function(){
    $('.compare-container').toggleClass('active');
    $('.btn-compare').toggleClass('active');
});

$(document).on('click','.btn-compare',function(){
    $(this).toggleClass('active');
    $('.compare-container').toggleClass('active');
    $('.btn-compare').removeClass('active');
    $('.compare-container').addClass('active');
});

$(document).on('click','.remove_compare',function(){
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/index.php?module=products&view=cat&raw=1&task=ajax_remove_compare',
        data: {
            id
        },
        success: function (data) {
            if(data.error === false){
                $('.compare-container .grid-container').html(data.html);
                $('.btn-compare').removeClass('active');
                $('.compare-container').addClass('active');
                $('#total-compare').html(data.total);
                $('.compare'+id).each(function(i,el){
                    $(el).attr('data-add',0).children('span').html('So sánh');
                })
            } else{
                if ($('.alert_error').css('display') == 'none')
                    $('.alert_error').html(data.message).fadeIn().delay(1500).fadeOut();
            }
        }
    });
});

$(document).on('click','.remove_all_compare',function(){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/index.php?module=products&view=cat&raw=1&task=ajax_remove_all_compare',
        success: function (data) {
            if(data.error === false){
                $('.compare-container .grid-container').html(data.html);
                $('.btn-compare').removeClass('active');
                $('.compare-container').addClass('active');
                $('#total-compare').html(data.total);
                data.list.forEach(function(value,index){
                    $('.compare'+value).each(function(i,el){
                        $(el).attr('data-add',0).children('span').html('So sánh');
                    })
                })
            } else{
                if ($('.alert_error').css('display') == 'none')
                    $('.alert_error').html(data.message).fadeIn().delay(1500).fadeOut();
            }
        }
    });
});

$(function () {
    listproductpage2.init();
});
listproductpage2 = (function () {


    function init() {
        handler();

    }

    function handler() {
        // $.when($('.list-product-hot').masonry({
        //     gutterWidth: 5,
        //     columnWidth: 1,
        //     itemSelector: '.product'
        // })).done(function (v) {
        //     ReloadListUI();
        // });
        $(document).on("click",".load_more", function(){
            var url_root = $("#root").val();
            var filter = $("#filter").val();
            var order = $("#order").val();
            var cid = $("#category_id").val();
            // Start Masonry
            // jQuery('.list-product-hot').masonry({
            //     gutterWidth: 5,
            //     columnWidth: 1,
            //     itemSelector: '.product'
            // });

            var _self = $(this);
            _self.hide();
            _self.parent().addClass("loading");
            $.get(url_root + "/index.php?module=products&view=cat&task=fetch_pages&raw=1", {
                pagecurrent: $(this).attr('data-pagecurrent'),
                filter: filter,
                cid: cid,
                order: order
            }, function (data) {
                data = JSON.parse(data);
                // alert(data);
                $element = $(data.content);
                // console.log(data.next);
                // $('.list-product-hot').append($element).masonry('appended', $element);
                $('.list-product-hot').append($element);
                if (data.next) {
                    _self.attr('data-pagecurrent', parseInt(data.totalCurrent));
                    _self.attr('data-nextpage', parseInt(data.nextpage));
                    _self.show();
                    _self.parent().removeClass("loading");
                } else {
                    _self.parent().remove();
                }
                $(".list-product-hot img").lazyLoadXT();
            });
        });

        // $('.load_more').click(function () {
        //     var url_root = $("#root").val();
        //     var filter = $("#filter").val();
        //     var order = $("#order").val();
        //     var cid = $("#category_id").val();
        //     // Start Masonry
        //     // jQuery('.list-product-hot').masonry({
        //     //     gutterWidth: 5,
        //     //     columnWidth: 1,
        //     //     itemSelector: '.product'
        //     // });
        //     var _self = $(this);
        //     _self.hide();
        //     _self.parent().addClass("loading");
        //     $.get(url_root + "/index.php?module=products&view=cat&task=fetch_pages&raw=1", {
        //         pagecurrent: $(this).attr('data-pagecurrent'),
        //         filter: filter,
        //         cid: cid,
        //         order: order
        //     }, function (data) {
        //         data = JSON.parse(data);
        //         // alert(data);
        //         $element = $(data.content);
        //         console.log(data.next);
        //         // $('.list-product-hot').append($element).masonry('appended', $element);
        //         $('.list-product-hot').append($element).masonry('appended', $element);
        //         if (data.next) {
        //             _self.attr('data-pagecurrent', parseInt(data.totalCurrent));
        //             _self.attr('data-nextpage', parseInt(data.nextpage));
        //             _self.show();
        //             _self.parent().removeClass("loading");
        //         } else {
        //             _self.parent().remove();
        //         }
        //
        //     });
        // });

    }

    return {
        init: init,
    };
})();

function ReloadListUI() {
    $('.product').each(function (i, e) {
        if ($(e).position().top == 0) {
            $(e).addClass('border-top');
        }
    });
}

$('.c-view-more .load_more1').click(function () {
// alert(1);
    var pagecurrent = $(this).attr("data-pagecurrent");
    var nextpage = $(this).attr("data-nextpage");
    var limit = $(this).attr("limit");
    // var type_id = $(this).attr("type_id");
    // var type_alias = $(this).attr("type_alias");
    // var start = $(this).attr("data-start");
    // var end = $(this).attr("data-end");
    // var id = $(this).attr("data-id");
    // var dclass = $(this).attr("data-class");
    // var col = $(this).attr("data-col");
    // var col2 = $(this).attr("data-col2");
    // đưa chuổi lấy về sang dạng số
    pagecurrent = Number(pagecurrent);
    nextpage = Number(nextpage);

    $(this).attr("data-pagecurrent", nextpage);
    $(this).attr("data-nextpage", nextpage + 1);
    // alert(limit);
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/index.php?module=products&view=cat&raw=1&task=loadmore_1',
        data: '&pagecurrent=' + pagecurrent + '&limit=' + limit,
        success: function (html) {
            console.log(html);
            // console.log(html.length);
            if (html.length == '0') {
                // alert(1);
                alert('Đã hết danh mục');
                $('.c-view-more').hide();
            } else
                $('.is-hotel.hotel_more').append(html);
        }
    });
})

function start(time_end, id) {
    // Set the date we're counting down to

    var countDownDate = new Date(time_end).getTime();
    // alert(countDownDate);
    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        $("#demnguoc_" + id).html(days + "<font> ngày</font>: " + hours + ":"
            + minutes + ":" + seconds);
        if (days > 0)  {
            $("#demnguoc_"+id).html(days + " ngày ");
        }
        if (days == 0) {
            $("#demnguoc_"+id).html(hours + " giờ "
                + minutes + " phút:" + seconds);
        }
        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            $("#demnguoc_" + id).html("Hết giờ khuyến mại");
        }
    }, 1000);
}

// window.onload = init;


$(".star-detail").raty({
    halfShow: !0,
    readOnly: !0,
    score: function () {
        return $(this).attr("data-rating");
    },
    starOff: "templates/default/images/star-empty.png",
    starOn: "templates/default/images/star-fill.png",
    starHalf: "templates/default/images/star-half.png",
});
$(".col-rate .star-detail").raty({
    halfShow: !0,
    readOnly: !0,
    score: function () {
        return $(this).attr("data-rating");
    },
    starOff: "/templates/default/images/star-empty-small.png",
    starOn: "/templates/default/images/star-fill-small.png",
    starHalf: "templates/default/images/star-half.png",
});
$(".rating-value").raty({
    half: !1,
    scoreName: "value",
    starOff: "templates/default/images/star-empty.png",
    starOn: "templates/default/images/star-fill.png",
    starHalf: "templates/default/images/star-half.png",
});
$(".rating-quantity").raty({
    half: !1,
    scoreName: "quantity",
    starOff: "templates/default/images/star-empty.png",
    starOn: "templates/default/images/star-fill.png",
    starHalf: "templates/default/images/star-half.png",
});
$(".rating-price").raty({
    half: !1,
    scoreName: "price",
    starOff: "templates/default/images/star-empty.png",
    starOn: "templates/default/images/star-fill.png",
    starHalf: "templates/default/images/star-half.png",
});
$("document").ready(function () {
    $(".view_store").click(function () {
        $("html, body").animate({scrollTop: $("#buy-now").offset().top}, 1e3);
    });
    var t = $("#alert_info").val();
    (alert_info1 = t ? JSON.parse(t) : []);
    $("#submitbt").click(function () {
        return (
            !!notEmpty("value", "Bạn chưa chọn giá trị nhận xét") &&
            !!notEmpty("full_rate", "Bạn chưa nhập nhận xét") &&
            !!notEmpty("name_rate", "Bạn chưa nhập họ tên") &&
            !!notEmpty("phone_rate", "Bạn chưa nhập số điện thoại") &&
            !!isPhone("phone_rate", "Số điện thoại không hợp lệ") &&
            !!lengthMin("phone_rate", 10, "Số điện thoại phải là 10 số") &&
            !!lengthMax("phone_rate", 10, "Số điện thoại phải là 10 số") &&
            void document.comment_add_form.submit()
        );
    });
    $("#total_page").val(), $("#record_id").val(), $("#url_current").val();
    $(".view-more-cm").click(function () {
        (id = $("#prd_id").val());
        $.ajax({
            type: "GET",
            dataType: "html",
            url: "/index.php?module=products&view=product&raw=1&task=all_conment",
            data: "id=" + id,
            success: function (t) {
                $("#list-comment").html(t), $(".view-more-cm").hide();
            },
        });
    });
    $("#btnn").click(function () {
        checkFormsubmit() && (document.contact1111.submit(), $("#preloader").show());
    });
});