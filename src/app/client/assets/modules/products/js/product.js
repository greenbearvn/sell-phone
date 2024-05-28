var proLightSlider;

function start(t) {
    var e = new Date(t).getTime(),
        a = setInterval(function () {
            var t = new Date().getTime(),
                i = e - t,
                r = Math.floor(i / 864e5),
                o = Math.floor((i % 864e5) / 36e5),
                n = Math.floor((i % 36e5) / 6e4),
                l = Math.floor((i % 6e4) / 1e3);
            $("#demnguoc").html("<span class='number_'>" + r + "</span> <span class='number_'>" + o + "</span> <span class='number_'>" + n + "</span> <span class='number_'>" + l + "</span>"),
            i < 0 && (clearInterval(a), $("#demnguoc").html("Hết giờ khuyến mại"));
        }, 1e3);
}

function loadcity(t) {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "/index.php?module=api&view=product&raw=1&task=ajax_set_city1",
        data: {id: t},
        success: function (t) {
            location.reload();
        },
    });
}

function active_color() {
    var t = $(".products_type .active").attr("products_type_id");
    let type_slider = $('#type_slider').val();

    if (type_slider != 1) {

        $("#products_type_input").val(t), (color_id = "type-" + t), $("." + color_id).show(), $(".color_rm").removeClass("active"), $("." + color_id).addClass("active"), proLightSlider.goToSlide($(".active").index());
    }
}

function order(t, e) {
    $("html,body").animate({scrollTop: "0px"}, 500);
    var a = t,
        i = ((e = e), $("#quantity").val()),
        r = $("#price_input").val(),
        o = $("#warranty_input").val(),
        n = $("#list_gift").val(),
        s = $("#id_aspect").val(),
        l = $("#id_sub").val();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/index.php?module=products&view=cart&raw=1&task=buynow",
        data: "quantity=" + i + "&id=" + a + "&price=" + r + "&warranty=" + o + "&id_sub=" + l + "&id_store=" + e + "&list_gift=" + n + "&id_aspect=" + s + "&list_gift_qd=",
        success: function (t) {
            window.location.replace(t.link);
        },
    });
}

function ajax_pop_cart() {
    $("#close-cart").click(function () {
        $(".wrapper-popup-2").hide(), $(".wrapper-popup").hide(), $(".full").hide();
    });
}

function scrollTop(t) {
    if (!t) return !1;
    $(t).focus();
    var e = $(t).offset();
    $("html, body").animate({scrollTop: e.top}, "slow");
}

function checkFormsubmit() {
    return (
        !!notEmpty("name_contact", "Vui lòng nhập họ tên") &&
        !!notEmpty("phone_contact", "Vui lòng nhập số điện thoại") &&
        !!isPhone("phone_contact", "Số điện thoại không hợp lệ") &&
        !!lengthMin("phone_contact", 10, "Số điện thoại phải là 10 số") &&
        !!lengthMax("phone_contact", 10, "Số điện thoại phải là 10 số") &&
        !!notEmpty("email_contact", "Vui lòng nhập email") &&
        !!emailValidator("email_contact", "Email không đúng định dạng")
    );
}

function cbyuy(t, e, a) {
    var i = "#item_" + t,
        r = $("#list_product_add").val(),
        o = $("#total_price").val(),
        n = $("#total_price_old").val();
    $(i).prop("checked")
        ? ($("#list_product_add").val(r + t + ","),
            (tt = parseInt(o) + parseInt(e)),
            $("#total_price").val(tt),
            (document.getElementById("tgb").innerHTML = fomatPrice(tt)),
            (tt_old = parseInt(n) + parseInt(a)),
            $("#total_price_old").val(tt_old),
            (document.getElementById("tgb_old").innerHTML = fomatPrice(tt_old)))
        : ($("#list_product_add").val(r.replace("," + t, "")),
            (tt = parseInt(o) - parseInt(e)),
            $("#total_price").val(tt),
            (document.getElementById("tgb").innerHTML = fomatPrice(tt)),
            (tt_old = parseInt(n) - parseInt(a)),
            $("#total_price_old").val(tt_old),
            (document.getElementById("tgb_old").innerHTML = fomatPrice(tt_old)));
}

function fomatPrice(t) {

    for (var e = (e = t.toString()).toString(), a = ""; parseInt(e) > 999;) (a = "." + e.slice(-3) + a), (e = e.slice(0, -3));
    return (e += a), (e += "đ");
}

function instalment(t) {
    let aspect = $('#id_aspect').val();
    if (aspect == '') {
        aspect = 0;
    }
    var e = $("#warranty_input").val(),
        a = $("#price_input").val();
    "" == e && (e = 0);
    var i = $("#instalment").val();
    "" != i && (t += "&sid=" + i + "&price=" + a + "&warranty=" + e + "&m=card&aspect=" + aspect), (window.location.href = t);
}

