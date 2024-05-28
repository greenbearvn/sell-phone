url_root=$("#root").val(),$("#search_warranty").click(function(){var t=$("#wan_num").val();$.ajax({type:"GET",dataType:"html",url:url_root+"index.php?module=products&view=warranty&task=display&raw=1",data:"phone="+t,success:function(t){$("#searh_list").html(t)}})}),$(".ok-button").click(function(){$.ajax({type:"GET",dataType:"html",url:url_root+"index.php?module=home&view=home&task=popup&raw=1",success:function(t){}})}),$("#search_imei").click(function(){var t=$("#imei_num").val();$.ajax({type:"GET",dataType:"html",url:url_root+"index.php?module=products&view=imei&task=display&raw=1",data:"phone="+t,success:function(t){$("#searh_list").html(t)}})});var is_rewrite=1,root="/";function changeCaptcha(){var t=(new Date).getTime();$("#imgCaptcha").attr({src:"/libraries/jquery/ajax_captcha/create_image.php?"+t})}function check_captcha(){$("#txtCaptcha").blur(function(){""!=$(this).val()&&$.ajax({url:"/index.php?module=users&task=ajax_check_captcha&raw=1",data:{txtCaptcha:$(this).val()},dataType:"text",success:function(t){$("label.username_check").prev().remove(),$("label.username_check").remove(),0==t?invalid("txtCaptcha","Bạn nhập sai mã hiển thị"):(valid("txtCaptcha"),$("<br/><div class='label_success username_check'>Bạn đã nhập đúng mã hiển thị</div>").insertAfter($("#username").parent().children(":last")))}})})}function openPopupWindow(t){var e=$(t).attr("data-id"),a=$(t).attr("data-url")+"&display=popup",o=$(t).attr("data-width"),t=$(t).attr("data-height"),e=window.open(a,e,"width="+o+",height="+t+",location=1,status=1,resizable=yes"),t=getCenteredCoords(o,t);e.moveTo(t[0],t[1])}function login_facebook(t){$(window.location).attr("href",t.url)}!function(){var t;navigator.userAgent.match(/IEMobile\/10\.0/)&&((t=document.createElement("style")).appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(t))}(),$(document).ready(function(){$("#modal_qa").modal({backdrop:"static",keyboard:!1})}),$(function(){$(".go-top").click(function(){return $("html,body").animate({scrollTop:0},1e3),!1})}),setTimeout(function(){$("#modal_qa").modal("hide")},1e4);var i=0;$("#open_menu").click(function(){var t=$(window).width();$width1=t+2,$("#navigation-menu").css("width",$width1),++i%2!=0?($("#navigation-menu").slideDown("300"),$(".full").show()):($("#navigation-menu").slideUp("300"),$(".full").hide())}),$(".close_pop").click(function(){$(".banner_header_mb").hide()}),$(document).ready(function(){$(window).scroll(function(){300<$(this).scrollTop()?$(".scrollToTop").fadeIn().addClass("active"):$(".scrollToTop").fadeOut().removeClass("active")}),$(".scrollToTop").click(function(){return $("html, body").animate({scrollTop:0},800),!1}),$(".drop_city").click(function(){var t=$(this).attr("data-id"),e=$(this).attr("data-name");$.ajax({type:"GET",dataType:"html",url:"/index.php?module=api&view=product&raw=1&task=ajax_set_city",data:{id:t,name:e},success:function(t){location.reload()}})}),$(".address_pc .btn-drop").click(function(){$(".address_pc .dropdown-menu").toggle()}),$(".address_pc .btn-success").click(function(){$(".address_pc .dropdown-menu").toggle(),$(".suggestions-choose-store").addClass("hidden")}),$(".address_mb .btn-drop").click(function(){$(".address_mb .dropdown-menu").toggle()}),$(".address_mb .btn-success").click(function(){$(".address_mb .dropdown-menu").toggle(),$(".suggestions-choose-store").addClass("hidden")})});const loadScriptsTimer=setTimeout(loadScripts,7e3),userInteractionEvents=["mouseover","keydown","touchmove","touchstart"];function triggerScriptLoader(){loadScripts(),clearTimeout(loadScriptsTimer),userInteractionEvents.forEach(function(t){window.removeEventListener(t,triggerScriptLoader,{passive:!0})})}function loadScripts(){document.querySelectorAll("script[data-type='lazy']").forEach(function(t){t.setAttribute("src",t.getAttribute("data-src"))})}userInteractionEvents.forEach(function(t){window.addEventListener(t,triggerScriptLoader,{passive:!0})});
jQuery('a[href*="http://"]:not([href*="https://didongthongminh.vn"])').attr('rel', 'nofollow');
jQuery('a[href*="https://"]:not([href*="https://didongthongminh.vn"])').attr('rel', 'nofollow');
jQuery('a[href*=""]:not([href*="https://didongthongminh.vn"])').attr('rel', 'nofollow');
jQuery('a[href*="https://"]:not([href*="https://didongthongminh.vn"])').attr("target", "_blank");
$(document).ready(function(){
    $('.menu-product-hover').hover(function(){
		$(".for-hover").toggle();
        $('.moby-overlay').toggleClass('moby-overlay-active').css('z-index','99');
	},function(){
        $(".for-hover").hide();
        $('.moby-overlay').removeClass('moby-overlay-active');
    })
})

$(document).ready(function(){
    $('.cate-btn').click(function(){
        $(".for-click").toggle();
        $('.moby-overlay').css('z-index','99').toggleClass('moby-overlay-active');
    });

});

$(document).on("click",function(e){
    var clicked = $(e.target).closest('.cate-btn');
    if (clicked.length == 0) {
        $(".for-click").hide();
        $('.moby-overlay').removeClass('moby-overlay-active');
    }
})

if ('ontouchstart' in document.documentElement) {
    document.addEventListener('touchstart', ontouchstart, {passive: true});
}

$(window).scroll(function () {
    if ($(this).scrollTop() > 0.1) {
        $('.fixed_top').addClass('is-sticky');
    }else{
        $('.fixed_top').removeClass('is-sticky');
    } 
});