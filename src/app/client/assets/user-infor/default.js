$(document).ready(function () {
    var alert_info = $('#alert_info').val();
    alert_info1 = alert_info ? JSON.parse(alert_info) : [];

    $('.change-password-check').change(function() {
        if($('#u_change').prop("checked")) {
            $('.change-password-box').slideDown()
        } else {
            $('.change-password-box').slideUp()
        }
    });

    $('.add_cart_btn').click(function () {
        let pid = $(this).attr('data-id');
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: '/index.php?module=products&view=product&raw=1&task=buy',
            data: {quan:1,id:pid},
            success: function (data) {
                // $(".popup").html(data);
                $('#modalCart').modal('hide');
                res = JSON.parse(data);
                $('.count-cart').text(res.quantity);
                showPopup(res);
                ajax_pop_cart();
            }
        });
    });
    $('#submit_forgot').click(function () {
        if (checkForgot()){
            $('body').append('<div id="load"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
            $('form#frmForgot').submit();
        }
    })
});

function checkForgot() {
    $('label.label_error').prev().remove();
    $('label.label_error').remove();
    if(!notEmpty("f_email",alert_info1[0])) {
        return false;
    }
    if(!emailValidator("f_email",alert_info1[1])) {
        return false;
    }
    if(!notEmpty("txtCaptcha",alert_info1[2])) {
        return false;
    } else {

    }
    return true;
}

function checkUpdateUser() {
    $('label.label_error').prev().remove();
    $('label.label_error').remove();

    if(!notEmpty("u_name",alert_info1[0])) {
        return false;
    }
    if(!notEmpty("u_tel",alert_info1[1])) {
        return false;
    }
    if(!isPhone("u_tel",alert_info1[2])) {
        return false;
    }
    if(!lengthMin("u_tel",10,alert_info1[3])) {
        return false;
    }
    if(!lengthMax("u_tel",13,alert_info1[3])) {
        return false;
    }
    // if($('#u_change').prop("checked")) {
    //     if(!notEmpty("u_old_pass",alert_info1[4])) {
    //         return false;
    //     }
    //     if(!notEmpty("u_new_pass",alert_info1[4])) {
    //         return false;
    //     }
    //     if(!lengthMin("u_new_pass",6,alert_info1[5])) {
    //         return false;
    //     }
    //     if(!checkMatchPass_2("u_new_pass","u_conf_pass",alert_info1[6])) {
    //         return false;
    //     }
    // }
    var $data = $('form#frmUser').serialize();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/index.php?module=members&view=members&task=do_check_form&raw=1',
        data: $data,
        async: false,
        success: function (data) {
            // $('#load').remove();
            $html = data.message;
            if (data.error == false) {
                // $image = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2"><circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/><polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/></svg>';
                // open_alert($image,$html);
                $('#frmUser').append(
                    `<input type="hidden" name="module" value="members">
                        <input type="hidden" name="task" value="do_update_ac">
                        <input type="hidden" name="view" value="members">`
                );
                $('#frmUser').submit();
            }
            if (data.error == true) {
                $image = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2"><circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/><line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/><line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/></svg>';
                open_alert($image, $html);
                $('#a_message').click(function () {
                    if(data.type == 'tel'){
                        // invalid('b_telephone', alert_members1[12]);
                        $('#acc_telephone').focus();
                    }
                    // if(data.type == 'pass') {
                    //     // invalid('b_email', alert_members1[13]);
                    //     $('#acc_password').focus();
                    // }
                });
                return false;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // $('#load').remove();
            alert('There was an error uploading to the server. Please check the connection.');
        }
    });
}

var loadFile = function(event) {
    let image = $('#u_preview')[0];
    let size = $('#u_image')[0].files[0].size;
    if(size > 1000000){
        $("#acc_logo").val('');
        image.src = '/images/logo-user.svg';
        invalid('u_image', 'Ảnh dưới 1M');
        return false;
    }
    image.src = URL.createObjectURL(event.target.files[0]);
    image.alt = $('#u_image').val().split('\\').pop();
    image.onload = function() {
        URL.revokeObjectURL(image.src); // free memory
    };
    $('div.label_error').remove();
};

function showPopup(res) {
    // console.log(res);
    let popup =
        `
    <div class="wrapper-popup">
        <a href="javascript:void(0)" id="close-cart">
            <i id="close" class="fa fa-times" aria-hidden="true"></i>
        </a>
        <div class="content">
            <p class="text-center mt-4">
                <i class="fa fa-check-circle" aria-hidden="true"></i>
                <span>Thêm vào giỏ hàng thành công!</span>
            </p>
            <a href="${res.link_cart}" class="button-cart">Xem giỏ hàng và thanh toán</a>
        </div>
    </div>
  `;
    $(".popupCart").html(popup);
    $('.popupCart .wrapper-popup').animate({
        top: 100
    });
}

function ajax_pop_cart() {
    $('.wrapper-popup').delay(3000).fadeOut('slow');
    $("#close-cart").click(function () {
        $(".wrapper-popup").hide();
    });
}

function checkUpdatePass() {
    $('label.label_error').prev().remove();
    $('label.label_error').remove();

    if(!notEmpty("u_pass",alert_info1[4])) {
        return false;
    }
    if(!notEmpty("u_pass_new",alert_info1[4])) {
        return false;
    }
    if(!lengthMin("u_pass_new",6,alert_info1[5])) {
        return false;
    }
    if(!checkMatchPass_2("u_pass_new","u_pass_new_conf",alert_info1[6])) {
        return false;
    }
    var $data = $('form#frmPass').serialize();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/index.php?module=members&view=members&task=do_check_pass&raw=1',
        data: $data,
        async: false,
        success: function (data) {
            $html = data.message;
            if (data.error == false) {
                $('#frmPass').append(
                    `<input type="hidden" name="module" value="members">
                        <input type="hidden" name="task" value="do_c_pass">
                        <input type="hidden" name="view" value="members">`
                );
                $('#frmPass').submit();
            }
            if (data.error == true) {
                $image = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2"><circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/><line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/><line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/></svg>';
                open_alert($image, $html);
                $('#a_message').click(function () {
                    $('#u_pass').focus();
                });
                return false;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('There was an error uploading to the server. Please check the connection.');
        }
    });
}


function open_alert($image,$mess) {
    $('#alert_message').html($image + '<p>' + $mess + '</p>');
    $('#alert_modal').fadeIn().addClass('show');
}
function close_alert() {
    $('#alert_modal').fadeOut().removeClass('show');
}