function instalment1(t) {
    let aspect = $('#id_aspect').val();
    if (aspect == '') {
        aspect = 0;
    }
    var e = $("#warranty_input").val(),
        a = $("#price_input").val();
    "" == e && (e = 0);
    var i = $("#instalment").val();
    "" != i && (t += "&sid=" + i + "&price=" + a + "&warranty=" + e + "&m=company&aspect=" + aspect), (window.location.href = t);
}

function init() {
    for (var t = document.getElementsByTagName("iframe"), e = 0; e < t.length; e++) t[e].getAttribute("data-src") && t[e].setAttribute("src", t[e].getAttribute("data-src"));
}

$(document).ready(function () {

    start($("#demnguoc").attr("data-end"));
    $("#toc").toc({content: ".boxdesc", headings: "h2,h3,h4"});
    $(".button-select").click(function () {
        $(".fa-angle-down").toggleClass("active"), $(".title-toc .title").addClass("display"), $(".mr-1").toggleClass("active"), $(".list-toc").slideToggle();
    });
    $(window).scroll(function () {
        var t = $(window).scrollTop();
        t >= 700 && ($("#left1").addClass("fixtoc"), $(".fa-angle-down").removeClass("active"), $(".tablecontent").removeClass("none"), $(".fa-angle-down").addClass("none"), $(".mr-1").addClass("none")),
        t < 700 && ($("#left1").removeClass("fixtoc"), $(".tablecontent").addClass("none"), $(".fa-angle-down").removeClass("none"), $(".mr-1").removeClass("none"));
    });
    $("#toc a").on("click", function (t) {
        t.preventDefault();
        let e = $(this).attr("href");
        (e = e.replace(/\./g, "\\.")), $("html, body").animate({scrollTop: $(e).offset().top - 60}, 800), $(".boxdesc").addClass("display");
    });

    let type_slider = $('#type_slider').val();
    if (type_slider != 1) {
        $("#imageGallery").lightGallery(),
            (proLightSlider = $("#imageGallery").lightSlider({
                gallery: !0,
                item: 1,
                thumbItem: 6,
                slideMargin: 0,
                auto: !1,
                loop: !0,
                responsive: [
                    {breakpoint: 800, settings: {item: 1, thumbItem: 5}},
                    {breakpoint: 480, settings: {item: 1, thumbItem: 6}},
                ],
                onSliderLoad: function () {
                    $("#imageGallery").removeClass("cS-hidden");
                },
            })),
        0 != $("#products_type_input").val() && active_color();
        var t = $("#picture").height();
    }
    $(".details_top").height(), $("#button-cart").height(), $("#tuvan").height();
    $(".clickmore").click(function () {
        var t = $(this).attr("data-id");
        if (1 == $(this).attr("data-class")) $("#" + t).height("auto"), $(this).html("Thu gọn"), $(this).removeAttr("data-class"), $(".boxdesc").removeClass("display");
        else {
            var e = $("#" + t).attr("data-height");
            $("#" + t).height(e), $(this).html("Xem thêm"), $(this).attr("data-class", "1");
        }
    });
    $(".list_pagkage").owlCarousel({
        margin: 0,
        nav: !0,
        dots: !1,
        lazyLoad: !0,
        responsive: {0: {items: 2}, 768: {items: 3}, 1000: {items: 4}, 1600: {items: 4}}
    }),
        $(".list_pagkage .owl-prev").html(""),
        $(".list_pagkage .owl-next").html(""),
        $(".clickmore1").click(function () {
            var t = $(this).attr("data-id");
            if (1 == $(this).attr("data-class")) $("#" + t).height("auto"), $(this).html("Thu gọn"), $(this).removeAttr("data-class");
            else {
                var e = $("#" + t).attr("data-height");
                $("#" + t).height(e), $(this).html("Xem thêm"), $(this).attr("data-class", "1");
            }
        });

    // let id_aspect = $('#id_aspect').val();
    // if (!!id_aspect) {
    $('#aspect').change(function () {
        let calculate = $("option:selected", this).attr('data-calculate');
        let priceaspect = Number($("option:selected", this).attr('data-priceaspect'));
        let id = $(this).val();
        let price = Number($('.products_type_item.active').attr('data-price-sub'));
        let price1 = Number($('.products_type_item.active').attr('data-price-sub'));
        let warranty = Number($('#warranty_input').val());
        let warranty_price = 0;
        if (!!warranty) {
            $("#warranty_input_compare").val(warranty);
            warranty_price = Number($('.warranty_item.active').attr('price'));
        }
        if (calculate == 1) {
            price = price + priceaspect + warranty_price;
            price1 = price1 + priceaspect;
        } else {
            price = price - priceaspect + warranty_price;
            price1 = price1 - priceaspect;

        }

        $('.price_item_sub').each(function () {
            let id_sub = $(this).attr('data-id');
            let price_sub = Number($(this).attr('data-item-price'));
            if (calculate == 1) {
                price_sub = price_sub + priceaspect;
            } else {
                price_sub = price_sub - priceaspect;
            }
            $('.price_item_' + id_sub).html(fomatPrice(price_sub));

        })

        let tt_price_pk = Number($("#total_price_pk").val());
        let total_price = tt_price_pk + price1;
        let title = $('.products_type_item.active').attr('name-item');

        $('._price').html(fomatPrice(price1));
        $(".dropdown-toggle").html(`${title} : ${fomatPrice(price1)} <i class="fa fa-caret-down" aria-hidden="true"></i>`);
        $('.price_modal').html(fomatPrice(price));
        $(".price_vat").html(fomatPrice(Math.round(price * 1.1)));
        $(".total_bh").html(fomatPrice(price));
        $("#tgb").html(fomatPrice(total_price));
        $('#id_aspect').val(id);
        $('#id_aspect_compare').val(id);
        $('#price_input').val(price);
        $("#price_input_compare").val(price);
        $("#total_price").val(total_price);
    })
    // }

});
$("#main_container").on("click", ".item_price", function () {

    let vat = $('#vat').val();
    let price_vat = 0;
    let id_aspect = $('#id_aspect').val();
    let price_aspect = 0;
    if (!!id_aspect) {
        price_aspect = Number($('#aspect').find(":selected").attr('data-priceaspect'));
    }
    var warranty_id_before = $(this).attr("warranty_id"),
        hasclass = $(".item_wan_" + warranty_id_before).hasClass("active"),
        flash_sale = $("#flash_sale").val(),
        price_discount = $("#price_discount").val(),
        discount_unit_sale = $("#discount_unit_sale").val(),
        id_main = $("#product_id").val(),
        item_id = $(this).attr("products_type_id"),
        item = $(this).attr("data"),
        name = $(this).attr("name"),
        title = $(this).attr("name-item");
    if (($(".color_title").html(title), $(".color_mobile").html(title), $("." + item).removeClass("active"), "products_type_item" == item)) $("." + item + "_" + item_id).addClass("active");
    else {
        $(this).addClass("active");
        var content = $(this).attr("content");
        $(".warranty_content").html(content);
    }
    "warranty_item" == item && hasclass && $(".item_wan").removeClass("active");
    var id_warranty = $(".item_wan.active").attr("warranty_id");
    $("#warranty_input").val(id_warranty), $("#warranty_input_compare").val(id_warranty);
    var type_id = $(".products_type .active").attr("products_type_id");
    type_id || (type_id = 0);
    var tt_price_pk = $("#total_price_pk").val(),
        tt_price_old_pk = $("#total_price_old_pk").val();
    (tt_price_pk = Number(tt_price_pk)), (tt_price_old_pk = Number(tt_price_old_pk)), $("#products_type_input").val(type_id);
    var warranty = $(".warranty_item.active").attr("price");
    (warranty = Number(warranty)), (product = $("#products_sub").val()), (product = eval(product));
    for (var price = $("#data_price").val(), price_4 = price, price_4 = price_4.toString(), format_money4 = ""; parseInt(price_4) > 999;) (format_money4 = "." + price_4.slice(-3) + format_money4), (price_4 = price_4.slice(0, -3));
    (price_4 += format_money4), (price_4 += "đ"), (price = Number(price));
    var price_old = $("#data_price_old").val();
    price_old = Number(price_old);
    for (var price_2 = 0, price_old_2 = 0, discount = 0, id = 0, store = "", i = 0; i < product.length; i++)
        if (type_id == product[i].id) {
            (id = product[i].id), (code = product[i].code), (price = product[i].price + price_aspect), (price_old = product[i].price_old), (discount = product[i].discount), (store = product[i].store);
            break;
        }
    $("#id_sub").val(id), $("#instalment").val(id), $("#id_sub_compare").val(id), $("#id_sub_contact").val(id);
    for (var price1 = price, tt_price1 = price1 + tt_price_pk, price_2 = price, price_3 = price, price_3 = price_3.toString(), format_money3 = ""; parseInt(price_3) > 999;)
        (format_money3 = "." + price_3.slice(-3) + format_money3), (price_3 = price_3.slice(0, -3));
    (price_3 += format_money3), (price_3 += "đ");
    var price_old_2 = price_old,
        tt_price_old1 = price_old_2 + tt_price_old_pk,
        tt_price = 0,
        tt_price_old = 0;
    if (0 == price) (price = "Liên hệ"), $("#price_input").val(0), $("#price_input_compare").val(0), $("#total_price").val(tt_price_pk), $("#total_price_old").val(tt_price_old_pk), $('.vat').hide();
    else {
        warranty && (price += warranty);
        if (1 != flash_sale && 2 != flash_sale) {
            // Không có flash sale hoặc flash sale không phải 1 hoặc 2
        } else if (1 == flash_sale) {
            // Nếu flash sale là 1, kiểm tra điều kiện tiếp theo
            if (2 == discount_unit_sale) {
                price -= 2 == discount_unit_sale ? price_discount : price - price_discount;
                price1 -= 2 == discount_unit_sale ? price_discount : price - price_discount;
            } else if (3 == discount_unit_sale) {
                price -= 3 == discount_unit_sale ? (price_discount * price) / 100 : 0;
                price1 -= 3 == discount_unit_sale ? (price_discount * price1) / 100 : 0;
            }
        }

        tt_price = price1 + tt_price_pk;
        price_vat = price;
        $("#price_input").val(price);
        $("#price_input_compare").val(price);
        $("#total_price").val(tt_price);


        for (var price = price.toString(), format_money = ""; parseInt(price) > 999;)
            (format_money = "." + price.slice(-3) + format_money),
                (price = price.slice(0, -3));
        (price += format_money), (price += "đ");

        for (var price1 = price1.toString(), format_money1 = ""; parseInt(price1) > 999;)
            (format_money1 = "." + price1.slice(-3) + format_money1),
                (price1 = price1.slice(0, -3));
        (price1 += format_money1), (price1 += "đ");

    }
    if (
        ($("._price").html(price1),
            $(".price_vat").html(fomatPrice(Math.round(price_vat * 1.1))),
            $(".price_now").html(price_3),
        2 == flash_sale && $(".price_now").html(price_4),
            $(".dropdown-toggle").html(title + ": " + price1 + ' <i class="fa fa-caret-down" aria-hidden="true"></i>'),
            $(".price_modal").html(price),
            $(".total_bh").html(price),
            $("#tgb").html(fomatPrice(tt_price1)),
        price_old > 0 && price_old > price_2)
    ) {
        warranty && (price_old += warranty);
        for (var price_old = price_old.toString(), format_money_old = ""; parseInt(price_old) > 999;) (format_money_old = "." + price_old.slice(-3) + format_money_old), (price_old = price_old.slice(0, -3));
        (price_old += format_money_old), (price_old += "đ");
        for (var price_old_2 = price_old_2.toString(), format_money_old_2 = ""; parseInt(price_old_2) > 999;) (format_money_old_2 = "." + price_old_2.slice(-3) + format_money_old_2), (price_old_2 = price_old_2.slice(0, -3));
        (price_old_2 += format_money_old_2), (price_old_2 += "đ"), $(".top_prd .price_old").html(price_old_2), $(".priceold_modal").html(price_old), $("#tgb_old").html(fomatPrice(tt_price_old1));
    } else (price_old = ""), $(".top_prd .price_old").html(price_old), $(".priceold_modal").html(price_old), $("#tgb_old").html(fomatPrice(tt_price_old1));
    0 != store.length &&
    $.ajax({
        type: "get",
        url: "/index.php?module=products&view=product&raw=1&task=ajax_load_store",
        dataType: "json",
        data: {store: store, code: code, id_main: id_main},
        success: function (t) {
            return $(".count_store").html(t.quan_store), $(".box_store").html(t.store), !0;
        },
        error: function (t, e, a) {
        },
    });
    let type_slider = $('#type_slider').val();

    if (type_slider != 1) {
        (type_id = "type-" + type_id),
            $(".lSGallery ." + type_id).click(),
            proLightSlider.goToSlide($("#imageGallery .active").index());
    }
});
$("#buy-now").click(function () {
    if (((products_type_count = $("#products_type_count").val()), products_type_count && 0 != products_type_count && ((products_type = $("#products_type_input").val()), !products_type))) return alert("Bạn phải chọn màu sắc"), !1;
});
$(".select_g").click(function () {
    $(".select_g").removeClass("active"), $(this).addClass("active");
    var t = $(this).attr("data-id");
    $("#list_gift").val(t);
});
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
    starOff: "https://didongthongminh.vn/templates/default/images/star-empty-small.png",
    starOn: "https://didongthongminh.vn/templates/default/images/star-fill-small.png",
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

function copyToClipboard(text) {
    let sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
}

function coppy_text() {
    let copyText = document.getElementById("link_prd");

    copyToClipboard(copyText.value);
}

function coppy_nd() {
    let copyText = document.getElementById("info");
    copyToClipboard(copyText.value);
}

var iframes = $('iframe');

$('button').click(function () {
    iframes.attr('src', function () {
        return $(this).data('src');
    });
});

iframes.each(function () {
    var src = $(this).attr('src');
    $(this).data('src', src).attr('src', '');
});

(window.onload = init);
